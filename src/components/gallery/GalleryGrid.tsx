"use client";

import { useState } from "react";
import type { GalleryItem } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox } from "@/components/gallery/Lightbox";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={`${item.caption}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="aspect-[3/2] overflow-hidden rounded-lg bg-brand-grey-900"
          >
            <SiteImage
              src={item.photo}
              alt={item.caption}
              width={600}
              height={400}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <Lightbox
          items={items}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  );
}
