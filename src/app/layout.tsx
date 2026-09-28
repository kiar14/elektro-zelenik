import type { Metadata, Viewport } from "next";

import "./globals.css";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { company } from "@/content/company";
import { site } from "@/content/site";
import { ibmPlexSans, inter } from "@/lib/fonts";
import { shareImage, sharedOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s, ${company.tradingName}`,
  },
  description: site.description,
  applicationName: company.tradingName,
  authors: [{ name: company.legalName }],
  creator: company.legalName,
  publisher: company.legalName,
  // No canonical here: `alternates` would be inherited by every page that
  // forgets its own. Each page sets one through `pageMetadata`.
  openGraph: {
    ...sharedOpenGraph,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", images: [shareImage] },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.language} className={`${inter.variable} ${ibmPlexSans.variable}`}>
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
