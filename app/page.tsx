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
          throw new Error("カウントの更新に失敗しました");
        }
        const data = (await response.json()) as { count?: number };
        setVisitCount(typeof data.count === "number" ? data.count : null);
      } catch (error) {
        console.error("来訪者数の更新に失敗しました", error);
        try {
          const fallback = await fetch("/api/visitor");
          if (!fallback.ok) {
            throw new Error("カウントの取得に失敗しました");
          }
          const data = (await fallback.json()) as { count?: number };
          setVisitCount(typeof data.count === "number" ? data.count : null);
        } catch (fallbackError) {
          console.error("来訪者数の取得に失敗しました", fallbackError);
          setVisitCount(null);
        }
      }
    };

    void syncVisitCount();
  }, []);

  const quickLinks = [
    {
      label: "アバウト",
      description: "HIBIKIのバックグラウンドや創作の源、サウンドの哲学を知る。",
      href: "/about",
    },
    {
      label: "ミュージック",
      description: "黄昏の時間に寄り添う最新リリースをチェック。",
      href: "/music",
    },
    {
      label: "ショー",
      description: "これからのツアー日程と親密な公演の席を追いかける。",
      href: "/shows",
    },
    {
      label: "コンタクト",
      description: "コラボレーションや配信出演の相談窓口はこちら。",
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2f261e] via-[#1f1a15] to-[#120e0a] text-amber-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-br from-amber-400/45 via-amber-200/25 to-transparent blur-3xl will-change-transform"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-40 sm:gap-24 sm:px-10 sm:pb-28 sm:pt-44 lg:gap-28 lg:px-12 lg:pt-48">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex flex-wrap items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.25em] text-white/80 backdrop-blur-sm sm:text-sm">
              <span>ネオソウル・ミュージシャン</span>
              <span>TOKYO ⇄ WORLD</span>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              HIBIKI
              <span className="block text-lg font-normal text-white/70 sm:text-xl">
                絹のような声とアナログの温度、黄昏のグルーヴ。
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-white/80">
              ジャズのハーモニーと深夜のエレクトロニカ、フィルムノワール的な映像感を束ね、聴く人を包み込むライブを描きます。
              ライブごとにライブルーピングとアナログ機材、最小限の照明演出で音と温度を再構築しています。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/music"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-lg shadow-purple-600/30 transition hover:-translate-y-0.5 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                最新曲を聴く
              </Link>
              <Link
                href="/shows"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                公演スケジュールを見る
              </Link>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-sm">
              来訪者 {visitCount !== null ? visitCount.toLocaleString() : "..."}
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="relative h-64 w-full max-w-xs overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-6 shadow-inner shadow-black/50 backdrop-blur-sm sm:h-72 sm:max-w-sm lg:h-80 lg:w-80 lg:max-w-none">
              <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-purple-500 via-purple-300 to-amber-200 opacity-70 blur-3xl" />
              <div className="relative flex h-full w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-zinc-950/90 via-zinc-900/70 to-purple-900/70 p-6">
                <div className="text-sm uppercase tracking-[0.3em] text-white/60">ライブセッション</div>
                <div>
                  <div className="text-3xl font-semibold leading-tight text-white">
                    Echoes
                    <span className="block text-sm font-normal uppercase tracking-[0.4em] text-white/60">
                      スタジオテイク 01
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/60">
                  <span>東京録音</span>
                  <span>アナログリール</span>
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
                <span className="text-xs uppercase tracking-[0.3em] text-white/60">ガイド</span>
                <h2 className="text-2xl font-semibold text-white group-hover:text-white/90">{item.label}</h2>
                <p className="text-sm leading-relaxed text-white/70">{item.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                詳細を見る <span aria-hidden>-&gt;</span>
              </span>
            </Link>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">注目リリース</p>
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
              ディスコグラフィーを見る <span aria-hidden>-&gt;</span>
            </Link>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">次回出演</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{highlightShow.venue}</h3>
            <p className="mt-2 text-sm text-white/60">
              {formatShowDate(highlightShow.date)} · {highlightShow.city}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{highlightShow.note}</p>
            <Link
              href="/shows"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              ツアー日程を表示 <span aria-hidden>-&gt;</span>
            </Link>
          </article>

          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">最新ハイライト</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{highlightFeature.label}</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{highlightFeature.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-white/70">
              <span>ライブ配信</span>
              <span>レジデンシー</span>
              <span>劇伴</span>
              <span>コラボレーション</span>
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">お知らせ</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                先行公開やシークレットセットの情報をいち早く。
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                映像作品の先行公開、プライベートショウケース、ジャンルを横断するコラボ情報をお届けします。
                マネジメントやブッキングの問い合わせはスタジオチームが直接対応します。
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">注目チャンネル</p>
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
                連絡方法を確認する
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
