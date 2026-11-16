import type { NextConfig } from "next";

// Applied to every response. No script/style restrictions in the CSP: Next's inline scripts,
// the inlined CSS and the Vimeo embed would all need allowances, which is easy to get wrong
// for little gain on a static site. These directives only lock down framing, plugins and
// where the page can be pointed or submitted.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
  // Older-browser equivalent of frame-ancestors: stops other sites framing this one (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing on the site uses these; autoplay/fullscreen are left alone for the video embed.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  experimental: {
    // Tailwind's CSS is small, so ship it in the HTML instead of as a render-blocking
    // stylesheet request; first paint no longer waits on a second round trip.
    inlineCss: true,
  },
  images: {
    // Default widths plus 1440: typical laptop screens otherwise jump from 1200 straight to a
    // 1920 hero download.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    // AVIF first (much smaller than JPEG/WebP for these photos), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // 60 is used for the above-the-fold banners (under dark overlays, so artifacts don't show)
    // to shrink the LCP download on mobile; everything else stays at the default 75.
    qualities: [60, 75],
  },
};

export default nextConfig;
