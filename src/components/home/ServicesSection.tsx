import { Container } from "@/components/layout/Container";
import { ServiceGrid, toServiceCards } from "@/components/sections/ServiceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

/**
 * Seven services: two full rows of three and a centred final card.
 *
 * Both the card design and the 3 + 3 + 1 arrangement now live in
 * `sections/ServiceGrid`, which `/storitve` and every related-services block
 * also render through. This file supplies the section's own heading and
 * nothing else.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="storitve-naslov" className="bg-ground">
      <Container width="wide" className="py-20 lg:py-28">
        <SectionHeading
          id="storitve-naslov"
          eyebrow="Storitve"
          title="Kaj izvajamo"
          lead="Pokrivamo elektroinštalacije, servis in povezane tehnične sisteme na objektu."
        />

        <ServiceGrid
          items={toServiceCards(services)}
          layout="feature"
          className="mt-14 lg:mt-20"
        />
      </Container>
    </section>
  );
}
