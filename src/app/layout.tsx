import type { Metadata, Viewport } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { company } from "@/content/company";
import { ibmPlexSans, inter } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: `${company.tradingName}, elektroinštalacije in tehnične rešitve`,
    template: `%s, ${company.tradingName}`,
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
