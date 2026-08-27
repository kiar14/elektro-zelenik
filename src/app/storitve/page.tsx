import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceClusters } from "@/components/sections/ServiceClusters";
import { ServiceGrid, toServiceCards } from "@/components/sections/ServiceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

const TITLE = "Storitve";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Elektroinštalacije, servisiranje, računalniške mreže, alarmni sistemi, video nadzor, toplotne črpalke in svetovanje.",
};

/**
 * The services overview.
 *
 * Exactly the seven services, in the same order and through the same card
 * component as the homepage, including its 3 + 3 + 1 arrangement.
 *
 * Two sections, not three. "Kje delamo" has been removed: the service area is
 * a contact fact, it is already on Kontakt and O podjetju, and repeating it at
 * the foot of the service hub added a third band of prose to a page whose job
 * is to route people into the seven. What remains after the grid is the one
 * argument that belongs here, and it is now told through the seven themselves
 * rather than through another paragraph.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Storitve"
        title="Elektro storitve za različne vrste objektov"
        lead="Od elektroinštalacij v novogradnji do servisa posamezne naprave. Delo prevzamemo v obsegu, ki ga uskladimo vnaprej."
        crumbs={[{ label: "Storitve" }]}
      />

      <section aria-labelledby="pregled-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <SectionHeading
            id="pregled-naslov"
            eyebrow="Pregled"
            title="Kaj izvajamo"
            lead="Sedem storitev, ki se na objektu pogosto srečajo. Vsaka ima svojo stran z opisom obsega in poteka izvedbe."
          />

          <ServiceGrid
            items={toServiceCards(services)}
            layout="feature"
            className="mt-14 lg:mt-20"
          />
        </Container>
      </section>

      <ServiceClusters />

      <CtaSection
        title="Niste prepričani, katera storitev je prava?"
        body="Opišite, kaj načrtujete, in skupaj opredelimo obseg del ter naslednji korak."
      />
    </>
  );
}
