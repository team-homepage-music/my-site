"use client";

import { useMemo, useState } from "react";
import { upcomingShows } from "@/lib/content";

function formatShowDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

type CalendarDay = {
  iso: string;
  label: number;
  isCurrentMonth: boolean;
  shows: typeof upcomingShows;
};

type CalendarMonth = {
  key: string;
  label: string;
  weeks: CalendarDay[][];
};

function buildCalendarMonths(): CalendarMonth[] {
  const showsByDate = upcomingShows.reduce<Map<string, typeof upcomingShows>>((map, show) => {
    const iso = show.date;
    const list = map.get(iso);
    if (list) {
      list.push(show);
    } else {
      map.set(iso, [show]);
    }
    return map;
  }, new Map());

  const showsByMonth = upcomingShows.reduce<Map<string, typeof upcomingShows>>((map, show) => {
    const date = new Date(`${show.date}T00:00:00Z`);
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const list = map.get(key);
    if (list) {
      list.push(show);
    } else {
      map.set(key, [show]);
    }
    return map;
  }, new Map());

  const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });

  return Array.from(showsByMonth.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key]) => {
      const [yearStr, monthStr] = key.split("-");
      const year = Number(yearStr);
      const monthIndex = Number(monthStr) - 1;
      const weeks: CalendarDay[][] = [];

      const firstDay = new Date(Date.UTC(year, monthIndex, 1));
      const startOffset = firstDay.getUTCDay();
      const cursor = new Date(firstDay);
      cursor.setUTCDate(cursor.getUTCDate() - startOffset);

      for (let week = 0; week < 6; week++) {
        const days: CalendarDay[] = [];
        for (let day = 0; day < 7; day++) {
          const iso = cursor.toISOString().slice(0, 10);
          days.push({
            iso,
            label: cursor.getUTCDate(),
            isCurrentMonth: cursor.getUTCMonth() === monthIndex,
            shows: showsByDate.get(iso) ?? [],
          });
          cursor.setUTCDate(cursor.getUTCDate() + 1);
        }
        weeks.push(days);
      }

      return {
        key,
        label: formatter.format(new Date(Date.UTC(year, monthIndex, 1))),
        weeks,
      };
    });
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ShowsPage() {
  const calendarMonths = useMemo(() => buildCalendarMonths(), []);
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const activeMonth = calendarMonths[activeMonthIndex] ?? null;

  const hasPrevious = activeMonthIndex > 0;
  const hasNext = activeMonthIndex < calendarMonths.length - 1;

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

        {activeMonth && (
          <section className="space-y-8 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Calendar View</p>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Map out the upcoming journey.
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-white/70">
                  Use the arrows to browse upcoming months. Highlighted dates include venue details and booking notes.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveMonthIndex((index) => Math.max(index - 1, 0))}
                  disabled={!hasPrevious}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:-translate-y-0.5 hover:border-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
                >
                  ‹
                </button>
                <div className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                  {activeMonth.label}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setActiveMonthIndex((index) => Math.min(index + 1, calendarMonths.length - 1))
                  }
                  disabled={!hasNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:-translate-y-0.5 hover:border-white disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/30"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
              <div className="grid grid-cols-7 text-xs uppercase tracking-[0.3em] text-white/60">
                {weekdayLabels.map((weekday) => (
                  <div key={`${activeMonth.key}-${weekday}`} className="border-b border-white/10 px-3 py-2 text-center">
                    {weekday}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-px bg-white/10">
                {activeMonth.weeks.flat().map((day, index) => {
                  const hasShows = day.shows.length > 0;
                  return (
                    <div
                      key={`${activeMonth.key}-${day.iso}-${index}`}
                      className={`min-h-[96px] bg-black/40 p-3 text-xs transition ${
                        day.isCurrentMonth ? "text-white/80" : "bg-black/20 text-white/40"
                      } ${hasShows ? "ring-1 ring-purple-400/60" : "border border-transparent"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{day.label}</span>
                        {hasShows && (
                          <span className="rounded-full bg-purple-400/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.3em] text-purple-100">
                            Show
                          </span>
                        )}
                      </div>
                      {hasShows && (
                        <ul className="mt-3 space-y-1 text-[11px] leading-snug text-white/80">
                          {day.shows.map((show) => (
                            <li key={`${show.date}-${show.venue}`}>
                              <span className="block font-semibold text-white">{show.venue}</span>
                              <span className="text-white/60">{show.note}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

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
