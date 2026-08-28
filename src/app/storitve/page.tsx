import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceClusters } from "@/components/sections/ServiceClusters";
import {
  ServiceShowcase,
  toServiceCards,
} from "@/components/sections/ServiceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/storitve",
  title: "Elektro storitve",
  description:
    "Sedem storitev pri enem izvajalcu: elektroinštalacije, servisiranje, računalniške mreže, alarmni sistemi, video nadzor, toplotne črpalke in svetovanje.",
});

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
        title="Elektroinštalacije, servis in tehnični sistemi"
        lead="Za stanovanjske in poslovne objekte izvajamo elektroinštalacije, servis naprav, računalniške mreže, alarmne sisteme, video nadzor, toplotne črpalke in svetovanje."
        crumbs={[{ label: "Storitve" }]}
      />

      <section aria-labelledby="pregled-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <SectionHeading
            id="pregled-naslov"
            eyebrow="Pregled"
            title="Kaj izvajamo"
            lead="Od osnovne elektro napeljave do tehničnih sistemov in servisa. Izberite storitev, ki jo potrebujete."
          />

          <ServiceShowcase
            items={toServiceCards(services)}
            className="mt-12 lg:mt-16"
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
