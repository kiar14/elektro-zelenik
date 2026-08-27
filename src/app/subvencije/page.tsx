import { ExternalLink, Info } from "lucide-react";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  isVerified,
  lastUpdated,
  officialSources,
  programmes,
  scopeNote,
  type SubsidyProgramme,
} from "@/content/subsidies";

const TITLE = "Subvencije";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Kje preveriti aktualne spodbude za sončno elektrarno in toplotno črpalko ter kaj pri tem prevzamemo mi.",
};

/**
 * Subsidies.
 *
 * Removed from the main navigation and reached contextually, from the solar
 * page and from the footer. This is reference information, not something the
 * company sells, and its placement says so.
 *
 * The page is deliberately an architecture rather than a set of figures. Every
 * value lives in `content/subsidies.ts` behind a `TODO_RESEARCH` sentinel, and
 * a field that has not been verified renders as a visible gap rather than as a
 * number someone might act on. Publishing a stale subsidy amount is worse than
 * publishing none, because a visitor can plan around it.
 */
const FIELDS = [
  { key: "authority", label: "Izvajalec" },
  { key: "callReference", label: "Javni poziv" },
  { key: "amount", label: "Višina spodbude" },
  { key: "eligibility", label: "Kdo lahko zaprosi" },
  { key: "deadline", label: "Rok" },
] as const satisfies ReadonlyArray<{
  key: keyof SubsidyProgramme;
  label: string;
}>;

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title="Spodbude za sončno elektrarno in toplotno črpalko"
        lead="Pogoji in zneski se spreminjajo, zato jih navajamo samo takrat, ko so preverjeni pri uradnem viru."
        crumbs={[{ label: TITLE }]}
        actions={false}
      />

      <section aria-labelledby="programi-naslov" className="bg-ground">
        <Container className="py-20 lg:py-24">
          <SectionHeading
            id="programi-naslov"
            eyebrow="Pregled"
            title="Aktualne spodbude"
            lead="Spodnja pregleda se izpolnita, ko so vrednosti preverjene pri pristojni instituciji. Do takrat polja namenoma ostajajo prazna."
          />

          {lastUpdated ? (
            <p className="mt-6 text-sm text-ink-muted">
              Zadnjič preverjeno: {lastUpdated}
            </p>
          ) : (
            <p className="mt-6 flex items-start gap-3 rounded-sm border border-border bg-surface px-4 py-3 text-sm text-ink-muted">
              <Info
                aria-hidden
                className="mt-0.5 size-[18px] shrink-0 text-brand-strong"
              />
              Podatki še niso preverjeni pri uradnem viru, zato jih na tej strani
              ne navajamo. Aktualne pogoje preverite neposredno pri pristojni
              instituciji.
            </p>
          )}

          <RevealGroup className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-2">
            {programmes.map((programme) => (
              <article
                key={programme.id}
                data-reveal
                className="rounded-lg border border-border bg-surface px-6 py-7 sm:px-8 sm:py-8"
              >
                <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
                  {programme.title}
                </h3>
                <p className="mt-3 max-w-prose text-base text-ink-muted">
                  {programme.summary}
                </p>

                <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-base">
                  {FIELDS.map((field) => {
                    const value = programme[field.key];
                    return (
                      <div
                        key={field.key}
                        className="grid gap-1 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-4"
                      >
                        <dt className="font-medium text-ink">{field.label}</dt>
                        <dd className="text-ink-muted">
                          {isVerified(value) ? (
                            value
                          ) : (
                            <span className="text-ink-muted/70">
                              Ni preverjeno
                            </span>
                          )}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </article>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section
        aria-labelledby="viri-naslov"
        className="border-y border-border bg-surface"
      >
        <Container className="py-20 lg:py-24">
          <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <div data-reveal>
              <SectionHeading
                id="viri-naslov"
                eyebrow="Viri"
                title="Kje preveriti pogoje"
              />
            </div>

            <div data-reveal>
              <ul className="grid gap-5">
                {officialSources.map((source) => (
                  <li key={source.label} className="flex gap-3">
                    <ExternalLink
                      aria-hidden
                      className="mt-1 size-[18px] shrink-0 text-brand-strong"
                    />
                    <div>
                      <p className="text-base font-semibold text-ink">
                        {source.label}
                      </p>
                      <p className="mt-1 max-w-prose text-base text-ink-muted">
                        {source.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-prose text-base text-ink-muted">
                {scopeNote}
              </p>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <CtaSection
        title="Načrtujete naložbo v sončno elektrarno?"
        body="Za izvedbo se obrnite na nas. Dogovorimo se za ogled in opredelimo, kaj je za vaš objekt smiselno."
      />
    </>
  );
}
