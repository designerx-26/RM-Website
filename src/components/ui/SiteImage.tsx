import Image from "next/image";
import type { CSSProperties } from "react";

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** Where the placeholder caption sits — "top" avoids collisions with bottom-anchored overlay content (e.g. a hero headline). */
  labelAlign?: "center" | "top";
  /** Inline style forwarded to the underlying <Image>, e.g. a per-photo zoom/pan transform. */
  imgStyle?: CSSProperties;
}

/**
 * Wraps next/image so image slots stay populated with a labeled
 * placeholder until a real file path is added to src/content/site.ts.
 */
export function SiteImage({
  src,
  alt,
  className = "",
  fill,
  width,
  height,
  sizes,
  priority,
  labelAlign = "center",
  imgStyle,
}: SiteImageProps) {
  if (!src) {
    return (
      <div
        className={`flex justify-center border-2 border-dashed border-brand-grey-300 bg-gradient-to-br from-brand-grey-100 to-brand-grey-50 p-4 text-center dark:border-brand-grey-700 dark:from-brand-grey-900 dark:to-brand-black ${
          labelAlign === "top" ? "items-start pt-10" : "items-center"
        } ${fill ? "absolute inset-0" : ""} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs font-medium uppercase tracking-wide text-brand-grey-500">
          {alt}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={imgStyle}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      sizes={sizes}
      priority={priority}
      className={className}
      style={imgStyle}
    />
  );
}
