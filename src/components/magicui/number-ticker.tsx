import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}

function formatNumber(value: number, decimalPlaces: number): string {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = direction === "down" ? value : startValue;
  const to = direction === "down" ? startValue : value;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let timer = 0;
    let observer: IntersectionObserver | null = null;
    let finished = false;

    const finish = (next: number) => {
      finished = true;
      setDisplay(next);
    };

    const run = () => {
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(from + (to - from) * eased);
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          finish(to);
        }
      };
      timer = window.setTimeout(() => {
        frame = requestAnimationFrame(tick);
      }, delay * 1000);
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer?.disconnect();
          run();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);

    const safety = window.setTimeout(() => {
      if (!finished) finish(value);
    }, 1600 + delay * 1000);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
      window.clearTimeout(safety);
      cancelAnimationFrame(frame);
    };
  }, [delay, from, to, value]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums tracking-wider", className)}
      {...props}
    >
      {formatNumber(display, decimalPlaces)}
    </span>
  );
}
