import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light" | "light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-red text-brand-white hover:bg-brand-red-dark border border-brand-red hover:border-brand-red-dark",
  outline:
    "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-brand-white dark:text-brand-white dark:border-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black",
  "outline-light":
    "bg-transparent text-brand-white border border-brand-white hover:bg-brand-white hover:text-brand-black",
  light:
    "bg-brand-white text-brand-black border border-brand-white hover:bg-brand-black hover:text-brand-white hover:border-brand-black",
};

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${variantClasses[variant]} ${className}`;
  // External links and files (e.g. the sponsor packet PDF) use a plain <a>: next/link would
  // prefetch the target as soon as the button scrolls into view, which for the PDF is ~8 MB.
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
