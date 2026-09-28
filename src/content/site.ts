import { company } from "@/content/company";

/**
 * Site-wide facts used by metadata, the sitemap, robots.txt and structured
 * data. Company facts themselves stay in `company.ts`.
 */
export const site = {
  /**
   * Production origin, no trailing slash. Every absolute URL in metadata is
   * built from this. Override per deployment with NEXT_PUBLIC_SITE_URL.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elektro-zelenik.si"
  ).replace(/\/+$/, ""),

  locale: "sl_SI",
  language: "sl",

  title: `${company.tradingName}, elektroinštalacije in sončne elektrarne`,
  description:
    "Elektroinštalacije v novogradnjah in obstoječih objektih ter montaža sončnih elektrarn. Destrnik pri Ptuju, od leta 2000.",
} as const;
