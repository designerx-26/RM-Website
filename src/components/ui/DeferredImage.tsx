"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { SiteImage } from "@/components/ui/SiteImage";

/**
 * SiteImage that isn't requested until it's within ~300px of the viewport.
 * Native lazy-loading starts far earlier on phones (well over a screen away), so on the
 * homepage these below-the-fold photos were downloading alongside the hero and slowing LCP.
 * Use only for images that start well below the fold; the parent sets size/background.
 */
export function DeferredImage(props: ComponentProps<typeof SiteImage>) {
  const ref = useRef<HTMLSpanElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="absolute inset-0" />
      {near && <SiteImage {...props} />}
    </>
  );
}
