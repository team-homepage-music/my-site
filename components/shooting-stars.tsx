"use client";

import { useEffect, useState, type CSSProperties } from "react";

type Streak = {
  delay: number;
  duration: number;
  offset: number;
  angle: number;
  length: number;
};

const STREAK_COUNT = 18;

export function ShootingStars() {
  const [streaks, setStreaks] = useState<Streak[]>(() => []);

  useEffect(() => {
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const generated = Array.from({ length: STREAK_COUNT }).map(() => ({
      delay: randomInRange(0, 14),
      duration: randomInRange(6, 10),
      offset: randomInRange(0, 100),
      angle: randomInRange(18, 34),
      length: randomInRange(100, 160),
    }));
    setStreaks(generated);
  }, []);

  return (
    <div className="shooting-stars" aria-hidden="true">
      {streaks.map((streak, index) => (
        <span
          key={`shooting-star-${index}`}
          className="shooting-stars__streak"
          style={
            {
              "--streak-delay": `${streak.delay}s`,
              "--streak-duration": `${streak.duration}s`,
              "--streak-offset": `${streak.offset}vw`,
              "--streak-angle": `${streak.angle}deg`,
              "--streak-length": `${streak.length}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
