import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 82 is the hero pair; 75 is the Next.js default used by everything else.
    // Both frames of the hero must be requested at the same value.
    qualities: [75, 82],

    // The default ladder jumps 1200 -> 1920, so a ~1440px viewport asks for
    // 1920 and the optimiser has to upscale: no source here is wider than
    // 1900px (the hero pair is 1672). 1600 gives those viewports a candidate
    // that is still a downscale, which is both sharper in intent and cheaper.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
  },
};

export default nextConfig;
