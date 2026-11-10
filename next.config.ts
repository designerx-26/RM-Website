import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (much smaller than JPEG/WebP for these photos), WebP fallback.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
