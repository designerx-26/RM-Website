import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
  align?: "center" | "left";
  /** "dark" for headings sitting on black/red sections. */
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  children,
  align = "center",
  tone = "light",
  className = "mb-10",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-red sm:text-sm ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-0.5 w-6 bg-brand-red" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="h-0.5 w-6 bg-brand-red" aria-hidden="true" />}
        </p>
      )}
      <h2
        className={`mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl ${
          tone === "dark" ? "text-brand-white" : "text-brand-black"
        }`}
      >
        {title}
      </h2>
      {children && (
        <div
          className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-brand-grey-100" : "text-brand-grey-800"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
