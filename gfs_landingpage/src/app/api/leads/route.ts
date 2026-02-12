import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

type LeadRecord = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  city: string;
  homeType: string;
  monthlyBill: string;
  email: string;
  phone: string;
  consent: boolean;
  billImage?: {
    fileName: string;
    originalName: string;
    size: number;
    type: string;
    url: string;
  } | null;
};

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "gfs2026!";
const LEADS_TO = process.env.LEADS_TO || "gianluca.pistorello@gmail.com";

async function saveUpload(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^\w.-]/g, "_");
  const fileName = `${Date.now()}-${randomUUID()}-${safeName}`;
  const blob = await put(`leads/${fileName}`, buffer, {
    access: "public",
    contentType: file.type || "application/octet-stream",
  });
  return {
    fileName,
    originalName: file.name,
    size: file.size,
    type: file.type,
    url: blob.url,
  };
}

async function sendLeadEmail(lead: LeadRecord) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return;

  const lines = [
    "Nuova richiesta dal sito GFS",
    "",
    `Nome: ${lead.firstName} ${lead.lastName}`,
    `Comune: ${lead.city}`,
    `Tipologia casa: ${lead.homeType}`,
    `Spesa mensile: ${lead.monthlyBill}`,
    `Email: ${lead.email}`,
    `Telefono: ${lead.phone}`,
    `Consenso: ${lead.consent ? "Si" : "No"}`,
    lead.billImage
      ? `Bolletta caricata: ${lead.billImage.originalName}`
      : "Bolletta caricata: no",
  ];

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      to: LEADS_TO,
      subject: "Nuova richiesta preventivo GFS",
      text: lines.join("\n"),
      lead,
    }),
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const city = String(formData.get("city") || "").trim();
  const homeType = String(formData.get("homeType") || "").trim();
  const monthlyBill = String(formData.get("monthlyBill") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const consent = String(formData.get("consent") || "false") === "true";
  const billImage = formData.get("billImage");

  if (!firstName || !lastName || !city || !homeType || !monthlyBill || !email || !phone || !consent) {
    return NextResponse.json(
      { error: "Dati incompleti. Controlla i campi obbligatori." },
      { status: 400 }
    );
  }

  const record: LeadRecord = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    firstName,
    lastName,
    city,
    homeType,
    monthlyBill,
    email,
    phone,
    consent,
    billImage: null,
  };

  if (billImage instanceof File && billImage.size > 0) {
    record.billImage = await saveUpload(billImage);
  }

  try {
    await kv.lpush("leads", JSON.stringify(record));
  } catch (error) {
    console.error("KV write failed:", error);
    return NextResponse.json(
      { error: "Salvataggio non riuscito. Riprovare." },
      { status: 500 }
    );
  }

  try {
    await sendLeadEmail(record);
  } catch (error) {
    console.error("Email send failed:", error);
  }

  return NextResponse.json({ ok: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password =
    request.headers.get("x-admin-password") || searchParams.get("password") || "";

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  let leads: LeadRecord[] = [];
  try {
    const raw = await kv.lrange<string>("leads", 0, 200);
    leads = raw.map((item) => JSON.parse(item) as LeadRecord);
  } catch (error) {
    console.error("KV read failed:", error);
    return NextResponse.json(
      { error: "Lettura non riuscita. Riprovare." },
      { status: 500 }
    );
  }
  return NextResponse.json({ leads });
}
