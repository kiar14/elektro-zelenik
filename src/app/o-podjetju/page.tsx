import { ImageIcon, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { BenefitGrid } from "@/components/sections/BenefitGrid";
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
  description: `${company.tradingName}, ${company.sinceLabel}. Elektroinštalacije, servis in povezani tehnični sistemi na območju upravne enote ${company.serviceArea.administrativeUnit} in v ${company.serviceArea.regionAdjective} regiji.`,
};

/**
 * O podjetju.
 *
 * The page used to be four blocks of prose in the same left-heading /
 * right-paragraph shape with hairlines between them, which read as a document
 * rather than as a page. Every block now has a job and a shape of its own: an
 * opening argument carrying the three verified dates and places, the team band,
 * the shared why-us cards, the reference strip and a short service-area note.
 *
 * Nothing here is invented. The dates, the legal name and the service area all
 * come from `content/company.ts`, and the two facts the register does not
 * document, the opening hours and the wider town list, are still absent.
 */

/** Verified from the register. No metric, no count, nothing supplied. */
const FACTS = [
  { value: String(company.foundedYear), label: "Začetek dejavnosti" },
  { value: String(company.incorporatedYear), label: "Ustanovitev d.o.o." },
  { value: company.address.city, label: "Sedež podjetja" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title={company.tradingName}
        lead="Smo podjetje z dolgoletnimi izkušnjami na področju elektrotehnike in elektroinštalacij. Strankam nudimo strokovno svetovanje, kakovostno izvedbo ter več povezanih storitev pri enem izvajalcu."
        crumbs={[{ label: TITLE }]}
      />

      {/* ------------------------------------------------------------------
          Who we are, and the three things a public register actually
          documents. The heading holds the left third and stays put while the
          argument scrolls past it.
          ------------------------------------------------------------------ */}
      <section aria-labelledby="kdo-smo-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <RevealGroup>
            <div
              data-reveal
              className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16"
            >
              <h2
                id="kdo-smo-naslov"
                className="text-heading text-ink lg:sticky lg:top-28 lg:self-start"
              >
                <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
                Kdo smo
              </h2>

              <div>
                <p className="max-w-prose text-lead text-ink-muted">
                  {company.tradingName} je podjetje s sedežem v kraju{" "}
                  {company.address.city}, ki se ukvarja z elektroinštalacijami
                  in povezanimi tehničnimi sistemi.
                </p>
                <p className="mt-5 max-w-prose text-lead text-ink-muted">
                  Delo prevzamemo v obsegu, ki ga uskladimo vnaprej, in ga
                  izvedemo sami. Kjer je za posamezen del potreben poslovni
                  partner, to povemo vnaprej.
                </p>
                <p className="mt-5 max-w-prose text-lead text-ink-muted">
                  Z elektroinštalacijami se ukvarjamo {company.sinceLabel}. V
                  tem času se je spremenilo marsikaj, od razsvetljave do naprav,
                  ki jih objekti danes vsebujejo, osnova pa je ostala ista:
                  napeljava mora biti izvedena tako, da bo objekt v njej deloval
                  še čez leta.
                </p>
              </div>
            </div>

            <div
              data-reveal
              className="mt-12 grid gap-y-8 border-t border-border pt-10 sm:grid-cols-3 sm:gap-x-8 lg:mt-16 lg:pt-12"
            >
              {FACTS.map((fact) => (
                <div key={fact.label}>
                  <p className="font-display text-2xl font-semibold tracking-[-0.02em] tabular-nums text-ink">
                    {fact.value}
                  </p>
                  <p className="mt-1.5 text-base text-ink-muted">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>

            <p
              data-reveal
              className="mt-9 max-w-[46rem] border-l-2 border-brand pl-6 text-xl text-ink sm:pl-8"
            >
              Leta {company.incorporatedYear} je dejavnost prešla v družbo z
              omejeno odgovornostjo. Delo in način dela sta ostala
              nespremenjena.
            </p>
          </RevealGroup>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          Team.

          TODO_CLIENT: replace with genuine Zelenik team photograph. The slot
          below occupies exactly the frame the photograph will, in the same
          aspect ratio, radius and border the service cards use, so dropping in
          the real asset is a one-element change and requires no layout work.
          No generated or stock people, ever.
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
                      className="size-[26px] text-brand-strong"
                      strokeWidth={1.6}
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
                  title={`Ekipa ${company.tradingName}`}
                  lead="Za vsakim projektom stoji ekipa, ki povezuje dogovor, pripravo in izvedbo del."
                />
                <p className="mt-5 max-w-prose text-base text-ink-muted">
                  Tako se informacije iz pogovora prenesejo tudi v delo na
                  objektu, komunikacija pa ostane jasna skozi celoten postopek.
                  Ko so dela zaključena, ostanemo dosegljivi za dodatna
                  vprašanja.
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
              Vsi projekti
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
            Vsi projekti
          </ActionLink>
        </Container>
      </section>

      {/* Only what the registered seat documents: the municipality, its
          administrative unit and the statistical region. A wider town list
          stays out until the client says how far they actually travel. */}
      <section aria-labelledby="obmocje-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <RevealGroup>
            <div
              data-reveal
              className="grid gap-8 rounded-lg border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 lg:px-12 lg:py-12"
            >
              <div>
                <SectionHeading
                  id="obmocje-naslov"
                  eyebrow="Območje"
                  title="Kje delamo"
                />

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

              <div className="lg:self-center">
                <p className="max-w-prose text-lead text-ink-muted">
                  Sedež podjetja je na naslovu {company.address.full}. Delujemo
                  na območju upravne enote{" "}
                  {company.serviceArea.administrativeUnit} in v širši{" "}
                  {company.serviceArea.regionAdjective} regiji.
                </p>
                <p className="mt-5 max-w-prose text-base text-ink-muted">
                  Če niste prepričani, ali vaša lokacija sodi zraven, nas
                  pokličite in vam povemo takoj.
                </p>
              </div>
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
