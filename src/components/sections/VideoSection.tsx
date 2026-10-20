"use client";

import { site } from "@/content/site";

export function VideoSection() {
  const { video } = site;

  const embedUrl = video.url
    ? `${video.url}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0`
    : "";

  return (
    <div className="aspect-video w-full overflow-hidden bg-brand-grey-900">
      {video.url ? (
        <iframe
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
