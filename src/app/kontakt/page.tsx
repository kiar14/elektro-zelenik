import { Building2, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { CtaSection } from "@/components/sections/CtaSection";
import { PageHero } from "@/components/sections/PageHero";
import { ActionLink } from "@/components/ui/ActionLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { company } from "@/content/company";
import { headerPhone } from "@/content/navigation";
import { pageSeo } from "@/lib/seo";

const TITLE = "Kontakt";

export const metadata: Metadata = pageSeo({
  path: "/kontakt",
  title: TITLE,
  description: `Pokličite ${company.phone.display} ali nam pišite. Sedež podjetja je na naslovu ${company.address.full}.`,
});

/**
 * Contact.
 *
 * Every detail comes from `content/company.ts`. Opening hours are deliberately
 * absent: the existing website and the Google profile disagree, and publishing
 * the wrong ones is worse than publishing none.
 *
 * The map is a link, not an embed. Google Maps ships a large third-party script
 * and sets cookies on load, and neither is worth it for a directions link that
 * a native maps app handles better anyway.
 */
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.address.full,
)}`;

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title="Pokličite ali pišite"
        lead="Za dogovor o ogledu, ponudbo ali vprašanje o obsegu del. Najhitrejša pot je telefon."
        crumbs={[{ label: TITLE }]}
        actions={false}
      />

      <section aria-labelledby="podatki-naslov" className="bg-ground">
        <Container className="py-20 lg:py-24">
          <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
            <div data-reveal>
              <SectionHeading
                id="podatki-naslov"
                title="Kje nas najdete"
              />

              {/* The number is the page. It is set at display scale, above the
                  rest of the details rather than in a list with them. */}
              <a
                href={company.phone.href}
                aria-label={headerPhone.accessibleLabel}
                className="mt-8 inline-flex min-h-14 items-center gap-3.5 font-display text-[2rem] leading-none font-semibold tracking-[-0.025em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
              >
                <Phone aria-hidden className="size-7 text-brand-strong" />
                {company.phone.display}
              </a>

              <ul className="mt-7 grid gap-1 border-t border-border pt-6">
                <li>
                  <a
                    href={`mailto:${company.email.primary}`}
                    className="flex min-h-11 items-center gap-3 break-all text-base text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
                  >
                    <Mail
                      aria-hidden
                      className="size-[18px] shrink-0 text-brand-strong"
                    />
                    {company.email.primary}
                  </a>
                </li>
                <li className="flex gap-3 py-2 text-base text-ink-muted">
                  <MapPin
                    aria-hidden
                    className="mt-1 size-[18px] shrink-0 text-brand-strong"
                  />
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.postalCode} {company.address.city}
                    <br />
                    {company.address.country}
                  </span>
                </li>
                <li className="flex gap-3 py-2 text-base text-ink-muted">
                  <Building2
                    aria-hidden
                    className="mt-1 size-[18px] shrink-0 text-brand-strong"
                  />
                  <span>
                    {company.legalName}
                    <br />
                    Matična št. {company.registration.maticnaStevilka}
                    <br />
                    Davčna št. {company.registration.davcnaStevilka}
                  </span>
                </li>
              </ul>

              {/* Directions without a map script. The link opens the visitor's
                  own maps application, which is where they want to be anyway. */}
              {/* No panel: a heading, a line and an action on the page
                  surface say the same thing without adding another box to a
                  column that is already a list of details. */}
              <div className="mt-8 border-t border-border pt-7">
                <h3 className="text-lg font-semibold tracking-[-0.014em] text-ink">
                  Kako do nas
                </h3>
                <p className="mt-2.5 max-w-prose text-base text-ink-muted">
                  Naslov odprite v zemljevidih in navigacija vas pripelje do
                  vhoda.
                </p>
                <ActionLink
                  href={MAPS_URL}
                  variant="outline"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="mt-5"
                >
                  <MapPin aria-hidden className="size-[18px] text-brand-strong" />
                  Odpri v Google Zemljevidih
                </ActionLink>
              </div>
            </div>

            <div
              data-reveal
              className="rounded-frame border border-border bg-surface p-6 shadow-panel sm:p-9 lg:p-10"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.018em] text-ink">
                Pišite nam
              </h2>
              <p className="mt-3 max-w-prose text-base text-ink-muted">
                Izpolnite obrazec in opišite, kaj potrebujete.
              </p>

              <div className="mt-8">
                <EnquiryForm variant="kontakt" />
              </div>
            </div>
          </RevealGroup>
        </Container>
      </section>

      <CtaSection
        title="Potrebujete podrobnejšo ponudbo?"
        body="Za obsežnejša dela izpolnite daljše povpraševanje. Več podatkov pomeni natančnejšo pripravo pred ogledom."
        primary="enquiry"
      />
    </>
  );
}
