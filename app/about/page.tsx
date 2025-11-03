import { features } from "@/lib/content";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-40 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>Artist Profile</span>
            <span>Studio Nightfall</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Sonic postcards from night cities and neon rain.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            Raised between Kyoto&apos;s jazz kissaten bars and London&apos;s warehouse venues, HIBIKI crafts intimate
            narratives that oscillate between confessional ballads and meditative grooves. Her latest work dives into
            modular synth improvisation paired with human stories scouted from midnight trains.
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/70">
            Offstage, she hosts &quot;Afterlight&quot;: a monthly livestream illuminating emerging artists across Asia.
            Expect candle-lit visuals, tactile textures, and melodies that linger like half-remembered dreams.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.label}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/30 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">Highlight</span>
              <h2 className="mt-3 text-2xl font-semibold text-white">{feature.label}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Creative Pillars</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Live looping, modular synths, and documentary storytelling.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Each project is rooted in field recordings gathered across the Pacific, collaborating with filmmakers,
                poets, and movement artists to shape immersive performances.
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Current residency at Midnight Sun Studios explores tactile lighting and analog tape saturation,
                capturing sessions directly onto reel-to-reel before sculpting digital mixes designed for nocturnal
                listening rooms.
              </p>
              <p>
                HIBIKI&apos;s creative circle includes improvising saxophonists, modular synth architects, and spoken
                word artists. Together they design bespoke shows for galleries, pop-up clubs, and cinematic livestreams.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/music"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Explore Discography
          </Link>
          <Link
            href="/shows"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Upcoming Shows
          </Link>
        </div>
      </main>
      <footer className="relative border-t border-white/10 bg-black/40 py-10 text-center text-xs text-white/50">
        <div>HIBIKI - Studio Nightfall (c) {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
