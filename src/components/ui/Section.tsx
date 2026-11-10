import type { ReactNode } from "react";

type Tone = "white" | "grey" | "black" | "red";

const toneClasses: Record<Tone, string> = {
  white: "bg-brand-white text-brand-black",
  grey: "bg-brand-grey-50 text-brand-black dark:bg-brand-grey-900 dark:text-brand-white",
  black: "bg-brand-black text-brand-white",
  red: "bg-brand-red text-brand-white",
};

interface SectionProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}

export function Section({ children, tone = "white", className = "", id }: SectionProps) {
  const striped = tone === "white" || tone === "grey";
  return (
    <section id={id} className={`relative ${toneClasses[tone]} ${className}`}>
      {striped && <RaceStripes />}
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">{children}</div>
    </section>
  );
}

/**
 * Sponsor-packet livery: a thick + thin vertical red stripe down the left
 * margin, crossed by a double red rule along the top of the section.
 * Vertical stripes only appear once the page margin is wide enough to hold them.
 */
function RaceStripes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 left-4 hidden w-3 bg-brand-red xl:block 2xl:left-8 2xl:w-4" />
      <div className="absolute inset-y-0 left-9 hidden w-1.5 bg-brand-red xl:block 2xl:left-15 2xl:w-2" />
      <div className="absolute inset-x-0 top-0 h-1 bg-brand-red" />
      <div className="absolute inset-x-0 top-2 h-px bg-brand-red" />
    </div>
  );
}
