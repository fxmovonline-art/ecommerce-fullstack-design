"use client";

import { useEffect, useMemo, useState } from "react";

type DealCountdownProps = {
  initialDays?: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function formatUnit(value: number) {
  return String(value).padStart(2, "0");
}

function getRemainingParts(targetTime: number) {
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

export default function DealCountdown({ initialDays = 6 }: DealCountdownProps) {
  const targetTime = useMemo(() => Date.now() + initialDays * DAY, [initialDays]);
  const [timeLeft, setTimeLeft] = useState(() => getRemainingParts(targetTime));

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(getRemainingParts(targetTime));
    }, SECOND);

    return () => {
      window.clearInterval(timerId);
    };
  }, [targetTime]);

  return (
    <div className="timer-grid" aria-live="polite">
      <div>
        <strong>{timeLeft.days}</strong>
        <span>Days</span>
      </div>
      <div>
        <strong>{timeLeft.hours}</strong>
        <span>Hour</span>
      </div>
      <div>
        <strong>{timeLeft.minutes}</strong>
        <span>Min</span>
      </div>
      <div>
        <strong>{timeLeft.seconds}</strong>
        <span>Sec</span>
      </div>
    </div>
  );
}