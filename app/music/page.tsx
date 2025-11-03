import { releases } from "@/lib/content";
import Link from "next/link";

export default function MusicPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-36 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-40 lg:gap-24 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>Discography</span>
            <span>Twilight Sessions</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Music crafted for twilight listening.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            From analog-kissed LPs to intimate livestream sessions, HIBIKI&apos;s catalogue explores noir harmonies,
            hypnotic grooves, and cinematic textures inspired by after-hours cityscapes.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {releases.map((release) => (
            <article
              key={release.title}
              className="group rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40"
            >
              <div className="mb-5 flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/60">
                <span>{release.type}</span>
                <span>{release.year}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white group-hover:text-white/90">{release.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{release.description}</p>
              <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.3em] text-white/50">
                {release.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3">
                    <span className="h-px w-8 bg-white/40" aria-hidden />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={release.href}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                Stream Release <span aria-hidden>-&gt;</span>
              </Link>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Behind the Sessions</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Tape-saturated synthscapes, live improvisation, and noir storytelling.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Each piece is recorded through analog chains—reel-to-reel tape, spring reverbs, and modular rigs—before
                being sculpted into immersive headphone experiences.
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                Contributors include underground beatmakers from Tokyo and Berlin, string quartets from Kyoto, and
                spoken word artists from London. Sessions premiere via &quot;Afterlight&quot; with visual collages to
                match the audio palette.
              </p>
              <p>
                Upcoming releases explore dreamlike downtempo, intimate vocal takes, and cinematic pieces designed for
                indie film scores and gallery installations.
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
