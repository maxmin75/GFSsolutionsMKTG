"use client";

import { useMemo, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  city: string;
  homeType: string;
  monthlyBill: string;
  billImage?: File | null;
  email: string;
  phone: string;
  consent: boolean;
};

const steps = [
  "Anagrafica",
  "Abitazione",
  "Consumi",
  "Bolletta",
  "Contatti",
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    city: "",
    homeType: "",
    monthlyBill: "",
    billImage: null,
    email: "",
    phone: "",
    consent: false,
  });

  const progress = useMemo(
    () => Math.round(((currentStep + 1) / steps.length) * 100),
    [currentStep]
  );

  const updateField = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep = () => {
    const stepErrors: string[] = [];
    if (currentStep === 0) {
      if (!form.firstName.trim()) stepErrors.push("Inserisci il nome.");
      if (!form.lastName.trim()) stepErrors.push("Inserisci il cognome.");
    }
    if (currentStep === 1) {
      if (!form.city.trim()) stepErrors.push("Inserisci il comune.");
      if (!form.homeType) stepErrors.push("Seleziona la tipologia di casa.");
    }
    if (currentStep === 2) {
      if (!form.monthlyBill.trim())
        stepErrors.push("Inserisci la spesa mensile.");
    }
    if (currentStep === 3) {
      if (!form.billImage) stepErrors.push("Carica la bolletta.");
    }
    if (currentStep === 4) {
      if (!form.email.trim()) stepErrors.push("Inserisci l'email.");
      if (!form.phone.trim()) stepErrors.push("Inserisci il telefono.");
      if (!form.consent) stepErrors.push("Accetta la privacy policy.");
    }
    setErrors(stepErrors);
    return stepErrors.length === 0;
  };

  const onNext = () => {
    if (!validateStep()) return;
    setErrors([]);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const onPrev = () => {
    setErrors([]);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep()) return;
    setSubmitted(true);
  };

  const onFileChange = (file: File | null) => {
    updateField("billImage", file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  if (submitted) {
    return (
      <section
        id="form"
        className="mx-auto w-full max-w-4xl px-6 py-20"
      >
        <div className="rounded-[32px] border border-emerald-100 bg-white p-10 text-center shadow-lg shadow-emerald-100">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            ✓
          </div>
          <h2 className="display-font mt-6 text-3xl text-slate-900">
            Richiesta inviata con successo
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Ti contatteremo entro 24 ore con una proposta personalizzata e
            dettagli sui vantaggi fiscali disponibili.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="form" className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-lg shadow-blue-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500/70">
              Preventivo guidato
            </p>
            <h2 className="display-font mt-3 text-3xl text-slate-900">
              Richiedi il tuo impianto su misura.
            </h2>
          </div>
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Step {currentStep + 1}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-blue-50">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-500">
          {steps.map((step, index) => (
            <span
              key={step}
              className={`rounded-full px-3 py-1 ${
                index === currentStep
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {step}
            </span>
          ))}
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {currentStep === 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-600">Nome</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.firstName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  placeholder="Mario"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Cognome</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.lastName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  placeholder="Rossi"
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-600">Comune</label>
                <input
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="Milano"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">
                  Tipologia di casa
                </label>
                <select
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.homeType}
                  onChange={(event) =>
                    updateField("homeType", event.target.value)
                  }
                >
                  <option value="">Seleziona</option>
                  <option value="appartamento">Appartamento</option>
                  <option value="villa">Villa</option>
                  <option value="indipendente">Indipendente</option>
                </select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <label className="text-sm text-slate-600">
                Spesa mensile corrente elettrica (€)
              </label>
              <input
                className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                value={form.monthlyBill}
                onChange={(event) =>
                  updateField("monthlyBill", event.target.value)
                }
                placeholder="160"
              />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <label className="text-sm text-slate-600">
                Carica la tua bolletta
              </label>
              <div className="mt-3 rounded-3xl border border-dashed border-blue-200 bg-blue-50 p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    onFileChange(event.target.files?.[0] ?? null)
                  }
                  className="w-full text-sm"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Trascina o seleziona un'immagine.
                </p>
              </div>
              {previewUrl && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100">
                  <img
                    src={previewUrl}
                    alt="Preview bolletta"
                    className="h-48 w-full object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-slate-600">Email</label>
                <input
                  type="email"
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="nome@email.it"
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Telefono</label>
                <input
                  type="tel"
                  className="mt-2 w-full rounded-2xl border border-blue-100 px-4 py-3 text-sm"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  placeholder="+39 333 0000000"
                />
              </div>
              <label className="col-span-full flex items-start gap-3 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(event) =>
                    updateField("consent", event.target.checked)
                  }
                  className="mt-1 accent-blue-600"
                />
                Accetto la privacy policy e autorizzo il trattamento dei dati
                personali ai sensi del GDPR.
              </label>
            </div>
          )}

          {errors.length > 0 && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onPrev}
              disabled={currentStep === 0}
              className="rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-semibold text-blue-600 disabled:opacity-40"
            >
              Indietro
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={onNext}
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200"
              >
                Continua
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-200"
              >
                Invia richiesta
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
