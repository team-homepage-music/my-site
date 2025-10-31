import Link from "next/link";

const releases = [
  {
    title: "Midnight Reverie",
    type: "LP",
    year: "2023",
    description:
      "A smoky blend of neo-soul and electronica, crafted in collaboration with underground beatmakers from Tokyo and Berlin.",
    highlights: ["#3 on Indie Soul Charts", "BBC Radio 1 Feature"],
    href: "#",
  },
  {
    title: "Paper Lanterns",
    type: "EP",
    year: "2022",
    description:
      "Five-track exploration of intimate ballads with lush string arrangements and analog synth textures.",
    highlights: ["1M+ Streams", "Featured on Spotify's Fresh Finds"],
    href: "#",
  },
  {
    title: "City Sketches",
    type: "Single",
    year: "2024",
    description:
      "Warm lo-fi groove capturing the after-hours glow of Shibuya with live saxophone improvisation.",
    highlights: ["NPR Tiny Desk Contest Finalist"],
    href: "#",
  },
];

const upcomingShows = [
  {
    date: "2024-07-18",
    city: "Tokyo, JP",
    venue: "Velvet Lounge",
    note: "Sold Out - Late Show",
  },
  {
    date: "2024-08-02",
    city: "Osaka, JP",
    venue: "Blue Canvas Club",
    note: "With special guest DJ Nightshade",
  },
  {
    date: "2024-09-14",
    city: "Seoul, KR",
    venue: "Aurora Hall",
    note: "Tickets available now",
  },
  {
    date: "2024-10-05",
    city: "Los Angeles, US",
    venue: "Echo Park Sessions",
    note: "Part of Golden Hour Festival",
  },
];

const features = [
  {
    label: "Tiny Desk Finalist",
    description: "One of ten artists featured in NPR's 2024 Tiny Desk Contest finale showcase.",
  },
  {
    label: "Residency",
    description: "Three-month residency at Midnight Sun Studios exploring modular synth improvisation.",
  },
  {
    label: "Composer",
    description: 'Scored the indie short film "Streets of Paper" premiering at Raindance 2023.',
  },
];

const contactLinks = [
  { label: "Instagram", handle: "@aikomiyazaki.music", href: "#" },
  { label: "Spotify", handle: "Listen on Spotify", href: "#" },
  { label: "YouTube", handle: "Live Sessions", href: "#" },
  { label: "Management", handle: "booking@aikomiyazaki.com", href: "mailto:booking@aikomiyazaki.com" },
];

function formatShowDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl will-change-transform"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-20 sm:gap-20 sm:px-10 sm:pb-24 sm:pt-24 lg:gap-28 lg:px-12 lg:pt-32">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm sm:text-sm">
              <span>Neo-Soul Musician</span>
              <span>Tokyo to Worldwide</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Aiko Miyazaki
              <span className="block text-lg font-normal text-white/70 sm:text-xl">
                Silken vocals, analog warmth, twilight grooves.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              Aiko blends jazz harmonies, late-night electronica, and noir film soundscapes into immersive live sets.
              Each performance is shaped by live looping, improvised saxophone cameos, and minimalist lighting.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#music"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-purple-600/30 transition hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Listen to the Latest
              </Link>
              <Link
                href="#shows"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                See Upcoming Shows
              </Link>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-64 w-full max-w-xs overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-inner shadow-black/50 backdrop-blur-sm sm:h-72 sm:max-w-sm lg:h-80 lg:w-80 lg:max-w-none">
              <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-300 to-amber-200 opacity-70 blur-3xl" />
              <div className="relative flex h-full w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-zinc-950/90 via-zinc-900/70 to-purple-900/70 p-6">
                <div className="text-sm uppercase tracking-[0.3em] text-white/60">Live Session</div>
                <div>
                  <div className="text-3xl font-semibold leading-tight text-white">
                    Echoes
                    <span className="block text-sm font-normal uppercase tracking-[0.4em] text-white/60">
                      Studio Take 01
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
                  <span>Recorded in Tokyo</span>
                  <span>Analog Reel</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">About</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Sonic postcards from night cities and neon rain.
            </h2>
            <p className="text-base leading-relaxed text-white/80">
              Raised between Kyoto's jazz kissaten bars and London's warehouse venues, Aiko crafts intimate narratives
              that oscillate between confessional ballads and meditative grooves. Her latest work dives into modular
              synth improvisation paired with human stories scouted from midnight trains.
            </p>
            <p className="text-base leading-relaxed text-white/70">
              When not on tour, she hosts "Afterlight": a monthly livestream showcasing emerging artists across Asia.
              Expect candle-lit stages, tactile textures, and melodies that linger like half-remembered dreams.
            </p>
          </div>
          <div className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-800/30 backdrop-blur-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Highlights</p>
            <ul className="space-y-6">
              {features.map((feature) => (
                <li key={feature.label} className="space-y-2">
                  <div className="text-lg font-semibold text-white">{feature.label}</div>
                  <p className="text-sm leading-relaxed text-white/70">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="music" className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Latest Releases</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Music crafted for twilight listening.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {releases.map((release) => (
              <article
                key={release.title}
                className="group rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40"
              >
                <div className="mb-5 flex items-center justify-between text-sm uppercase tracking-[0.3em] text-white/60">
                  <span>{release.type}</span>
                  <span>{release.year}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white group-hover:text-white/90">{release.title}</h3>
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
          </div>
        </section>

        <section id="shows" className="space-y-10">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Upcoming Schedule</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Neon-lit stages on the horizon.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingShows.map((show) => (
              <article
                key={`${show.date}-${show.venue}`}
                className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 p-6 shadow-lg shadow-black/40 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/35"
              >
                <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                  <span>{formatShowDate(show.date)}</span>
                  <span>{show.city}</span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white">{show.venue}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{show.note}</p>
                <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Reserve Tickets <span aria-hidden>*</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          id="connect"
          className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12"
        >
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Connect</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Collaborations, studio bookings, and private showcases.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                For bespoke performances, cinematic scoring, or cross-genre collaborations, reach out with project
                details and timelines. Remote sessions available via analog-equipped studio in Tokyo.
              </p>
            </div>
            <ul className="space-y-4">
              {contactLinks.map((link) => (
                <li
                  key={link.label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <span>{link.label}</span>
                  <Link href={link.href}>{link.handle}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="relative border-t border-white/10 bg-black/40 py-10 text-center text-xs text-white/50">
        <div>Aiko Miyazaki - Studio Nightfall (c) {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
