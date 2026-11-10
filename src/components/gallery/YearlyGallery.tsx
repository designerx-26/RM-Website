"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { GalleryItem } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox } from "@/components/gallery/Lightbox";

interface YearlyGalleryProps {
  items: GalleryItem[];
  /** All school years, oldest first. Years with no photos yet show in the sidebar as "soon". */
  years: string[];
  /** Optional subtitle per year, e.g. { "25-26": "RM29" }. */
  labels?: Record<string, string>;
}

// Height of each sidebar row; the sliding marker is positioned in multiples of this.
const ROW_H = 48;

export function YearlyGallery({ items, years: allYears, labels = {} }: YearlyGalleryProps) {
  const groups = useMemo(() => {
    const byYear = new Map<string, GalleryItem[]>();
    for (const item of items) {
      const list = byYear.get(item.year);
      if (list) {
        list.push(item);
      } else {
        byYear.set(item.year, [item]);
      }
    }
    return [...allYears].reverse().map((year) => [year, byYear.get(year) ?? []] as const);
  }, [items, allYears]);

  const populated = useMemo(() => groups.filter(([, yearItems]) => yearItems.length > 0), [groups]);

  const [activeYear, setActiveYear] = useState(populated[0]?.[0] ?? "");
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState<{ year: string; index: number } | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pillBarRef = useRef<HTMLDivElement>(null);
  // While a click-triggered smooth scroll is running, hold the clicked year instead of
  // letting the scroll position flick through every year in between.
  const lockUntil = useRef(0);

  // Expose the sticky site header's height so the year bar/sidebar can sit just under it.
  useEffect(() => {
    const header = document.querySelector("header");
    const root = rootRef.current;
    if (!header || !root) return;
    const sync = () => root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const root = rootRef.current;
      if (!root) return;

      const headerH = document.querySelector("header")?.offsetHeight ?? 0;
      const rect = root.getBoundingClientRect();
      const scrollable = rect.height - (window.innerHeight - headerH);
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, (headerH - rect.top) / scrollable)) : 0);

      if (Date.now() < lockUntil.current) return;

      // Active = the last section whose top has crossed a line ~30% down the viewport.
      const line = headerH + window.innerHeight * 0.3;
      let current: string | undefined = populated[0]?.[0];
      for (const [year] of populated) {
        const el = sectionRefs.current[year];
        if (el && el.getBoundingClientRect().top <= line) current = year;
      }
      // At the very bottom, the final section may be too short to reach the line.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && rect.bottom <= window.innerHeight + 2) current = populated.at(-1)?.[0];
      if (current) setActiveYear(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScrollEnd = () => {
      lockUntil.current = 0;
      onScroll();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [populated]);

  // Keep the active pill centered in the mobile year bar.
  useEffect(() => {
    const bar = pillBarRef.current;
    const pill = pillRefs.current[activeYear];
    if (!bar || !pill) return;
    bar.scrollTo({ left: pill.offsetLeft - bar.clientWidth / 2 + pill.offsetWidth / 2, behavior: "smooth" });
  }, [activeYear]);

  const scrollToYear = useCallback((year: string) => {
    setActiveYear(year);
    lockUntil.current = Date.now() + 1200;
    sectionRefs.current[year]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const activeIndex = groups.findIndex(([year]) => year === activeYear);

  return (
    <div ref={rootRef} style={{ "--header-h": "72px" } as CSSProperties}>
      {/* Mobile: sticky horizontal year bar */}
      <div className="sticky top-[var(--header-h)] z-30 -mx-6 mb-6 border-b border-brand-grey-800 bg-brand-black/90 backdrop-blur sm:hidden">
        <div
          ref={pillBarRef}
          className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {groups.map(([year, yearItems]) => {
            const isActive = year === activeYear;
            const isEmpty = yearItems.length === 0;
            return (
              <button
                key={year}
                ref={(el) => {
                  pillRefs.current[year] = el;
                }}
                type="button"
                disabled={isEmpty}
                onClick={() => scrollToYear(year)}
                className={`flex shrink-0 items-baseline gap-1.5 rounded-full border px-4 py-1.5 text-sm font-black tracking-tight transition-colors duration-300 ${
                  isActive
                    ? "border-brand-red bg-brand-red text-brand-white"
                    : isEmpty
                      ? "border-brand-grey-800 text-brand-grey-600"
                      : "border-brand-grey-700 text-brand-grey-300"
                }`}
              >
                {year}
                {isEmpty && <span className="text-xs font-semibold">soon</span>}
              </button>
            );
          })}
        </div>
        <div className="h-0.5 bg-brand-red transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="flex gap-10 lg:gap-14">
        {/* Desktop: sticky sidebar with a progress rail and sliding marker */}
        <nav aria-label="Seasons" className="hidden w-28 shrink-0 sm:block">
          <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
            <p className="mb-4 pl-6 text-xs font-bold uppercase tracking-[0.25em] text-brand-grey-500">Season</p>
            <div className="relative pl-6">
              <div className="absolute bottom-0 left-0 top-0 w-0.5 rounded-full bg-brand-grey-800" />
              <div
                className="absolute left-0 top-0 w-0.5 rounded-full bg-brand-red/40 transition-[height] duration-150"
                style={{ height: `${progress * 100}%` }}
              />
              <div
                className="absolute -left-[5px] top-0 h-3 w-3 rounded-full bg-brand-red shadow-[0_0_0_4px_rgba(200,16,46,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateY(${Math.max(activeIndex, 0) * ROW_H + ROW_H / 2 - 6}px)` }}
                aria-hidden="true"
              />
              {groups.map(([year, yearItems]) => {
                const isActive = year === activeYear;
                const isEmpty = yearItems.length === 0;
                return (
                  <button
                    key={year}
                    type="button"
                    disabled={isEmpty}
                    onClick={() => scrollToYear(year)}
                    aria-current={isActive ? "true" : undefined}
                    style={{ height: ROW_H }}
                    className="group flex w-full items-center text-left"
                  >
                    <span
                      className={`block origin-left text-sm font-black tracking-tight transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive
                          ? "scale-[1.6] text-brand-red"
                          : isEmpty
                            ? "text-brand-grey-700"
                            : "text-brand-grey-500 group-hover:text-brand-white"
                      }`}
                    >
                      {year}
                    </span>
                    {isEmpty && (
                      <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider text-brand-grey-700">
                        soon
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="min-w-0 flex-1">
          {populated.map(([year, yearItems]) => (
            <section
              key={year}
              ref={(el) => {
                sectionRefs.current[year] = el;
              }}
              aria-label={`${year} season`}
              className="mb-20 scroll-mt-[calc(var(--header-h)+5rem)] last:mb-0 sm:scroll-mt-[calc(var(--header-h)+2.5rem)]"
            >
              <div className="mb-6 flex items-end gap-4">
                <h2 className="text-4xl font-black uppercase tracking-tight text-brand-white sm:text-5xl">{year}</h2>
                {labels[year] && (
                  <span className="mb-1.5 rounded-full border border-brand-red px-3 py-0.5 text-xs font-bold uppercase tracking-widest text-brand-red">
                    {labels[year]}
                  </span>
                )}
                <div className="mb-3 h-px flex-1 bg-brand-grey-800" />
              </div>

              {/* Justified rows: each tile grows in proportion to its aspect ratio, so
                  rows fill edge to edge with no cropping while keeping reading order. */}
              <div className="flex flex-wrap gap-2 [--row-h:100px] after:grow-[999] after:content-[''] sm:gap-3 sm:[--row-h:180px] lg:[--row-h:220px]">
                {yearItems.map((item, index) => {
                  const ratio = item.width / item.height;
                  const style: CSSProperties = {
                    flexGrow: ratio,
                    flexBasis: `calc(var(--row-h) * ${ratio})`,
                    aspectRatio: `${item.width} / ${item.height}`,
                  };
                  return (
                    <button
                      key={item.photo}
                      type="button"
                      onClick={() => setLightbox({ year, index })}
                      style={style}
                      className="group relative overflow-hidden rounded-md bg-brand-grey-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                      aria-label={`Open photo: ${item.caption}`}
                    >
                      <SiteImage
                        src={item.photo}
                        alt={item.caption}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        sizes="(min-width: 1024px) 35vw, (min-width: 640px) 45vw, 70vw"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          items={populated.find(([year]) => year === lightbox.year)?.[1] ?? []}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ year: lightbox.year, index })}
        />
      )}
    </div>
  );
}
