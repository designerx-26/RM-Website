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
 * Sponsor-packet livery: a thick + thin red rule across the top of the section, and, once the page
 * margin is wide enough, two equal red bars down the left. As in the packet, the bars sit on top
 * and run unbroken from section to section while the rules pass underneath them edge to edge.
 */
function RaceStripes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Rules first so the bars paint over them. */}
      <div className="absolute inset-x-0 top-0 h-2 bg-brand-red" />
      <div className="absolute inset-x-0 top-3 h-[5px] bg-brand-red" />
      {/* Two equal bars with a half-width gap, as in the packet. */}
      <div className="absolute inset-y-0 left-4 hidden w-3 bg-brand-red xl:block 2xl:left-8 2xl:w-4" />
      <div className="absolute inset-y-0 left-8.5 hidden w-3 bg-brand-red xl:block 2xl:left-14 2xl:w-4" />
    </div>
  );
}
