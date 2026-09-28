import type { Metadata } from "next";

import { company } from "@/content/company";
import { site } from "@/content/site";

/**
 * The link-preview card, `public/og-image.png`. It is referenced here rather
 * than placed as `app/opengraph-image.png`, because a page that sets its own
 * `openGraph` drops a file-based image inherited from the root.
 */
export const shareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: `${company.tradingName}: elektroinštalacije in sončne elektrarne, Destrnik pri Ptuju, ${company.sinceLabel}.`,
};

/**
 * Open Graph fields every page repeats. Metadata merges shallowly, so a page
 * that sets `openGraph` at all loses the root layout's copy unless it spreads
 * this back in.
 */
export const sharedOpenGraph = {
  type: "website" as const,
  siteName: company.tradingName,
  locale: site.locale,
  images: [shareImage],
};

/**
 * Metadata for an inner page: its title (the root layout's template adds the
 * company name), a canonical URL, and matching Open Graph fields.
 */
export function pageMetadata({
  title,
  path,
  description = site.description,
}: {
  title: string;
  /** Route path starting with "/", resolved against `metadataBase`. */
  path: string;
  description?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...sharedOpenGraph,
      title: `${title}, ${company.tradingName}`,
      description,
      url: path,
    },
  };
}
