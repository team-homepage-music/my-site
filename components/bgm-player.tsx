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
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex max-w-xs flex-col items-end gap-2 text-sm text-white/80 sm:right-10">
      <button
        type="button"
        onClick={togglePlayback}
        className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          isPlaying
            ? "border-emerald-400/60 bg-emerald-500/20 text-white shadow-lg shadow-emerald-500/30"
            : "border-white/25 bg-white/10 hover:border-white/50 hover:bg-white/20"
        }`}
        aria-pressed={isPlaying}
      >
        <span
          className={`h-2 w-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/60"}`}
          aria-hidden
        />
        <span>{isPlaying ? "BGM停止" : "BGM再生"}</span>
      </button>
      {loadError && <p className="pointer-events-auto rounded-2xl bg-black/70 px-3 py-2 text-xs text-red-300">{loadError}</p>}
      <audio ref={audioRef} src={BGM_SOURCE} loop preload="auto" />
    </div>
  );
}
