import type { Metadata } from "next";

import { FinalCta } from "@/components/home/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { QuickEnquiry } from "@/components/home/QuickEnquiry";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyZelenik } from "@/components/home/WhyZelenik";
import { businessJsonLd, serializeJsonLd } from "@/lib/structured-data";

// Title, description and Open Graph come from the root layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(businessJsonLd()) }}
      />
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
