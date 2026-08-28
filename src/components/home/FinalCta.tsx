import { CtaSection } from "@/components/sections/CtaSection";

/**
 * The homepage's closing conversion block. It renders the one shared
 * `sections/CtaSection` with no variant of its own, so the last thing on the
 * homepage is the same object as the last thing on every other page.
 */
export function FinalCta() {
  return (
    <CtaSection
      title="Načrtujete elektro dela ali tehnični sistem?"
      body="Povejte nam, kaj potrebujete, in skupaj določimo naslednji korak."
    />
  );
}
