import type { MetadataRoute } from "next";

import { absoluteUrl, SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * The whole public site is crawlable. Nothing is disallowed: there is no admin
 * surface, no search-result page and no duplicate route to keep out, and a
 * blanket rule here would be far more likely to hide a stylesheet or an image
 * the renderer needs than to protect anything.
 *
 * Only `/_next/static/` assets and the optimiser endpoint exist under `/_next`,
 * and both must stay reachable for Google to render the page as a visitor sees
 * it, so they are not excluded either.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
