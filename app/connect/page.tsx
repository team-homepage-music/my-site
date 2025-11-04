import { contactLinks } from "@/lib/content";

export default function ConnectPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950/85 via-zinc-900/60 to-black/85 text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-purple-600/60 via-fuchsia-500/40 to-amber-500/40 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 pt-36 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-40 lg:gap-24 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>Studio Nightfall</span>
            <span>コラボレーション</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            コラボレーション、スタジオ予約、プライベートショウケースに関するご案内。
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            ギャラリー体験の企画やシネマティックなスコア制作、ブランドの親密なイベントまで。
            HIBIKIのチームがパフォーマンス、配信演出、インスタレーション向けサウンドをオーダーメイドでお届けします。
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <h2 className="text-xl font-semibold text-white">ダイレクトチャネル</h2>
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
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">ライブ配信</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Afterlight Sessions</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              アジア各地の新鋭アーティストを届ける月例配信。
              文化的・ブランド向けのカスタムコーナーも制作可能で、シネマティックな照明と質感豊かなセットで収録します。
            </p>
          </article>
          <article className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">プライベートイベント</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">キャンドルナイト・インスタレーション</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              ギャラリーやルーフトップ、クリエイティブリトリートのためのカスタムパフォーマンス。
              現地の音響演出やビジュアルディレクション、空間に合わせたモジュラーシンセの即興まで対応します。
            </p>
          </article>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="space-y-4 text-sm leading-relaxed text-white/70">
            <p>
              お問い合わせの際は、企画内容・希望日程・場所・必要な技術条件をお知らせください。
              東京のStudio Nightfallではアナログ機材を備えたリモートスコアリングや共同制作も承っています。
            </p>
            <p>
              メディア関係の方は、マネジメントチームと連絡後にプレス素材・高解像度写真をダウンロードいただけます。
              通常1〜3営業日以内にご返信いたします。
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
