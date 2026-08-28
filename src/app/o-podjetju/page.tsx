import { ImageIcon } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { BenefitGrid } from "@/components/sections/BenefitGrid";
import { CtaSection } from "@/components/sections/CtaSection";
import { LocationMap } from "@/components/sections/LocationMap";
import { PageHero } from "@/components/sections/PageHero";
import { ReferenceGrid } from "@/components/sections/ReferenceGrid";
import { ActionLink } from "@/components/ui/ActionLink";
import { CenteredHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { whyCards } from "@/content/homepage";
import { homeReferences } from "@/content/references";
import { pageSeo } from "@/lib/seo";

const TITLE = "O podjetju";

export const metadata: Metadata = pageSeo({
  path: "/o-podjetju",
  title: TITLE,
  description: `${company.tradingName} ${company.sinceLabel} izvaja elektroinštalacije, servis in povezane tehnične sisteme. Sedež v kraju ${company.address.city} pri ${company.serviceArea.administrativeUnit}u.`,
});

/**
 * O podjetju.
 *
 * Every block has a job and a shape of its own: the opening argument, the
 * graphite fact strip, the team band, the shared why-us cards, the reference
 * strip and the map.
 *
 * The fact strip is graphite for the same reason the homepage trust strip is.
 * This page has no process band, so without it the whole route would run from
 * the warm stone hero to the footer without a single dark anchor, which is
 * exactly the flat, evenly-weighted rhythm the rest of this pass is undoing.
 * The two dark strips are deliberately the same object in two places.
 *
 * Nothing here is invented. The dates, the legal name and the service area all
 * come from `content/company.ts`, and the two facts the register does not
 * document, the opening hours and the wider town list, are still absent.
 */

/**
 * The proof strip.
 *
 * No numeric project count and no incorporation history: the first is not
 * verifiable and the second is legal trivia that tells a customer nothing about
 * whether the work will be any good. What remains is the experience, the
 * breadth and the evidence, all of which the rest of the site backs up.
 */
const FACTS = [
  { value: `Z vami že ${company.sinceLabel}`, label: "Izkušnje na objektih" },
  { value: "Več povezanih storitev", label: "Pri enem izvajalcu" },
  { value: "Izvedeni projekti", label: "Na različnih vrstah objektov" },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title="Elektro Zelenik. Z vami že od leta 2000."
        lead="Izvajamo elektroinštalacije in povezane tehnične storitve za stanovanjske in poslovne objekte. Pri delu nam največ pomenijo kakovostna izvedba, jasen dogovor in rešitve, prilagojene dejanskim potrebam objekta."
        crumbs={[{ label: TITLE }]}
      />

      {/* ------------------------------------------------------------------
          Who we are. The heading holds the left third and stays put while the
          argument scrolls past it.
          ------------------------------------------------------------------ */}
      <section aria-labelledby="kdo-smo-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <RevealGroup>
            <div
              data-reveal
              className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-16"
            >
              <h2
                id="kdo-smo-naslov"
                className="text-heading text-ink lg:sticky lg:top-32 lg:self-start"
              >
                <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
                Kdo smo
              </h2>

              <div>
                <p className="max-w-[62ch] text-lead text-ink-muted">
                  Elektro Zelenik je podjetje z dolgoletnimi izkušnjami na
                  področju elektrotehnike in elektroinštalacij. Na enem mestu
                  povezujemo elektroinštalacije, servisiranje, računalniške
                  mreže, alarmne sisteme, video nadzor, toplotne črpalke in
                  svetovanje.
                </p>
                <p className="mt-6 max-w-[62ch] text-lead text-ink-muted">
                  Pri delu poudarjamo kakovost izvedbe, jasen dogovor in
                  rešitve, ki so prilagojene dejanskim potrebam posameznega
                  objekta.
                </p>
              </div>
            </div>
          </RevealGroup>
        </Container>
      </section>

      {/* The page's dark anchor. Same object as the homepage trust strip. */}
      <section aria-label="Podjetje v številkah" className="bg-graphite">
        <Container width="wide">
          <RevealGroup stagger={0.06}>
            <ul className="grid sm:grid-cols-3">
              {FACTS.map((fact, index) => (
                <li
                  key={fact.label}
                  data-reveal
                  className={[
                    "flex min-h-[7rem] flex-col justify-center py-7 pr-5",
                    "border-graphite-line",
                    index > 0
                      ? "border-t sm:border-t-0 sm:border-l sm:pl-7 xl:pl-10"
                      : "",
                  ].join(" ")}
                >
                  <p className="font-display text-xl font-semibold tracking-[-0.018em] text-on-photo">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-eyebrow font-semibold uppercase text-on-photo-muted">
                    {fact.label}
                  </p>
                </li>
              ))}
            </ul>
          </RevealGroup>
        </Container>
      </section>

      {/* ------------------------------------------------------------------
          Team.

          TODO_CLIENT: replace with the genuine Zelenik team photograph. The
          slot below occupies exactly the frame the photograph will, in the same
          aspect ratio, radius and border the page hero image uses, so dropping
          in the real asset is a one-element change and requires no layout work.
          No generated or stock people, ever.
          ------------------------------------------------------------------ */}
      <section
        aria-labelledby="ekipa-naslov"
        className="border-y border-border bg-surface"
      >
        <Container width="wide" className="py-20 lg:py-24">
          <RevealGroup className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
            <div
              data-reveal
              className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-frame border border-border bg-surface-sunk"
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

            <div data-reveal>
              <SectionHeading
                id="ekipa-naslov"
                eyebrow="Ekipa"
                title="Ekipa Elektro Zelenik"
                lead="Za izvedbo projektov skrbi ekipa, ki povezuje dogovor, pripravo in izvedbo del."
              />
            </div>
          </RevealGroup>
        </Container>
      </section>

      <section aria-labelledby="zakaj-nas-naslov" className="bg-ground">
        <Container width="wide" className="py-20 lg:py-24">
          <CenteredHeading
            id="zakaj-nas-naslov"
            title="Izkušnje, strokovno svetovanje in zanesljiva izvedba"
            titleWidth="wide"
            lead="Pet stvari, na katere se pri sodelovanju z nami lahko zanesete."
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

      <CtaSection
        title="Se pogovorimo o vašem objektu?"
        body="Povejte, kaj načrtujete. Skupaj opredelimo obseg del in naslednji korak."
      />

      {/* Last band before the footer, and the only place the address needs to
          be shown at size. See the note in LocationMap. */}
      <LocationMap />
    </>
  );
}
