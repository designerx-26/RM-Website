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
  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">{children}</div>
    </section>
  );
}
