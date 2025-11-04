"use client";

import { useEffect, useRef, useState } from "react";

const BGM_SOURCE = "/audio/bgm.mp3";

export function BgmPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => setLoadError("BGMの読み込みに失敗しました。ファイルを確認してください。");

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
      setLoadError(null);
    } catch (error) {
      console.error("Failed to toggle BGM playback", error);
      setLoadError("BGMの再生を開始できませんでした。ブラウザの設定をご確認ください。");
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex max-w-xs flex-col items-end gap-2 text-sm text-slate-700 sm:right-10">
      <button
        type="button"
        onClick={togglePlayback}
        className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500 ${
          isPlaying
            ? "border-emerald-400/60 bg-emerald-100 text-emerald-600 shadow"
            : "border-slate-300 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
        }`}
        aria-pressed={isPlaying}
      >
        <span
          className={`h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
          aria-hidden
        />
        <span>{isPlaying ? "BGM停止" : "BGM再生"}</span>
      </button>
      {loadError && (
        <p className="pointer-events-auto rounded-2xl bg-rose-100 px-3 py-2 text-xs text-rose-600 shadow-sm">{loadError}</p>
      )}
      <audio ref={audioRef} src={BGM_SOURCE} loop preload="auto" />
    </div>
  );
}
