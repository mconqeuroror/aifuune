import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const MONEY_COUNT_DURATION_MS = 1300;
export const MONEY_COUNT_INITIAL_DELAY_MS = 500;

function parseMoney(value: string): number {
  return Number(value.replace(/[$,]/g, "")) || 0;
}

function formatMoney(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

/** Stagger: 1st → 2nd → 3rd → rest together */
export function getMoneyCountDelay(rank: number): number {
  if (rank <= 1) return MONEY_COUNT_INITIAL_DELAY_MS;
  if (rank === 2) return MONEY_COUNT_INITIAL_DELAY_MS + MONEY_COUNT_DURATION_MS;
  if (rank === 3) {
    return MONEY_COUNT_INITIAL_DELAY_MS + MONEY_COUNT_DURATION_MS * 2;
  }
  return MONEY_COUNT_INITIAL_DELAY_MS + MONEY_COUNT_DURATION_MS * 3;
}

type AnimatedMoneyProps = {
  amount: string;
  rank: number;
  className?: string;
};

export function AnimatedMoney({ amount, rank, className }: AnimatedMoneyProps) {
  const target = parseMoney(amount);
  const [display, setDisplay] = useState(0);
  const frameRef = useRef<number | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplay(0);

    delayRef.current = setTimeout(() => {
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / MONEY_COUNT_DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(target * eased);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(target);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    }, getMoneyCountDelay(rank));

    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [amount, rank, target]);

  return (
    <span
      className={cn("tabular-nums", className)}
      aria-label={amount}
    >
      {formatMoney(display)}
    </span>
  );
}
