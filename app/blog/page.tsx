import { BlogComments } from "@/components/blog-comments";
import { blogPosts } from "@/lib/content";

function formatPublishedDate(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export default function BlogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0b1022] via-[#121b2f] to-[#05080f] text-zinc-100">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px] bg-gradient-to-br from-purple-500/50 via-fuchsia-400/30 to-emerald-300/20 blur-3xl"
        aria-hidden
      />
      <main className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 pb-24 pt-36 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-40 lg:gap-24 lg:px-12 lg:pt-44">
        <header className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-sm">
            <span>HIBIKI JOURNAL</span>
            <span>NOTEBOOK</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">夜風を綴るブログ。</h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/80">
            制作の舞台裏や旅先で拾ったインスピレーション、機材ノートをまとめたHIBIKIの記録帳です。黄昏の音をかたちにする過程と、その時々に見つけた小さな物語をお届けします。
          </p>
        </header>

        <section className="space-y-10">
          {blogPosts.map((post) => (
            <div key={post.slug} className="space-y-6">
              <article className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-purple-900/40 backdrop-blur transition hover:-translate-y-1 hover:border-white/35 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                  <span className="rounded-full border border-white/30 px-3 py-1 text-[11px] text-white/80">{post.category}</span>
                  <span>{formatPublishedDate(post.publishedAt)}</span>
                  <span>・</span>
                  <span>{post.readingTimeMinutes}分で読了</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-white group-hover:text-white/90 sm:text-3xl">{post.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{post.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
                  <span>記事を読む（準備中）</span>
                  <span aria-hidden className="translate-x-0 transition group-hover:translate-x-1">→</span>
                </div>
                <div className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-purple-400/20 via-fuchsia-400/15 to-emerald-300/15 blur-3xl transition-opacity group-hover:opacity-100" />
              </article>
              <BlogComments slug={post.slug} />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
