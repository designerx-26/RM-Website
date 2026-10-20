"use client";

import { useState } from "react";
import type { GalleryItem } from "@/content/site";
import { SiteImage } from "@/components/ui/SiteImage";
import { Lightbox } from "@/components/gallery/Lightbox";

export function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {items.map((item, index) => (
          <button
            key={`${item.photo}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
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
