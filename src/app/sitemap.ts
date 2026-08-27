import type { MetadataRoute } from "next";

import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * The sitemap.
 *
 * The seven service URLs are derived from `content/services.ts` rather than
 * listed, so a service added or removed there cannot leave a dead entry here
 * or a missing one. The static routes are written out because they are exactly
 * the pages that exist, and a route that is not in this list is either a
 * removed one or a mistake.
 *
 * Nothing that has been removed appears: there is no entry for
 * `/soncne-elektrarne` or `/subvencije`, neither of which exists any more.
 *
 * `priority` and `changeFrequency` are deliberately absent. Google ignores
 * both, and inventing values for them would only suggest a freshness signal
 * this site cannot honestly give.
 */
const STATIC_ROUTES = [
  "/",
  "/storitve",
  "/reference",
  "/faq",
  "/o-podjetju",
  "/kontakt",
  "/povprasevanje",
  "/politika-zasebnosti",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...services.map((service) => service.href),
  ];

  return routes.map((route) => ({ url: absoluteUrl(route) }));
}
