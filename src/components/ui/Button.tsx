import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "outline-light";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-red text-brand-white hover:bg-brand-red-dark border border-brand-red hover:border-brand-red-dark",
  outline:
    "bg-transparent text-brand-black border border-brand-black hover:bg-brand-black hover:text-brand-white dark:text-brand-white dark:border-brand-white dark:hover:bg-brand-white dark:hover:text-brand-black",
  "outline-light":
    "bg-transparent text-brand-white border border-brand-white hover:bg-brand-white hover:text-brand-black",
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
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center rounded-sm px-6 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
