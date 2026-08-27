import { Container } from "@/components/layout/Container";
import { ReferenceGrid } from "@/components/sections/ReferenceGrid";
import { ActionLink } from "@/components/ui/ActionLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { references } from "@/content/homepage";

/**
 * Three projects, one card each, taken from the top of the Reference page. A
 * project with several photographs shows only its cover here: no building is
 * ever split across more than one card, and no illustrative marketing imagery
 * appears at all.
 *
 * The commercial photograph carries its photographer's watermark. It is left
 * intact deliberately, see the note in content/references.ts.
 */
export function ReferencesSection() {
  return (
    <section aria-labelledby="reference-naslov" className="bg-ground">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            id="reference-naslov"
            eyebrow="Reference"
            title="Izvedeni projekti"
            lead="Projekti s področja elektroinštalacij, razsvetljave, tehničnih sistemov in sorodnih elektro rešitev."
          />
          <ActionLink
            href="/reference"
            variant="outline"
            className="max-lg:hidden"
          >
            Oglejte si vse reference
          </ActionLink>
        </div>

        <ReferenceGrid items={references} lead className="mt-14 lg:mt-20" />

        <ActionLink
          href="/reference"
          variant="outline"
          size="lg"
          className="mt-12 w-full lg:hidden"
        >
          Oglejte si vse reference
        </ActionLink>
      </Container>
    </section>
  );
}
