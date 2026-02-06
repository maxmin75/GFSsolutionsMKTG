import Hero from "@/components/Hero";
import MultiStepForm from "@/components/MultiStepForm";
import Services from "@/components/Services";
import Simulator from "@/components/Simulator";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-sm text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            S
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-slate-900">Solaria</span>
            <span className="text-xs text-slate-400">
              Fotovoltaico residenziale
            </span>
          </div>
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          <a className="hover:text-blue-600" href="#servizi">
            Servizi
          </a>
          <a className="hover:text-blue-600" href="#simulatore">
            Simulatore
          </a>
          <a className="hover:text-blue-600" href="#form">
            Preventivo
          </a>
        </nav>
        <a
          className="rounded-full border border-blue-200 bg-white px-4 py-2 text-blue-600 transition hover:border-blue-300"
          href="#form"
        >
          Contattaci
        </a>
      </header>

      <Hero />
      <Services />
      <Simulator />
      <MultiStepForm />

      <footer className="bg-slate-900 py-10 text-center text-xs text-slate-300">
        Solaria © 2026. Energia pulita per la tua casa.
      </footer>
    </div>
  );
}
