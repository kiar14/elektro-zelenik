import type { Metadata, Viewport } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { StructuredData } from "@/components/layout/StructuredData";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { company } from "@/content/company";
import { ibmPlexSans, inter } from "@/lib/fonts";
import { SITE_URL } from "@/lib/seo";

/**
 * The site-wide head.
 *
 * `metadataBase` is what turns the relative `/og/...` paths every page hands to
 * `pageSeo` into absolute URLs in the rendered markup, and it is the production
 * origin rather than anything read from the environment, so a preview
 * deployment cannot publish its own hostname to a scraper.
 *
 * Deliberately no `alternates` and no `openGraph` here. Next.js merges metadata
 * shallowly and children inherit whatever a layout sets, so a canonical
 * declared at this level would stamp the homepage URL onto all eighteen routes.
 * Every page supplies its own through `pageSeo`.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.tradingName} | ${company.address.city} in okolica`,
    template: `%s | ${company.tradingName}`,
  },
  description:
    "Elektroinštalacije v novogradnjah in obstoječih objektih, servis, tehnični sistemi in toplotne črpalke. Destrnik pri Ptuju, od leta 2000.",
  applicationName: company.tradingName,
  authors: [{ name: company.legalName }],
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sl" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <body className="min-h-dvh">
        {/* The hero copy and every below-the-fold section start hidden and are
            revealed by GSAP. Without script that never happens, so force them
            visible. Any new hidden-by-default state must be added here too, or
            it becomes invisible content for anyone without JavaScript. */}
        <noscript>
          <style>
            {"[data-reveal],[data-trust-column],[data-hero-title],[data-hero-item],[data-hero-rule],[data-process-line]{opacity:1!important;transform:none!important}"}
          </style>
        </noscript>
        <StructuredData />
        <SmoothScroll />
        <SkipLink />
        <SiteHeader />
        {/* tabIndex makes the skip link actually move focus, not just scroll.
            The ring is suppressed because the skip link is the affordance. */}
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
