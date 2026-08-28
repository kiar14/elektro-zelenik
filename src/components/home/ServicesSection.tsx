import { Container } from "@/components/layout/Container";
import {
  ServiceShowcase,
  toServiceCards,
} from "@/components/sections/ServiceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";

/**
 * The seven services: Elektroinštalacije as the featured panel, the other six
 * at equal weight in two rows of three beneath it.
 *
 * Both the card design and that arrangement live in `sections/ServiceGrid`,
 * which `/storitve` also renders through. This file supplies the section's own
 * heading and nothing else.
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

        <ServiceShowcase
          items={toServiceCards(services)}
          className="mt-12 lg:mt-16"
        />
      </Container>
    </section>
  );
}
