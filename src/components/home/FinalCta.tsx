import { CtaSection } from "@/components/sections/CtaSection";

/**
 * The homepage's closing conversion block. The treatment lives in
 * `sections/CtaSection`, which every inner page also ends with.
 */
export function FinalCta() {
  return (
    <CtaSection
      title="Načrtujete elektro dela ali nov sistem?"
      body="Za elektroinštalacije, prenovo, servis ali nov tehnični sistem se obrnite na nas. Skupaj opredelimo potrebe in naslednji korak."
    />
  );
}
