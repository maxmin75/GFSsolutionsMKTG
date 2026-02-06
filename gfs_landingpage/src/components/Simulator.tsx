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

  const result = useMemo(() => {
    const annual = monthly * 12;
    const reduction = 0.55;
    const savings = Math.round(annual * reduction);
    const payback = Math.max(4, Math.round(12000 / savings));
    return {
      savings,
      reductionPercent: Math.round(reduction * 100),
      payback,
    };
  }, [monthly]);

  const savingsAnimated = useCountUp(result.savings);
  const reductionAnimated = useCountUp(result.reductionPercent);
  const paybackAnimated = useCountUp(result.payback);

  return (
    <section
      id="simulatore"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <div className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-lg shadow-blue-100">
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
            <div className="rounded-2xl border border-blue-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Risparmio annuo stimato
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {savingsAnimated.toLocaleString("it-IT")}€
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Riduzione costi
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {reductionAnimated}%
              </p>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Rientro investimento
              </p>
              <p className="display-font mt-2 text-3xl text-slate-900">
                {paybackAnimated} anni
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-5 text-sm text-emerald-800">
              Include installazione chiavi in mano e monitoraggio intelligente.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
