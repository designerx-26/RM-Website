"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";

// How long after the player reports "ready" before a video that still hasn't started counts as
// blocked. Long enough for a slow phone connection to buffer the first segment; a "play" event
// before then cancels the check.
const AUTOPLAY_GRACE_MS = 10000;

/** Sends a Vimeo player API call (e.g. "play") to the embed. */
function postToPlayer(iframe: HTMLIFrameElement | null, method: string, value?: string) {
  iframe?.contentWindow?.postMessage(JSON.stringify(value ? { method, value } : { method }), "https://player.vimeo.com");
}

export function VideoSection() {
  const { video } = site;
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // The Vimeo player pulls ~20 MB of video plus its own scripts/cookies, so only mount it
  // once the section is about to scroll into view; until then a local poster frame shows.
  const [inView, setInView] = useState(false);
  // iOS (e.g. Low Power Mode) can refuse muted autoplay; background mode has no play
  // button, so fall back to the regular player with controls when that happens.
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const embedUrl = !video.url
    ? ""
    : autoplayBlocked
      ? `${video.url}?muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`
      : `${video.url}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&dnt=1`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // Start loading well before the section is on screen so phones have time to buffer.
      { rootMargin: "1000px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!video.url || autoplayBlocked || !inView) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://player.vimeo.com" || e.source !== iframeRef.current?.contentWindow) return;
      let data: { event?: string; method?: string; value?: unknown };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        clearTimeout(timer);
        postToPlayer(iframeRef.current, "addEventListener", "play");
        // Start right away rather than waiting for Vimeo's own on-screen check.
        postToPlayer(iframeRef.current, "play");
        timer = setTimeout(() => postToPlayer(iframeRef.current, "getPaused"), AUTOPLAY_GRACE_MS);
      } else if (data.event === "play") {
        clearTimeout(timer);
      } else if (data.method === "getPaused" && data.value === true) {
        setAutoplayBlocked(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, [video.url, autoplayBlocked, inView]);

  // Vimeo's background player pauses itself while off screen and only resumes once it's
  // visible, which shows a frozen frame for a moment. Resume it just before it scrolls in.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !inView || autoplayBlocked) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) postToPlayer(iframeRef.current, "play");
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, autoplayBlocked]);

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden bg-brand-grey-900">
      {video.url ? (
        <>
          <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover" />
          {inView && (
            <iframe
              key={embedUrl}
              ref={iframeRef}
              src={embedUrl}
              title={video.title}
              className="relative h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            />
          )}
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-brand-grey-700 text-center">
          <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12 text-brand-grey-500" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
          </svg>
          <span className="max-w-xs text-xs font-medium uppercase tracking-wide text-brand-grey-500">
            Add a video embed URL in site.ts to show the team video here
          </span>
        </div>
      )}
    </div>
  );
}
