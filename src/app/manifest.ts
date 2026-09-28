import type { MetadataRoute } from "next";

import { company } from "@/content/company";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.tradingName,
    short_name: company.shortName,
    description: site.description,
    lang: site.language,
    start_url: "/",
    scope: "/",
    display: "browser",
    // --color-ground in globals.css, the same value as the viewport themeColor.
    background_color: "#fbfaf8",
    theme_color: "#fbfaf8",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
