import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { references } from "@/content/references";

const TITLE = "Izvedeni projekti";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Izbor objektov, na katerih smo izvajali elektroinštalacijska dela, razsvetljavo in povezane tehnične sisteme.",
};

/**
 * Reference projects.
 *
 * One property is one project. Where a building has several photographs they
 * are shown together in that project's own gallery, so a single job is never
 * counted as three references.
 *
 * Only the company's own photographs, and only captions that describe what is
 * in the frame. No town, year, capacity, client name, equipment or brand,
 * because none of that is documented. The one exception is the dental centre,
 * whose scope the client has confirmed.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Reference"
        title={TITLE}
        lead="Izbor projektov na različnih vrstah objektov."
        crumbs={[{ label: "Reference" }]}
      />

      <section aria-labelledby="projekti-naslov" className="bg-ground">
        <Container width="wide" className="pt-20 lg:pt-24">
          <SectionHeading
            id="projekti-naslov"
            eyebrow="Projekti"
            title="Različni objekti, različne rešitve"
            lead="Vsak projekt zahteva svoj pristop in premišljeno izvedbo."
          />
        </Container>
      </section>

      {references.map((project, index) => (
        <ProjectGallery
          key={project.slug}
          project={project}
          index={index}
          flushTop={index === 0}
        />
      ))}

      <CtaSection
        title="Načrtujete podoben projekt?"
        body="Povejte, za kakšen objekt gre. Dogovorimo se za ogled in opredelimo obseg del."
      />
    </>
  );
}
