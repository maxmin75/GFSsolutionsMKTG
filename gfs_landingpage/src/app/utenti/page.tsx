"use client";

import { useState } from "react";

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

export default function UtentiPage() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/leads", {
        headers: { "x-admin-password": password },
      });
      if (!response.ok) {
        throw new Error("Password non valida.");
      }
      const data = await response.json();
      setLeads(data.leads || []);
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore inatteso.");
      setUnlocked(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!password.trim()) {
      setError("Inserisci la password.");
      return;
    }
    loadLeads();
  };

  const downloadJson = async () => {
    try {
      const response = await fetch("/api/leads", {
        headers: { "x-admin-password": password },
      });
      if (!response.ok) throw new Error("Password non valida.");
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data.leads || [], null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads-gfs.json";
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore inatteso.");
    }
  };

  const downloadBill = (bill: LeadRecord["billImage"]) => {
    if (!bill?.url) return;
    const link = document.createElement("a");
    link.href = bill.url;
    link.download = bill.originalName || bill.fileName;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.click();
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-lg shadow-blue-100">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500/70">
            Area utenti
          </p>
          <h1 className="display-font text-3xl text-slate-900">
            Richieste ricevute
          </h1>
        </div>

        {!unlocked && (
          <form className="mt-6 flex flex-wrap gap-4" onSubmit={onSubmit}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full max-w-xs rounded-2xl border border-blue-100 px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200"
              disabled={loading}
            >
              {loading ? "Accesso..." : "Accedi"}
            </button>
          </form>
        )}

        {error && (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
            {error}
          </div>
        )}

        {unlocked && (
          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Totale richieste: {leads.length}
              </p>
              <button
                type="button"
                onClick={downloadJson}
                className="rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-600"
              >
                Scarica JSON
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Nome</th>
                    <th className="pb-3">Comune</th>
                    <th className="pb-3">Tipologia</th>
                    <th className="pb-3">Spesa</th>
                    <th className="pb-3">Contatti</th>
                    <th className="pb-3">Bolletta</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-t border-slate-100">
                      <td className="py-3">
                        {new Date(lead.createdAt).toLocaleString("it-IT")}
                      </td>
                      <td className="py-3">
                        {lead.firstName} {lead.lastName}
                      </td>
                      <td className="py-3">{lead.city}</td>
                      <td className="py-3">{lead.homeType}</td>
                      <td className="py-3">{lead.monthlyBill}€</td>
                      <td className="py-3">
                        <div>{lead.email}</div>
                        <div>{lead.phone}</div>
                      </td>
                      <td className="py-3">
                        {lead.billImage ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => downloadBill(lead.billImage)}
                              className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-600"
                            >
                              Scarica
                            </button>
                            <span className="text-xs text-slate-400">
                              {lead.billImage.originalName}
                            </span>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr>
                      <td className="py-4 text-slate-400" colSpan={7}>
                        Nessuna richiesta presente.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
