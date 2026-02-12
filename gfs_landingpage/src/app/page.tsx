export default function Home() {
  return (
    <div className="bg-aurora min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <span className="floating-orb orb-1" />
        <span className="floating-orb orb-2" />
        <span className="floating-orb orb-3" />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-8 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--primary)] text-lg font-semibold text-white shadow-[0_12px_24px_rgba(255,122,69,0.35)]">
            Ri
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
              Accredito evento
            </p>
            <p className="display-font text-lg font-semibold">
              Ri.trovi
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold text-[color:var(--muted)] lg:flex">
          Accesso rapido da mobile
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pb-16 pt-10 lg:flex-row lg:items-start lg:gap-12 lg:px-8">
        <section className="flex flex-1 flex-col gap-6 stagger">
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full bg-[color:var(--primary-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)]">
              Ri.trovi aperitivo e musica
            </span>
            <h1 className="display-font text-4xl font-semibold leading-tight text-[color:var(--ink)] md:text-5xl">
              Accredita il tuo ingresso e vivi la serata con stile.
            </h1>
            <p className="text-base leading-relaxed text-[color:var(--muted)] md:text-lg">
              Un check-in semplice e veloce: inserisci i dati, conferma la
              privacy e ricevi subito la conferma dell&apos;accredito.
            </p>
          </div>

          <div className="glass-card flex flex-col gap-4 rounded-3xl p-5">
            <h2 className="display-font text-lg font-semibold">
              Cosa troverai
            </h2>
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              Aperitivo, musica e servizi premium in un unico percorso. Ogni
              dettaglio e&apos; pensato per un&apos;accoglienza fluida e curata.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Aperitivo",
                "Musica live & DJ set",
                "Cena",
                "Spritz & cocktail bar",
                "Area lounge",
                "Guest care",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-semibold text-[color:var(--ink)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel flex flex-col gap-3 rounded-2xl p-4 text-sm text-[color:var(--muted)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary)]">
              Modalita&apos; accredito
            </div>
            <p>
              Ogni dispositivo puo&apos; accreditare un solo nome. L&apos;accesso
              viene gestito in modo sicuro dal team admin.
            </p>
          </div>
        </section>

        <section className="glass-card w-full max-w-xl rounded-[32px] p-6 lg:sticky lg:top-10">
          <div className="flex flex-col gap-2">
            <h2 className="display-font text-2xl font-semibold">
              Accredita il tuo ingresso
            </h2>
            <p className="text-sm text-[color:var(--muted)]">
              Compila il form, ti basta un minuto.
            </p>
          </div>

          <form className="mt-6 flex flex-col gap-4">
            <div className="field-shell">
              <label className="field-label" htmlFor="nome">
                Nome
              </label>
              <input
                className="field-input"
                id="nome"
                name="nome"
                type="text"
                placeholder="Mario"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="field-shell">
              <label className="field-label" htmlFor="cognome">
                Cognome
              </label>
              <input
                className="field-input"
                id="cognome"
                name="cognome"
                type="text"
                placeholder="Rossi"
                autoComplete="family-name"
                required
              />
            </div>

            <div className="field-shell">
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                className="field-input"
                id="email"
                name="email"
                type="email"
                placeholder="mario@email.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field-shell">
              <label className="field-label" htmlFor="cell">
                Cellulare
              </label>
              <input
                className="field-input"
                id="cell"
                name="cell"
                type="tel"
                placeholder="+39 333 123 4567"
                autoComplete="tel"
                required
              />
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/70 p-4 text-xs text-[color:var(--muted)]">
              <input
                type="checkbox"
                name="privacy"
                required
                className="mt-0.5 h-4 w-4 accent-[color:var(--primary)]"
              />
              Dichiaro di aver letto l&apos;informativa privacy e acconsento al
              trattamento dei dati per l&apos;accredito.
            </label>

            <button
              type="submit"
              className="glow-button mt-2 rounded-2xl bg-[color:var(--primary)] px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_30px_rgba(255,122,69,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(255,122,69,0.45)]"
            >
              Accredita ora
            </button>

            <p className="text-center text-xs text-[color:var(--muted)]">
              Se sei admin, accedi dalla dashboard riservata.
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
