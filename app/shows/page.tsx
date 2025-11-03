import { upcomingShows } from "@/lib/content";

function formatShowDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

export default function ShowsPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 pt-36 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-40 lg:gap-24 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>Tour Diary</span>
            <span>Neon Stages</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Neon-lit stages on the horizon.</h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            From intimate Tokyo lounges to coastal festivals in California, each show reimagines HIBIKI&apos;s catalog
            with live improvisation, guest collaborators, and visual storytelling.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {upcomingShows.map((show) => (
            <article
              key={`${show.date}-${show.venue}`}
              className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6 shadow-lg shadow-black/40 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/35"
            >
              <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                <span>{formatShowDate(show.date)}</span>
                <span>{show.city}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white">{show.venue}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{show.note}</p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Reserve Tickets <span aria-hidden>*</span>
              </button>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Experience Notes</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Live looping, improvising sax, and cinematic projections in motion.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Every venue is transformed with modular lighting, tactile textiles, and scent design to match each set.
                Expect spontaneous collaborations and unreleased edits unique to the night.
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Join the post-show &quot;Afterlight&quot; lounges for stripped-back versions, Q&amp;A with the crew, and
                limited merch drops featuring analog prints and exclusive cassette mixes.
              </p>
              <p>
                Looking to host a private or brand-aligned showcase? Reach out through the contact page to craft a
                bespoke set design and sound palette.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative border-t border-white/10 bg-black/40 py-10 text-center text-xs text-white/50">
        <div>HIBIKI - Studio Nightfall (c) {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
