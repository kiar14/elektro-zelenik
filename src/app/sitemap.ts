import type { MetadataRoute } from "next";

import {
  headerCta,
  primaryNav,
  publishedServices,
} from "@/content/navigation";
import { site } from "@/content/site";

/**
 * Built from the same navigation data as the header, so a page is listed
 * exactly when it is linked. Services awaiting client verification have
 * routes but are never linked, so they stay out of the sitemap as well.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    "/",
    ...primaryNav.map((item) => item.href),
    ...publishedServices.map((service) => service.href),
    headerCta.href,
    "/politika-zasebnosti",
  ]);

  return [...paths].map((path) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
  }));
}
