import type { ReactNode } from "react";
import { SiteImage } from "@/components/ui/SiteImage";

interface PageHeroProps {
  image: { src: string; alt: string };
  title: string;
  eyebrow?: ReactNode;
  children?: ReactNode;
  /** Height/size overrides, e.g. "h-[70vh] min-h-[420px]". */
  className?: string;
  /** object-position for the photo, e.g. "object-[center_30%]". */
  imageClassName?: string;
  /** Where the title block sits — "top" keeps it clear of a subject in the lower half of the photo. */
  contentPosition?: "bottom" | "top";
}

/** Full-bleed photo banner with a bottom-anchored title, shared by every interior page. */
export function PageHero({
  image,
  title,
  eyebrow,
  children,
  className = "h-[clamp(380px,32vw,75vh)]",
  imageClassName = "object-center",
  contentPosition = "bottom",
}: PageHeroProps) {
  const top = contentPosition === "top";
  return (
    <div
      className={`relative flex overflow-hidden bg-brand-black ${top ? "items-start" : "items-end"} ${className}`}
    >
      <SiteImage
        src={image.src}
        alt={image.alt}
        fill
        className={`object-cover ${imageClassName}`}
        sizes="100vw"
        priority
        labelAlign="top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/25 via-40% to-brand-black/5" />
      <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-brand-black/70 to-transparent" />
      {top && (
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-brand-black/60 to-transparent" />
      )}
      <div
        className={`relative mx-auto w-full max-w-6xl px-6 ${top ? "pt-10 sm:pt-14" : "pb-12 sm:pb-16"}`}
      >
        {eyebrow && (
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-white/90 sm:text-sm">
            <span className="h-0.5 w-8 bg-brand-red" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-brand-white sm:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-4 max-w-2xl text-brand-grey-300">{children}</div>}
      </div>
    </div>
  );
}
