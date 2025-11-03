"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { contactLinks, features, releases, upcomingShows } from "@/lib/content";

function formatShowDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

export default function Home() {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (hasIncremented.current) {
      return;
    }
    hasIncremented.current = true;

    const syncVisitCount = async () => {
      try {
        const response = await fetch("/api/visitor", { method: "POST" });
        if (!response.ok) {
          throw new Error("Failed to increment");
        }
        const data = (await response.json()) as { count?: number };
        setVisitCount(typeof data.count === "number" ? data.count : null);
      } catch (error) {
        console.error("Failed to increment visitor count", error);
        try {
          const fallback = await fetch("/api/visitor");
          if (!fallback.ok) {
            throw new Error("Failed to fetch count");
          }
          const data = (await fallback.json()) as { count?: number };
          setVisitCount(typeof data.count === "number" ? data.count : null);
        } catch (fallbackError) {
          console.error("Failed to fetch visitor count", fallbackError);
          setVisitCount(null);
        }
      }
    };

    void syncVisitCount();
  }, []);

  const quickLinks = [
    {
      label: "About",
      description: "Discover HIBIKI's story, influences, and creative approach.",
      href: "/about",
    },
    {
      label: "Music",
      description: "Listen to the latest releases sculpted for twilight hours.",
      href: "/music",
    },
    {
      label: "Shows",
      description: "Track upcoming tour dates and reserve intimate tickets.",
      href: "/shows",
    },
    {
      label: "Connect",
      description: "Collaborations, management, and livestream appearances.",
      href: "/connect",
    },
  ];

  const spotlightRelease = releases[0];
  const highlightShow = upcomingShows[0];
  const highlightFeature = features[0];
  const primaryContact = contactLinks[0];
  const contactLinkProps =
    primaryContact.href.startsWith("http") || primaryContact.href.startsWith("//")
      ? { target: "_blank", rel: "noreferrer" }
      : {};

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl will-change-transform"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-40 sm:gap-24 sm:px-10 sm:pb-28 sm:pt-44 lg:gap-28 lg:px-12 lg:pt-48">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm sm:text-sm">
              <span>Neo-Soul Musician</span>
              <span>Tokyo to Worldwide</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              HIBIKI
              <span className="block text-lg font-normal text-white/70 sm:text-xl">
                Silken vocals, analog warmth, twilight grooves.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              HIBIKI blends jazz harmonies, late-night electronica, and noir film soundscapes into immersive live sets.
              Each performance is sculpted through live looping, analog warmth, and minimalist lighting installations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/music"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-purple-600/30 transition hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Listen to the Latest
              </Link>
              <Link
                href="/shows"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                See Upcoming Shows
              </Link>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-sm">
              Visitors {visitCount !== null ? visitCount.toLocaleString() : "..."}
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

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col justify-between rounded-3xl border border-white/15 bg-white/5 p-6 text-left shadow-lg shadow-purple-900/30 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">Explore</span>
                <h2 className="text-2xl font-semibold text-white group-hover:text-white/90">{item.label}</h2>
                <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                Enter <span aria-hidden>-&gt;</span>
              </span>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Spotlight Release</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{spotlightRelease.title}</h3>
            <p className="mt-2 text-sm text-white/60">
              {spotlightRelease.type} · {spotlightRelease.year}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{spotlightRelease.description}</p>
            <ul className="mt-6 space-y-2 text-xs uppercase tracking-[0.3em] text-white/50">
              {spotlightRelease.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3">
                  <span className="h-px w-8 bg-white/40" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/music"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              View Discography <span aria-hidden>-&gt;</span>
            </Link>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Next Appearance</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{highlightShow.venue}</h3>
            <p className="mt-2 text-sm text-white/60">
              {formatShowDate(highlightShow.date)} · {highlightShow.city}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{highlightShow.note}</p>
            <Link
              href="/shows"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              View Tour Schedule <span aria-hidden>-&gt;</span>
            </Link>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Recent Highlight</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{highlightFeature.label}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{highlightFeature.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span>Livestreams</span>
              <span>Residencies</span>
              <span>Scores</span>
              <span>Collaborations</span>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Stay Connected</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Join the circle for premieres, livestreams, and secret sets.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Get early access to cinematic releases, private showcases, and cross-genre collaborations. Management
                and booking inquiries are handled directly through the studio team.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Featured Channel</p>
                <div className="mt-3 text-lg font-semibold text-white">{primaryContact.label}</div>
                <a
                  href={primaryContact.href}
                  {...contactLinkProps}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  {primaryContact.handle} <span aria-hidden>-&gt;</span>
                </a>
              </div>
              <Link
                href="/connect"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Contact Options
              </Link>
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
