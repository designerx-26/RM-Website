"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { site } from "@/content/site";

// How long after the player reports "ready" before a video that still hasn't started counts as
// blocked. Long enough for a slow phone connection to buffer the first segment; a "play" event
// before then cancels the check.
const AUTOPLAY_GRACE_MS = 10000;

// Matches the lg breakpoint: below it the layout stacks and the video sits far down the page.
const MOBILE_QUERY = "(max-width: 1023px)";

/** Sends a Vimeo player API call (e.g. "play") to the embed. */
function postToPlayer(iframe: HTMLIFrameElement | null, method: string, value?: string) {
  iframe?.contentWindow?.postMessage(JSON.stringify(value ? { method, value } : { method }), "https://player.vimeo.com");
}

export function VideoSection() {
  const { video } = site;
  const containerRef = useRef<HTMLDivElement>(null);
  // The video is several MB, so only mount it once the section is about to scroll into
  // view; until then a local poster frame shows.
  const [inView, setInView] = useState(false);

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
      // Phones start loading well before the section is on screen so they have time to buffer;
      // desktops are fast enough to wait, which keeps the video out of the initial page load.
      { rootMargin: window.matchMedia(MOBILE_QUERY).matches ? "1000px 0px" : "400px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const hasVideo = Boolean(video.src || video.url);

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden bg-brand-grey-900">
      {hasVideo ? (
        <>
          <Image src={video.poster} alt="" fill sizes="100vw" className="object-cover" />
          {inView && (video.src ? <NativeVideo /> : <VimeoEmbed containerRef={containerRef} />)}
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

/**
 * Self-hosted MP4 in a plain <video>: no third-party player to boot, so phones show the
 * first frame as soon as it downloads. Browsers pause muted autoplay video while it's off
 * screen and resume it when it scrolls in, so no visibility handling is needed here.
 */
function NativeVideo() {
  const { video } = site;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // iOS Low Power Mode (and some data-saver settings) refuse autoplay; a tap then starts it.
  const [needsTap, setNeedsTap] = useState(false);
  const [src] = useState(() => (video.srcMobile && window.matchMedia(MOBILE_QUERY).matches ? video.srcMobile : video.src));

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // React sets `muted` as a property only; iOS only autoplays video it sees as muted.
    el.muted = true;
    el.defaultMuted = true;
    // Ask once it's actually on screen: that's when a blocked autoplay reports NotAllowedError.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      el.play().catch((err: DOMException) => {
        if (err.name === "NotAllowedError") setNeedsTap(true);
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        aria-label={video.title}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onPlaying={() => {
          setPlaying(true);
          setNeedsTap(false);
        }}
        // Hidden until the first frame plays so the poster underneath shows instead of a black box.
        className={`relative h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
      />
      {needsTap && (
        <button
          type="button"
          onClick={() => videoRef.current?.play().catch(() => {})}
          aria-label={`Play ${video.title}`}
          className="absolute inset-0 flex items-center justify-center bg-brand-black/30 text-brand-white"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16 drop-shadow-lg" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor" />
          </svg>
        </button>
      )}
    </>
  );
}

/** Vimeo background embed, used when no self-hosted file is set in site.ts. */
function VimeoEmbed({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const { video } = site;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // iOS (e.g. Low Power Mode) can refuse muted autoplay; background mode has no play
  // button, so fall back to the regular player with controls when that happens.
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const embedUrl = autoplayBlocked
    ? `${video.url}?muted=1&loop=1&playsinline=1&title=0&byline=0&portrait=0&dnt=1`
    : `${video.url}?background=1&autoplay=1&loop=1&muted=1&playsinline=1&controls=0&title=0&byline=0&portrait=0&dnt=1`;

  useEffect(() => {
    if (autoplayBlocked) return;
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
  }, [autoplayBlocked]);

  // Vimeo's background player pauses itself while off screen and only resumes once it's
  // visible, which shows a frozen frame for a moment. Resume it just before it scrolls in.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || autoplayBlocked) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) postToPlayer(iframeRef.current, "play");
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, autoplayBlocked]);

  return (
    <iframe
      key={embedUrl}
      ref={iframeRef}
      src={embedUrl}
      title={video.title}
      className="relative h-full w-full"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
    />
  );
}
