import { features } from "@/lib/content";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#2f261e] via-[#1f1a15] to-[#120e0a] text-amber-50">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-gradient-to-br from-amber-400/45 via-amber-200/25 to-transparent blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-40 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>アーティストプロフィール</span>
            <span>Studio Nightfall</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            夜の街とネオンの雨が描くサウンドポストカード。
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            京都のジャズ喫茶とロンドンの倉庫街、その二つの都市を行き来して育ったHIBIKIは、告白的なバラードと瞑想的なグルーヴを行き来する物語を紡ぎ続けています。
            最新作ではモジュラーシンセの即興と、深夜の列車で拾い集めた人々のストーリーを重ね合わせています。
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/70">
            ステージを降りると、アジア各地の新鋭アーティストを照らす月例配信「Afterlight」を主宰。
            キャンドルとテクスチャーを生かした映像、美しい余韻を残すメロディで、夢の断片のような時間を届けています。
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.label}
              className="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/30 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/40"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-white/60">ハイライト</span>
              <h2 className="mt-3 text-2xl font-semibold text-white">{feature.label}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-8 shadow-xl shadow-purple-900/40 backdrop-blur-sm md:p-12">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">CREATIVE PILLARS</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                ライブルーピングとモジュラーシンセ、ドキュメンタリー的語り口。
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                作品の土台には、太平洋を巡りながら収集したフィールドレコーディングがあります。
                映像作家や詩人、ダンサーとのコラボレーションを重ね、没入感のあるパフォーマンスを形作っています。
              </p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-white/70">
              <p>
                現在行っているMidnight Sun Studiosでのレジデンシーでは、手触りのある照明とアナログテープの飽和感を探求。
                セッションはすべてオープンリールに録音し、夜のリスニングルームにふさわしいデジタルミックスへと磨き上げています。
              </p>
              <p>
                周囲には即興サックス奏者やモジュラーシンセのエンジニア、スポークンワードの詩人が集い、
                ギャラリーやポップアップクラブ、映画的なライブ配信のためのオーダーメイドなショーを共に設計しています。
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/music"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            ディスコグラフィーを見る
          </Link>
          <Link
            href="/shows"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            公演スケジュールへ
          </Link>
        </div>
      </main>
      <footer className="relative border-t border-white/10 bg-black/40 py-10 text-center text-xs text-white/50">
        <div>HIBIKI - Studio Nightfall (c) {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
