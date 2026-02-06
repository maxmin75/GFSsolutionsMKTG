const services = [
  {
    title: "Consulenza gratuita",
    description:
      "Analisi consumi e sopralluogo digitale per capire subito il tuo potenziale.",
  },
  {
    title: "Progettazione impianto",
    description:
      "Studio tecnico personalizzato per massimizzare produzione e rendimento.",
  },
  {
    title: "Installazione certificata",
    description:
      "Team interno e standard di sicurezza elevati, con pratiche incluse.",
  },
  {
    title: "Assistenza e manutenzione",
    description:
      "Monitoraggio costante e supporto rapido per mantenere alte le performance.",
  },
  {
    title: "Incentivi e detrazioni",
    description:
      "Gestione completa delle pratiche fiscali per accedere agli incentivi.",
  },
];

const icons = [
  "⚡",
  "📐",
  "🛠️",
  "🛰️",
  "💶",
];

export default function Services() {
  return (
    <section id="servizi" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500/70">
            Servizi completi
          </p>
          <h2 className="display-font mt-4 text-3xl text-slate-900">
            Tutto quello che serve per passare al solare.
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-600">
          Dalla prima consulenza alla manutenzione, ti seguiamo in ogni fase con
          un team dedicato e certificato.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={service.title}
            className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
              {icons[index]}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {service.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
