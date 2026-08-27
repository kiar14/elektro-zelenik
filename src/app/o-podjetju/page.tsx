import { ImageIcon, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { BenefitGrid } from "@/components/sections/BenefitGrid";
import { ContentSections } from "@/components/sections/ContentSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ReferenceGrid } from "@/components/sections/ReferenceGrid";
import { ActionLink } from "@/components/ui/ActionLink";
import { CenteredHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { whyCards } from "@/content/homepage";
import { homeReferences } from "@/content/references";

const TITLE = "O podjetju";

export const metadata: Metadata = {
  title: TITLE,
  description: `${company.tradingName}, ${company.sinceLabel}. Elektroinštalacije, servis in sončne elektrarne na območju ${company.serviceArea.administrativeUnit} in v ${company.serviceArea.region}.`,
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="O podjetju"
        title="Elektroinštalacije Zelenik, od leta 2000"
        lead="Podjetje s sedežem v Destrniku pri Ptuju. Izvajamo elektroinštalacije, servis, tehnične sisteme in sončne elektrarne."
        crumbs={[{ label: TITLE }]}
      />

      <ContentSections
        sections={[
          {
            title: "Kdo smo",
            body: `${company.tradingName} je podjetje s sedežem v kraju ${company.address.city}, ki se ukvarja z elektroinštalacijami in povezanimi tehničnimi sistemi.`,
            body2:
              "Delo prevzamemo v obsegu, ki ga uskladimo vnaprej, in ga izvedemo sami. Kjer je za posamezen del potreben poslovni partner, to povemo vnaprej.",
          },
          {
            title: `Od leta ${company.foundedYear}`,
            body: `Z elektroinštalacijami se ukvarjamo od leta ${company.foundedYear}. V tem času se je spremenilo marsikaj, od razsvetljave do naprav, ki jih objekti danes vsebujejo, osnova pa je ostala ista: napeljava mora biti izvedena tako, da bo objekt v njej deloval še čez leta.`,
            body2: `Leta ${company.incorporatedYear} je dejavnost prešla v družbo ${company.legalName}. Delo, ekipa in način dela so ostali isti, spremenila se je pravna oblika.`,
          },
        ]}
      />

      {/* ------------------------------------------------------------------
          Team.
          TODO_CLIENT: replace with genuine Zelenik team / Jožef photograph.
          The slot below occupies exactly the frame the photograph will, in the
          same aspect ratio, radius and border the service cards use, so
          dropping in the real asset is a one-element change and requires no
          layout work.
          ------------------------------------------------------------------ */}
      <section
        aria-labelledby="ekipa-naslov"
        className="border-y border-border bg-surface"
      >
        <Container width="wide" className="py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <RevealGroup>
              <div
                data-reveal
                className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunk"
              >
                <div className="flex flex-col items-center gap-3 px-6 text-center">
                  <span
                    aria-hidden
                    className="flex size-14 items-center justify-center rounded-full bg-brand-tint"
                  >
                    <ImageIcon
                      className="size-6 text-brand-strong"
                      strokeWidth={1.7}
                    />
                  </span>
                  <p className="text-sm font-semibold text-ink-muted">
                    Fotografija ekipe
                  </p>
                </div>
              </div>
            </RevealGroup>

            <RevealGroup>
              <div data-reveal>
                <SectionHeading
                  id="ekipa-naslov"
                  eyebrow="Ekipa"
                  title="Ista oseba od dogovora do predaje"
                  lead={`Podjetje vodi ${company.owner}. Oseba, s katero se dogovorite o obsegu del, je tudi tista, ki izvedbo na objektu spremlja do konca.`}
                />
                <p className="mt-5 max-w-prose text-base text-ink-muted">
                  Pogovor o tem, kaj je smiselno, in izvedba tega dogovora sta
                  pri nas ista pot. Kar se dogovorimo pri načrtovanju, se
                  prenese naravnost v delo na objektu.
                </p>
              </div>
            </RevealGroup>
          </div>
        </Container>
      </section>

      <section aria-labelledby="zakaj-nas-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <CenteredHeading
            id="zakaj-nas-naslov"
            eyebrow="Zakaj izbrati nas"
            title="Izkušnje, strokovno svetovanje in zanesljiva izvedba"
            titleWidth="wide"
            lead="Šest stvari, na katere se pri sodelovanju z nami lahko zanesete."
          />

          <BenefitGrid cards={whyCards} className="mt-12 lg:mt-14" />
        </Container>
      </section>

      <section
        aria-labelledby="izbrana-dela-naslov"
        className="border-t border-border bg-surface"
      >
        <Container className="py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading
              id="izbrana-dela-naslov"
              eyebrow="Reference"
              title="Izbrana dela"
              lead="Objekti, na katerih smo izvajali elektroinštalacijska dela in razsvetljavo."
            />
            <ActionLink
              href="/reference"
              variant="outline"
              className="max-sm:hidden"
            >
              Vse reference
            </ActionLink>
          </div>

          <ReferenceGrid
            items={homeReferences}
            lead
            className="mt-14 lg:mt-18"
          />

          <ActionLink
            href="/reference"
            variant="outline"
            size="lg"
            className="mt-12 w-full sm:hidden"
          >
            Vse reference
          </ActionLink>
        </Container>
      </section>

      <ContentSections
        sections={[
          {
            title: "Nadaljevanje dejavnosti",
            body: `Dejavnost teče neprekinjeno ${company.sinceLabel}. Pravna oblika se je leta ${company.incorporatedYear} spremenila v družbo z omejeno odgovornostjo, obseg dela in pristop pa sta ostala nespremenjena.`,
            body2:
              "Za naročnika to pomeni, da se sodelovanje ne konča s predajo objekta. Ostanemo dosegljivi za dodatna vprašanja in za dela, ki se pokažejo pozneje.",
          },
        ]}
      />

      {/* Only what the registered seat documents: the municipality, its
          administrative unit and the statistical region. A wider town list
          stays out until the client says how far they actually travel. */}
      <section
        aria-labelledby="obmocje-naslov"
        className="border-t border-border bg-surface"
      >
        <Container className="py-20 lg:py-24">
          <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div data-reveal>
              <SectionHeading
                id="obmocje-naslov"
                eyebrow="Območje"
                title="Kje delamo"
              />
            </div>

            <div data-reveal>
              <p className="max-w-prose text-lead text-ink-muted">
                Sedež podjetja je na naslovu {company.address.full}. Delujemo na
                območju upravne enote {company.serviceArea.administrativeUnit} in
                v širši {company.serviceArea.region} regiji.
              </p>
              <p className="mt-5 max-w-prose text-base text-ink-muted">
                Če niste prepričani, ali vaša lokacija sodi zraven, nas
                pokličite in vam povemo takoj.
              </p>

              <p className="mt-8 flex items-start gap-3 text-base text-ink">
                <MapPin
                  aria-hidden
                  className="mt-1 size-[18px] shrink-0 text-brand-strong"
                />
                <span>
                  {company.serviceArea.municipality},{" "}
                  {company.serviceArea.administrativeUnit},{" "}
                  {company.serviceArea.region}
                </span>
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <CtaSection
        title="Se pogovorimo o vašem objektu?"
        body="Povejte, kaj načrtujete. Skupaj opredelimo obseg del in naslednji korak."
      />
    </>
  );
}
