"use client";

import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const SWIPE_THRESHOLD = 50;

export function Lightbox({ items, index, onClose, onNavigate }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(
    () => onNavigate((index - 1 + items.length) % items.length),
    [index, items.length, onNavigate],
  );
  const goNext = useCallback(
    () => onNavigate((index + 1) % items.length),
    [index, items.length, onNavigate],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goPrev, goNext]);

  // Lock page scroll while open, padding out the scrollbar's width so the
  // page behind doesn't shift sideways.
  useEffect(() => {
    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPadding = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;
    closeRef.current?.focus();
    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPadding;
    };
  }, []);

  const item = items[index];
  if (!item) return null;

  const hasMultiple = items.length > 1;
  const neighbors = hasMultiple
    ? [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]]
    : [];

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || !hasMultiple) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (dx > SWIPE_THRESHOLD) goPrev();
        else if (dx < -SWIPE_THRESHOLD) goNext();
      }}
    >
      <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-grey-300">
          {index + 1} / {items.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="relative min-h-0 flex-1 px-2 sm:px-20">
        <div className="relative h-full w-full" onClick={(e) => e.stopPropagation()}>
          <SiteImage
            key={item.photo}
            src={item.photo}
            alt={item.caption}
            fill
            sizes="100vw"
            loading="eager"
            className="animate-fade-in object-contain"
          />
        </div>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="shrink-0 px-4 pb-5 pt-4 text-center sm:px-6">
        {hasMultiple && <p className="text-xs text-brand-grey-500 sm:invisible">Swipe to browse</p>}
      </div>

      {/* Warm the cache for the adjacent photos so prev/next feels instant. */}
      <div className="hidden" aria-hidden="true">
        {neighbors.map((n) => (
          <SiteImage key={n.photo} src={n.photo} alt="" fill sizes="100vw" loading="eager" />
        ))}
      </div>
    </div>
  );
}
