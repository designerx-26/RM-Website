import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (much smaller than JPEG/WebP for these photos), WebP fallback.
    formats: ["image/avif", "image/webp"],
    // 60 is used for the above-the-fold banners (under dark overlays, so artifacts don't show)
    // to shrink the LCP download on mobile; everything else stays at the default 75.
    qualities: [60, 75],
  },
};

export default nextConfig;
