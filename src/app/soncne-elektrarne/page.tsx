import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { ContentSections } from "@/components/sections/ContentSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { relatedServices, findService } from "@/content/services";
import {
  solarConsumption,
  solarFaq,
  solarHero,
  solarIntro,
  solarProcess,
} from "@/content/solar";

const TITLE = "Sončne elektrarne";

export const metadata: Metadata = {
  title: TITLE,
  description: solarHero.lead,
};

/**
 * Sončne elektrarne stays a top-level destination rather than an eighth
 * service card: it is a distinct offering, it has its own page, and it is
 * reachable directly from the main navigation.
 *
 * The related services are taken from the electrical-installation record,
 * because that is genuinely what a solar project touches on this site.
 */
export default function Page() {
  const anchor = findService("elektroinstalacije");
  const related = anchor ? relatedServices(anchor) : [];

  return (
    <>
      <PageHero
        eyebrow={solarHero.eyebrow}
        title={solarHero.title}
        lead={solarHero.lead}
        image={solarHero.image}
        imageAlt={solarHero.alt}
        crumbs={[{ label: TITLE }]}
      />

      <ContentSections sections={solarIntro} />

      <ProcessSteps
        title="Kako poteka izvedba"
        steps={solarProcess}
        surface="surface"
      />

      <ContentSections sections={solarConsumption} />

      {/* The informational route out to subsidies. Placed here, in context,
          rather than in the main navigation: it is reference material a visitor
          wants at this point in the page, not something the company sells. */}
      <section aria-labelledby="subvencije-naslov" className="bg-ground">
        <Container className="pb-20 lg:pb-24">
          <RevealGroup>
            <div
              data-reveal
              className="rounded-lg border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10"
            >
              <h2
                id="subvencije-naslov"
                className="text-2xl font-semibold tracking-[-0.018em] text-ink"
              >
                Subvencije in spodbude
              </h2>
              <p className="mt-4 max-w-prose text-base text-ink-muted">
                Za naložbe v sončno elektrarno so občasno na voljo javne
                spodbude. Pogoji in zneski se spreminjajo, zato jih navajamo
                izključno po uradnih virih.
              </p>
              <Link
                href="/subvencije"
                className="group mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-brand-strong transition-colors duration-150 ease-standard hover:text-ink"
              >
                Preberite o subvencijah
                <ArrowRight
                  aria-hidden
                  className="size-[18px] transition-transform duration-200 ease-smooth group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                />
              </Link>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <FaqSection
        items={solarFaq}
        title="Pogosta vprašanja, sončne elektrarne"
      />

      <RelatedServices items={related} />

      <CtaSection
        title="Razmišljate o sončni elektrarni?"
        body="Dogovorimo se za ogled objekta. Šele takrat je mogoče povedati, kaj je za vašo streho in vašo porabo smiselno."
      />
    </>
  );
}
