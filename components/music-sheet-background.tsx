"use client";

import type { CSSProperties } from "react";

type MusicNote = {
  top: number;
  left: number;
  scale: number;
  delay: number;
  duration: number;
  glyph: "♪" | "♩" | "♬";
  rotate: number;
};

const NOTES: MusicNote[] = [
  { top: 8, left: 12, scale: 0.95, delay: 0, duration: 9, glyph: "♪", rotate: -6 },
  { top: 18, left: 32, scale: 1.05, delay: -3, duration: 11, glyph: "♩", rotate: 4 },
  { top: 28, left: 58, scale: 1.15, delay: -6, duration: 10, glyph: "♬", rotate: -2 },
  { top: 42, left: 20, scale: 0.9, delay: -1, duration: 12, glyph: "♪", rotate: -8 },
  { top: 52, left: 72, scale: 1.2, delay: -8, duration: 13, glyph: "♩", rotate: 7 },
  { top: 64, left: 38, scale: 1.1, delay: -5, duration: 10, glyph: "♬", rotate: -3 },
  { top: 74, left: 15, scale: 0.85, delay: -2, duration: 9, glyph: "♩", rotate: 6 },
  { top: 82, left: 56, scale: 1.05, delay: -7, duration: 12, glyph: "♪", rotate: -4 },
  { top: 92, left: 78, scale: 1.25, delay: -10, duration: 14, glyph: "♬", rotate: 2 },
  { top: 12, left: 84, scale: 0.9, delay: -4, duration: 10, glyph: "♩", rotate: 8 },
  { top: 36, left: 88, scale: 1.1, delay: -9, duration: 11, glyph: "♩", rotate: -5 },
  { top: 58, left: 6, scale: 0.95, delay: -3, duration: 9, glyph: "♪", rotate: 3 },
];

export function MusicSheetBackground() {
  return (
    <div className="music-sheet" aria-hidden="true">
      <div className="music-sheet__overlay" />
      {NOTES.map((note, index) => (
        <span
          key={`music-note-${index}`}
          className="music-sheet__note"
          data-symbol={note.glyph}
          style={
            {
              "--note-top": `${note.top}%`,
              "--note-left": `${note.left}%`,
              "--note-scale": note.scale,
              "--note-delay": `${note.delay}s`,
              "--note-duration": `${note.duration}s`,
              "--note-rotate": `${note.rotate}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
