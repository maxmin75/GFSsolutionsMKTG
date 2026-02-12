"use client";

import { useEffect, useMemo, useState } from "react";

function useCountUp(value: number, duration = 800) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = performance.now();
    const from = display;
    const diff = value - from;
    let raf = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setDisplay(Math.round(from + diff * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

export default function Simulator() {
  const [monthly, setMonthly] = useState(160);
  const [withStorage, setWithStorage] = useState(true);
  const [season, setSeason] = useState<"estate" | "inverno">("estate");

  const result = useMemo(() => {
    const annual = monthly * 12;
    const baseReduction = 0.82;
    const storageBoost = withStorage ? 0.06 : 0;
    const seasonalFactor = season === "estate" ? 1.08 : 0.75;
    const reduction = Math.min(baseReduction + storageBoost, 0.92);
    const savings = Math.round(annual * reduction * seasonalFactor);
    return {
      savings,
      reductionPercent: Math.round(reduction * 100),
      seasonalFactor: Math.round(seasonalFactor * 100),
    };
  }, [monthly, withStorage, season]);

  const savingsAnimated = useCountUp(result.savings);
  const reductionAnimated = useCountUp(result.reductionPercent);

  return (
    <section
      id="simulatore"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <div
        className="reveal rounded-[32px] border border-blue-100 bg-white p-8 shadow-lg shadow-blue-100"
        data-reveal
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500/70">
              Simulatore di risparmio
            </p>
            <h2 className="display-font mt-4 text-3xl text-slate-900">
              Scopri quanto puoi risparmiare ogni anno.
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Inserisci la tua spesa media mensile per la corrente e ottieni una
              stima immediata di risparmio, riduzione costi e tempo di rientro
              investimento.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-blue-100 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Configurazione impianto
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setWithStorage(false)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      withStorage
                        ? "border border-slate-200 text-slate-500"
                        : "border border-blue-200 bg-blue-50 text-blue-700"
                    }`}
                  >
                    Senza accumulo
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithStorage(true)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      withStorage
                        ? "border border-blue-200 bg-blue-50 text-blue-700"
                        : "border border-slate-200 text-slate-500"
                    }`}
                  >
                    Con accumulo
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                  Stagione
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSeason("estate")}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      season === "estate"
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border border-slate-200 text-slate-500"
                    }`}
                  >
                    Estate
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeason("inverno")}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      season === "inverno"
                        ? "border border-blue-200 bg-blue-50 text-blue-700"
                        : "border border-slate-200 text-slate-500"
                    }`}
                  >
                    Inverno
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-6">
              <label className="text-sm font-semibold text-slate-700">
                Spesa mensile media (€)
              </label>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <input
                  type="range"
                  min={60}
                  max={380}
                  value={monthly}
                  onChange={(event) => setMonthly(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer accent-blue-600"
                />
                <input
                  type="number"
                  min={60}
                  max={380}
                  value={monthly}
                  onChange={(event) => setMonthly(Number(event.target.value))}
                  className="w-32 rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm text-slate-900"
                />
              </div>
              <p className="mt-3 text-xs text-slate-500">
                * Stima basata su medie residenziali e incentivi disponibili.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className="reveal rounded-2xl border border-blue-100 bg-white p-5"
              data-reveal
              style={{ transitionDelay: "80ms" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Risparmio annuo stimato
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {savingsAnimated.toLocaleString("it-IT")}€
              </p>
            </div>
            <div
              className="reveal rounded-2xl border border-blue-100 bg-white p-5"
              data-reveal
              style={{ transitionDelay: "140ms" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Riduzione costi
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {reductionAnimated}%
              </p>
            </div>
            <div
              className="reveal rounded-2xl border border-blue-100 bg-white p-5"
              data-reveal
              style={{ transitionDelay: "200ms" }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Differenza stagionale
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {result.seasonalFactor}%
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Rendimento stimato in {season}.
              </p>
            </div>
            <div
              className="reveal rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-800"
              data-reveal
              style={{ transitionDelay: "260ms" }}
            >
              {withStorage
                ? "Include accumulo per aumentare l’autoconsumo."
                : "Configurazione base senza accumulo."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
