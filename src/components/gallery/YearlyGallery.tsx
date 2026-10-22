"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GalleryItem } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox } from "@/components/gallery/Lightbox";

interface YearlyGalleryProps {
  items: GalleryItem[];
  /** All selectable school years, oldest first. Years with no photos yet still show up as an empty section. */
  years: string[];
}

export function YearlyGallery({ items, years: allYears }: YearlyGalleryProps) {
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

  const years = useMemo(() => groups.map(([year]) => year), [groups]);
  const defaultYear = groups.find(([, yearItems]) => yearItems.length > 0)?.[0] ?? years[0];
  const [activeYear, setActiveYear] = useState(defaultYear);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [lightbox, setLightbox] = useState<{ year: string; index: number } | null>(null);

  useEffect(() => {
    let ticking = false;

    const updateActiveYear = () => {
      ticking = false;
      const targetLine = window.innerHeight * 0.3;

      let closestYear: string | null = null;
      let closestDistance = Infinity;

      for (const year of years) {
        const el = sectionRefs.current[year];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - targetLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestYear = year;
        }
      }

      if (closestYear) setActiveYear(closestYear);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveYear);
      }
    };

    updateActiveYear();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [years]);

  const scrollToYear = (year: string) => {
    sectionRefs.current[year]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="mb-8 flex gap-2 overflow-x-auto sm:hidden">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => scrollToYear(year)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition-colors duration-300 ${
              year === activeYear
                ? "bg-brand-red text-brand-white"
                : "bg-brand-grey-900 text-brand-grey-400"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="flex gap-10">
        <div className="hidden w-20 shrink-0 sm:block">
          <div className="sticky top-28 flex flex-col items-center gap-4">
            {years.map((year) => {
              const isActive = year === activeYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => scrollToYear(year)}
                  className={`w-full whitespace-nowrap text-center text-sm font-black tracking-tight transition-[transform,color] duration-300 ease-out ${
                    isActive
                      ? "scale-[1.4] text-brand-red"
                      : "scale-100 text-brand-grey-600 hover:text-brand-grey-300"
                  }`}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          {groups.map(([year, yearItems]) => (
            <div
              key={year}
              ref={(el) => {
                sectionRefs.current[year] = el;
              }}
              data-year={year}
              className="mb-16 scroll-mt-28 last:mb-0"
            >
              <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-brand-white">
                {year}
              </h2>
              {yearItems.length > 0 ? (
                <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
                  {yearItems.map((item, index) => (
                    <button
                      key={`${item.photo}-${index}`}
                      type="button"
                      onClick={() => setLightbox({ year, index })}
                      className="group relative mb-4 block w-full overflow-hidden break-inside-avoid rounded-lg bg-brand-grey-900"
                    >
                      <SiteImage
                        src={item.photo}
                        alt={item.caption}
                        width={item.width}
                        height={item.height}
                        className="block h-auto w-full transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-brand-grey-800 text-sm font-medium uppercase tracking-wide text-brand-grey-600">
                  Photos coming soon
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          items={groups.find(([year]) => year === lightbox.year)?.[1] ?? []}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(index) => setLightbox({ year: lightbox.year, index })}
        />
      )}
    </>
  );
}
