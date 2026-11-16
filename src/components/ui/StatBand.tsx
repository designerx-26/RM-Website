"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/content/site";

function AnimatedStat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  // A year like "1992" (the Founded stat) shows as-is instead of counting up from 0.
  const isYear =/^(19|20)\d\d$/.test(value);
  const target = match && !isYear ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target === null ? value : "0");
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (target === null || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 1200;
        const start = performance.now();

        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * target).toString());
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-black tracking-tight text-brand-red sm:text-5xl">
      {display}
      {suffix}
    </div>
  );
}

export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    // Wraps and centers so any number of stats balances: 5 across on desktop, 3 + 2 on tablets, 2 + 2 + 1 on phones.
    <div className="flex flex-wrap justify-center gap-y-8">
      {stats.map((stat) => (
        <div key={stat.label} className="w-1/2 px-2 text-center sm:w-1/3 lg:w-1/5">
          <AnimatedStat value={stat.value} />
          <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-grey-600">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
