"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

// How long after the player reports "ready" before a still-paused video counts as blocked.
const AUTOPLAY_GRACE_MS = 3000;

export function VideoSection() {
  const { video } = site;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // iOS (e.g. Low Power Mode) can refuse muted autoplay; background mode has no play
  // button, so fall back to the regular player with controls when that happens.
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const embedUrl = !video.url
    ? ""
    : autoplayBlocked
      ? `${video.url}?muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0`
      : `${video.url}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&title=0&byline=0&portrait=0`;

  useEffect(() => {
    if (!video.url || autoplayBlocked) return;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const send = (method: string) =>
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method }), "https://player.vimeo.com");

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
        timer = setTimeout(() => send("getPaused"), AUTOPLAY_GRACE_MS);
      } else if (data.method === "getPaused" && data.value === true) {
        setAutoplayBlocked(true);
      }
    };

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, [video.url, autoplayBlocked]);

  return (
    <div className="aspect-video w-full overflow-hidden bg-brand-grey-900">
      {video.url ? (
        <iframe
          key={embedUrl}
          ref={iframeRef}
          src={embedUrl}
          title={video.title}
          className="h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        />
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
