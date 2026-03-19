"use client";

import { useEffect, useState } from "react";

type DealCountdownProps = {
  initialDays?: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type RemainingParts = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function formatUnit(value: number) {
  return String(value).padStart(2, "0");
}

function getRemainingParts(targetTime: number): RemainingParts {
  const remaining = Math.max(0, targetTime - Date.now());

  const days = Math.floor(remaining / DAY);
  const hours = Math.floor((remaining % DAY) / HOUR);
  const minutes = Math.floor((remaining % HOUR) / MINUTE);
  const seconds = Math.floor((remaining % MINUTE) / SECOND);

  return {
    days: formatUnit(days),
    hours: formatUnit(hours),
    minutes: formatUnit(minutes),
    seconds: formatUnit(seconds),
  };
}

const PLACEHOLDER_TIME = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export default function DealCountdown({ initialDays = 6 }: DealCountdownProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<RemainingParts>(PLACEHOLDER_TIME);

  useEffect(() => {
    // Start countdown only after client mount to avoid hydration mismatch.
    const targetTime = Date.now() + initialDays * DAY;

    setTimeLeft(getRemainingParts(targetTime));
    setHasMounted(true);

    // Update countdown every second.
    const timerId = window.setInterval(() => {
      setTimeLeft(getRemainingParts(targetTime));
    }, SECOND);

    return () => {
      window.clearInterval(timerId);
    };
  }, [initialDays]);

  return (
    <div className="timer-grid" aria-live="polite">
      <div>
        <strong>{hasMounted ? timeLeft.days : "00"}</strong>
        <span>Days</span>
      </div>
      <div>
        <strong>{hasMounted ? timeLeft.hours : "00"}</strong>
        <span>Hour</span>
      </div>
      <div>
        <strong>{hasMounted ? timeLeft.minutes : "00"}</strong>
        <span>Min</span>
      </div>
      <div>
        <strong>{hasMounted ? timeLeft.seconds : "00"}</strong>
        <span>Sec</span>
      </div>
    </div>
  );
}