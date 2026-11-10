import type { ReactNode } from "react";
import { SiteImage } from "@/components/ui/SiteImage";

interface PageHeroProps {
  image: { src: string; alt: string };
  title: string;
  eyebrow?: ReactNode;
  children?: ReactNode;
  /** Desktop (lg+) height overrides, e.g. "lg:h-[70vh] lg:min-h-[420px]". Below lg the photo sets its own height. */
  className?: string;
  /** object-position for the photo, e.g. "object-[center_30%]". */
  imageClassName?: string;
  /** Photo shape below lg. Defaults to the photos' native 3:2; pass a wider ratio to trim empty sky/floor (uses imageClassName to pick what stays). */
  mobileAspect?: string;
  /** Where the title block sits — "top" keeps it clear of a subject in the lower half of the photo. */
  contentPosition?: "bottom" | "top";
}

/**
 * Photo banner shared by every interior page. On lg+ the title overlays a full-bleed photo;
 * below lg a full-bleed crop would cut the sides off these 3:2 shots, so the title stacks
 * above the photo shown uncropped.
 */
export function PageHero({
  image,
  title,
  eyebrow,
  children,
  className = "lg:h-[clamp(380px,32vw,75vh)]",
  imageClassName = "object-center",
  contentPosition = "bottom",
  mobileAspect = "aspect-[3/2]",
}: PageHeroProps) {
  const top = contentPosition === "top";
  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-brand-black lg:flex-row ${top ? "lg:items-start" : "lg:items-end"} ${className}`}
    >
      <div className={`relative order-2 ${mobileAspect} w-full lg:absolute lg:inset-0 lg:aspect-auto`}>
        <SiteImage
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover ${imageClassName}`}
          sizes="100vw"
          priority
          labelAlign="top"
        />
        <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-brand-black to-transparent lg:hidden" />
      </div>
      <div className="absolute inset-0 hidden bg-gradient-to-t from-brand-black via-brand-black/25 via-40% to-brand-black/5 lg:block" />
      <div className="absolute inset-y-0 left-0 hidden w-2/3 bg-gradient-to-r from-brand-black/70 to-transparent lg:block" />
      {top && (
        <div className="absolute inset-x-0 top-0 hidden h-1/2 bg-gradient-to-b from-brand-black/60 to-transparent lg:block" />
      )}
      <div
        className={`relative order-1 mx-auto w-full max-w-6xl px-6 pb-6 pt-10 sm:pt-14 ${top ? "lg:pb-0" : "lg:pb-16 lg:pt-0"}`}
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
        {children && <div className="mt-4 max-w-2xl text-lg font-medium text-brand-white [text-shadow:0_1px_8px_rgb(0_0_0/0.9)] sm:text-xl">{children}</div>}
      </div>
    </div>
  );
}
