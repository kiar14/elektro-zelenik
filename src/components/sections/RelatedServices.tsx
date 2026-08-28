import { Container } from "@/components/layout/Container";
import { ServiceGrid, toServiceCards } from "@/components/sections/ServiceGrid";
import { ActionLink } from "@/components/ui/ActionLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { allServicesLink, type Service } from "@/content/services";

/**
 * Three neighbouring services at the foot of a page.
 *
 * Renders the same card family the homepage grid uses, so a service card looks
 * identical whether it is met on the homepage, on `/storitve` or here.
 */
export function RelatedServices({
  items,
  title = "Povezane storitve",
  id = "povezane-naslov",
}: {
  items: readonly Service[];
  title?: string;
  id?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={id} className="bg-ground">
      <Container width="wide" className="py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading id={id} title={title} />
          <ActionLink
            href={allServicesLink.href}
            variant="outline"
            className="max-sm:hidden"
          >
            {allServicesLink.label}
          </ActionLink>
        </div>

        <ServiceGrid
          items={toServiceCards(items)}
          className="mt-12 lg:mt-16"
        />

        <ActionLink
          href={allServicesLink.href}
          variant="outline"
          size="lg"
          className="mt-12 w-full sm:hidden"
        >
          {allServicesLink.label}
        </ActionLink>
      </Container>
    </section>
  );
}
