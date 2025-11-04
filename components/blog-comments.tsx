"use client";

import { useEffect, useMemo, useState } from "react";

type Comment = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

type BlogCommentsProps = {
  slug: string;
};

const STORAGE_PREFIX = "hibiki-blog-comments";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadComments(slug: string): Comment[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(`${STORAGE_PREFIX}:${slug}`);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((item): item is Comment => {
      return (
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.author === "string" &&
        typeof item.message === "string" &&
        typeof item.createdAt === "string"
      );
    });
  } catch (error) {
    console.error("コメントの読み込みに失敗しました", error);
    return [];
  }
}

function saveComments(slug: string, comments: Comment[]) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}:${slug}`, JSON.stringify(comments));
  } catch (error) {
    console.error("コメントの保存に失敗しました", error);
  }
}

export function BlogComments({ slug }: BlogCommentsProps) {
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setComments(loadComments(slug));
  }, [slug]);

  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }, [comments]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      setError("コメント本文を入力してください。");
      return;
    }
    if (trimmedMessage.length > 500) {
      setError("コメント本文は500文字以内で入力してください。");
      return;
    }

    const newComment: Comment = {
      id: createId(),
      author: trimmedAuthor || "匿名",
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    saveComments(slug, updatedComments);
    setAuthor("");
    setMessage("");
    setError(null);
  };

  return (
    <section className="space-y-4 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-white/80 sm:p-6">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-white">コメントを書く</h3>
        <p className="text-xs text-white/60">投稿内容はブラウザのみに保存され、公開サーバーへは送信されません。</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50" htmlFor={`${slug}-author`}>
            お名前（任意）
          </label>
          <input
            id={`${slug}-author`}
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="匿名で投稿することもできます"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50" htmlFor={`${slug}-message`}>
            コメント本文
          </label>
          <textarea
            id={`${slug}-message`}
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="h-32 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="感想や質問などを気軽にどうぞ（500文字まで）"
            maxLength={500}
          />
        </div>
        {error && <p className="text-xs text-rose-200">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            コメントを投稿
          </button>
        </div>
      </form>
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
          コメント一覧（{sortedComments.length}）
        </h4>
        {sortedComments.length === 0 ? (
          <p className="text-xs text-white/50">まだコメントはありません。最初のメッセージを残してみませんか？</p>
        ) : (
          <ul className="space-y-3">
            {sortedComments.map((comment) => {
              const timestamp = new Date(comment.createdAt);
              const formatted = new Intl.DateTimeFormat("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }).format(timestamp);
              return (
                <li
                  key={comment.id}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white/80 transition hover:border-white/30"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-semibold text-white">{comment.author}</span>
                    <time className="text-[11px] uppercase tracking-[0.3em] text-white/40">{formatted}</time>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap leading-relaxed text-white/80">{comment.message}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
