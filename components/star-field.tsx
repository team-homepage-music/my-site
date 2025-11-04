"use client";

import { useMemo, type CSSProperties } from "react";

type Star = {
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const STAR_COUNT = 220;

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function createStar(index: number): Star {
  const base = index + 1;
  const random1 = pseudoRandom(base);
  const random2 = pseudoRandom(base * 1.37);
  const random3 = pseudoRandom(base * 2.91);
  const random4 = pseudoRandom(base * 5.12);
  const random5 = pseudoRandom(base * 7.77);

  const top = random1 * 100;
  const left = random2 * 120 - 10;
  const size = 1.2 + random3 * 2.2;
  const duration = 2.5 + random4 * 3.5;
  const delay = random5 * -6;
  const opacity = 0.35 + random3 * 0.6;

  return { top, left, size, duration, delay, opacity };
}

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: STAR_COUNT }, (_, index) => createStar(index));
  }, []);

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={`star-${index}`}
          className="star-field__star"
          style={{
            "--star-top": `${star.top}%`,
            "--star-left": `${star.left}%`,
            "--star-size": `${star.size}px`,
            "--star-duration": `${star.duration}s`,
            "--star-delay": `${star.delay}s`,
            "--star-opacity": star.opacity.toString(),
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
