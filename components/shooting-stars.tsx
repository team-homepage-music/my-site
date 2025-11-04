"use client";

import { useMemo, type CSSProperties } from "react";

type Streak = {
  delay: number;
  duration: number;
  offset: number;
  angle: number;
  length: number;
};

const STREAK_COUNT = 20;

function generateStreak(index: number): Streak {
  const base = index + 1;
  const delay = ((base * 1.83) % 14) - 7;
  const duration = 6 + ((base * 3.7) % 4);
  const offset = (base * 13.17) % 100;
  const angle = 20 + ((base * 4.57) % 12);
  const length = 110 + ((base * 9.5) % 60);
  return { delay, duration, offset, angle, length };
}

export function ShootingStars() {
  const streaks = useMemo<Streak[]>(() => {
    return Array.from({ length: STREAK_COUNT }, (_, index) => generateStreak(index));
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
