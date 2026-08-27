import type { Metadata } from "next";

import { company } from "@/content/company";

/**
 * One place where a URL becomes absolute.
 *
 * Every canonical, every `og:url` and every `og:image` on the site is derived
 * from `company.url`. No page hardcodes the domain, so moving it is a one-line
 * change, and a preview deployment cannot put its own hostname into metadata
 * that search engines and social scrapers will read.
 *
 * Next.js merges metadata objects shallowly: a page that exports its own
 * `openGraph` replaces the layout's entirely rather than extending it. That is
 * the reason `pageSeo` below always returns a complete `openGraph` and
 * `twitter` block instead of a partial one. Every page calls it, so no page can
 * silently lose the site name, the locale or the preview image.
 */

export const SITE_URL = company.url;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export interface OgImage {
  url: string;
  alt: string;
  /**
   * PNG or JPEG only. Several scrapers still handle WebP badly, so the modern
   * formats the rest of the site serves are deliberately not used here.
   */
  type: "image/png" | "image/jpeg";
}

/** The branded card every page uses unless it has a reason not to. */
export const OG_DEFAULT: OgImage = {
  url: "/og/og-default.png",
  alt: `${company.tradingName}, elektroinštalacije, servis in tehnične rešitve`,
  type: "image/png",
};

/** The homepage card, built on the approved architectural hero frame. */
export const OG_HOME: OgImage = {
  url: "/og/og-home.jpg",
  alt: `${company.tradingName}, osvetljena sodobna hiša ob mraku`,
  type: "image/jpeg",
};

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export interface PageSeo {
  /** Site-relative, with a leading slash. "/" for the homepage. */
  path: string;
  /** Goes through the layout's title template unless `titleAbsolute` is set. */
  title: string;
  description: string;
  /** Use the homepage card, or a page-specific one. */
  image?: OgImage;
  /** Set where the title already carries the company name. */
  titleAbsolute?: boolean;
}

/**
 * The complete head for one indexable page: title, description, exactly one
 * canonical, and matching Open Graph and Twitter cards whose `og:url` is the
 * same URL as the canonical.
 */
export function pageSeo({
  path,
  title,
  description,
  image = OG_DEFAULT,
  titleAbsolute = false,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);

  const images = [
    {
      url: image.url,
      width: OG_WIDTH,
      height: OG_HEIGHT,
      alt: image.alt,
      type: image.type,
    },
  ];

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "sl_SI",
      siteName: company.tradingName,
      url,
      title: titleAbsolute ? title : `${title}, ${company.tradingName}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: titleAbsolute ? title : `${title}, ${company.tradingName}`,
      description,
      images,
    },
  };
}
