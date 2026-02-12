import Image from "next/image";

const trust = [
  "Installazione chiavi in mano",
  "Tecnici certificati",
  "Garanzia fino a 25 anni",
];

const highlights = [
  { value: "-85%", label: "Costo in bolletta" },
  { value: "30 gg", label: "Tempo medio installazione" },
  { value: "+1.2k", label: "Impianti residenziali" },
];

export default function Hero() {
  return (
    <section className="bg-aurora relative overflow-hidden">
      <div className="pointer-events-none absolute left-10 top-16 h-40 w-40 rounded-full border border-blue-200/60 bg-white/60 blur-2xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-blue-100 blur-3xl" />
      <div className="pointer-events-none absolute right-20 bottom-10 h-32 w-32 rounded-full border border-emerald-200/80 bg-white/60 blur-xl spin-slow" />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16 lg:flex-row lg:items-center lg:justify-between">
        <div
          className="reveal space-y-7"
          data-reveal
          style={{ transitionDelay: "80ms" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-blue-500/70">
            GFS Solutions · Pannelli fotovoltaici a Padova
          </p>
          <h1 className="display-font hero-title-animate text-4xl font-semibold leading-tight text-slate-900 md:text-6xl">
            <span className="hero-title-glow">
              Riduci la bolletta fino al 85% con un impianto fotovoltaico
              intelligente.
            </span>
          </h1>
          <p className="max-w-xl text-lg text-slate-600">
            GFS Solutions progetta, installa e gestisce pratiche incentivi per
            pannelli fotovoltaici a Padova. Zero pensieri, massimo risparmio,
            più valore alla tua casa.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5"
              href="#simulatore"
            >
              Calcola il tuo risparmio
            </a>
            <a
              className="rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition hover:border-blue-300"
              href="#form"
            >
              Richiedi una consulenza
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            {trust.map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-100 bg-white/80 px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className="reveal floaty relative w-full max-w-md rounded-[28px] border border-blue-100 bg-white/90 p-6 shadow-xl shadow-blue-100"
          data-reveal
          style={{ transitionDelay: "160ms" }}
        >
          <div className="absolute -top-6 right-6 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Simulazione live
          </div>
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Risparmio annuo
              </p>
              <div className="mt-3 flex items-end justify-between">
                <span className="display-font text-3xl text-slate-900">
                  1.980€
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  -85%
                </span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-blue-100">
                <div className="h-2 w-2/3 rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-blue-100 bg-white p-3 text-center"
                >
                  <p className="display-font text-lg text-slate-900">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-xs text-blue-700">
              Impianti su misura con incentivi e detrazioni fiscali inclusi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
