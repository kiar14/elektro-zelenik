import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ReferenceGrid } from "@/components/sections/ReferenceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { references } from "@/content/references";

const TITLE = "Reference";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Izbor objektov, na katerih smo izvajali elektroinštalacijska dela, razsvetljavo in povezane tehnične sisteme.",
};

/**
 * Reference projects.
 *
 * Only the company's own photographs, and only captions that describe what is
 * in the frame. No generated service imagery, no town, year, capacity or client
 * name, because none of that is documented, and nothing about the scope of the
 * work is read off a photograph. Where a building is not identified, the title
 * stays at the conservative category name.
 *
 * Quality over quantity: six projects, no padding.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title="Izbor izvedenih projektov"
        lead="Objekti, na katerih smo izvajali elektroinštalacijska dela, razsvetljavo in povezane tehnične sisteme. Fotografije so naše."
        crumbs={[{ label: TITLE }]}
      />

      <section aria-labelledby="projekti-naslov" className="bg-ground">
        <Container className="py-20 lg:py-24">
          <SectionHeading
            id="projekti-naslov"
            eyebrow="Projekti"
            title="Stanovanjski, poslovni in kmetijski objekti"
            lead="Obseg del se od objekta do objekta razlikuje. Kaj natančno je bilo izvedeno na posameznem projektu, vam povemo v pogovoru."
          />

          <ReferenceGrid items={references} lead className="mt-14 lg:mt-20" />
        </Container>
      </section>

      <CtaSection
        title="Načrtujete podoben projekt?"
        body="Povejte, za kakšen objekt gre. Dogovorimo se za ogled in opredelimo obseg del."
      />
    </>
  );
}
