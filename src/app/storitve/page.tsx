import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { ContentSections } from "@/components/sections/ContentSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid, toServiceCards } from "@/components/sections/ServiceGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
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
 * component as the homepage, including its 3 + 3 + 1 arrangement. Sončne
 * elektrarne is not here: it is a separate top-level offering with its own
 * route, not an eighth card.
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

      <ContentSections
        className="border-t border-border bg-surface"
        sections={[
          {
            title: "Več storitev pri enem izvajalcu",
            body: "Elektroinštalacije, servis, varnostni sistemi, računalniške mreže in toplotne črpalke se na objektu pogosto srečajo. Ko jih prevzame en izvajalec, se dela ne podvajajo in ni treba usklajevati več ekip med seboj.",
            body2:
              "V praksi to najbolj šteje pri pripravi. Marsikaj, kar je med gradnjo majhna postavka, po zaključku ni več izvedljivo brez ponovnega posega, zato je smiselno o vsem povedati že na začetku.",
          },
          {
            title: "Kje delamo",
            body: `Sedež podjetja je v kraju ${company.address.city}, delujemo pa na območju upravne enote ${company.serviceArea.administrativeUnit} in v širši ${company.serviceArea.region} regiji.`,
            body2:
              "Če niste prepričani, ali vaša lokacija sodi zraven, nas pokličite in vam povemo takoj.",
          },
        ]}
      />

      <CtaSection
        title="Niste prepričani, katera storitev je prava?"
        body="Opišite, kaj načrtujete, in skupaj opredelimo obseg del ter naslednji korak."
      />
    </>
  );
}
