import { FinalCta } from "@/components/home/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { ProcessSection } from "@/components/home/ProcessSection";
import { QuickEnquiry } from "@/components/home/QuickEnquiry";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyZelenik } from "@/components/home/WhyZelenik";

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
