import type { Metadata } from "next";

import { FinalCta } from "@/components/home/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { QuickEnquiry } from "@/components/home/QuickEnquiry";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyZelenik } from "@/components/home/WhyZelenik";
import { company } from "@/content/company";
import { OG_HOME, pageSeo } from "@/lib/seo";

/**
 * The homepage title already carries the company name, so it is set absolute
 * and skips the layout's ", Elektroinštalacije Zelenik" template rather than
 * repeating it. This is the one page that gets its own Open Graph card: the
 * approved architectural hero frame under the site's own scrim.
 */
export const metadata: Metadata = pageSeo({
  path: "/",
  title: `${company.tradingName} | ${company.address.city} in okolica`,
  titleAbsolute: true,
  description:
    "Elektroinštalacije v novogradnjah in obstoječih objektih, servis, tehnični sistemi in toplotne črpalke. Destrnik pri Ptuju, od leta 2000.",
  image: OG_HOME,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <ServicesSection />
      <QuickEnquiry />
      <WhyZelenik />
      <ProcessSection />
      <ReferencesSection />
      <FinalCta />
    </>
  );
}
