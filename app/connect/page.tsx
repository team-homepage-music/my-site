import { contactLinks } from "@/lib/content";

export default function ConnectPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 pt-36 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-40 lg:gap-24 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>Studio Nightfall</span>
            <span>Collaborations</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Collaborations, studio bookings, and private showcases.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            Whether you&apos;re curating a gallery experience, seeking cinematic scoring, or planning intimate brand
            events, HIBIKI&apos;s team can tailor performances, livestream concepts, and installation-ready soundscapes.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <h2 className="text-xl font-semibold text-white">Direct Channels</h2>
          <ul className="space-y-4">
            {contactLinks.map((link) => (
              <li
                key={link.label}
                className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                <span>{link.label}</span>
                <a href={link.href} target={link.href.startsWith("mailto:") ? "_self" : "_blank"} rel="noreferrer">
                  {link.handle}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Livestreams</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Afterlight Sessions</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Monthly broadcasts featuring emerging artists throughout Asia. Custom segments available for cultural or
              brand collaborations, filmed in studio with cinematic lighting and tactile set design.
            </p>
          </article>
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Private Events</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Candlelit Installations</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Bespoke performances for galleries, rooftops, and creative retreats. Includes on-site sound design, visual
              direction, and optional modular synth improvisations tailored to the space.
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              Please provide project scope, desired dates, location, and any technical requirements when reaching out.
              Remote scoring and collaborative production are available via the analog-equipped Studio Nightfall in
              Tokyo.
            </p>
            <p>
              For media inquiries, download press assets and high-resolution imagery after connecting with the management
              team. Response times are typically within three business days.
            </p>
          </div>
        </section>
      </main>
      <footer className="relative border-t border-white/10 bg-black/40 py-10 text-center text-xs text-white/50">
        <div>HIBIKI - Studio Nightfall (c) {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
