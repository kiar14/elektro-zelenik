import { Clock, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { company } from "@/content/company";
import { toEnquiryValues } from "@/content/enquiry";
import { processSteps } from "@/content/homepage";
import { headerPhone } from "@/content/navigation";
import { pageSeo } from "@/lib/seo";

const TITLE = "Povpraševanje";

export const metadata: Metadata = pageSeo({
  path: "/povprasevanje",
  title: "Pošlji povpraševanje",
  description:
    "Opišite, kaj potrebujete, in pošljite povpraševanje. Uskladimo obseg del in se dogovorimo za ogled.",
});

/**
 * The enquiry page.
 *
 * The homepage quick enquiry carries its three answers here as search params,
 * so a visitor who started there does not retype them. Anything unrecognised in
 * the URL is discarded rather than trusted: `toEnquiryValue` narrows the service
 * to a known option, and the free-text fields are only ever rendered back into
 * form values, never into markup.
 *
 * Fields beyond name, phone and service are optional by design. Live email
 * delivery arrives in the next phase; see the note in EnquiryForm.
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const single = (value: string | string[] | undefined) =>
    typeof value === "string" ? value : undefined;

  return (
    <>
      <PageHero
        eyebrow={TITLE}
        title="Pošljite povpraševanje"
        lead="Nekaj osnovnih podatkov je dovolj. Ostalo uskladimo v pogovoru ali na ogledu."
        crumbs={[{ label: TITLE }]}
        actions={false}
      />

      <section aria-labelledby="obrazec-naslov" className="bg-ground">
        <Container className="py-20 lg:py-24">
          <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:gap-16">
            <div
              data-reveal
              className="rounded-frame border border-border bg-surface p-6 shadow-panel sm:p-9 lg:p-10"
            >
              <h2
                id="obrazec-naslov"
                className="text-2xl font-semibold tracking-[-0.018em] text-ink"
              >
                Vaše povpraševanje
              </h2>
              <p className="mt-3 max-w-prose text-base text-ink-muted">
                Neobvezna polja so označena. Ostalo potrebujemo, da vam lahko
                odgovorimo.
              </p>

              <div className="mt-8">
                <EnquiryForm
                  variant="povprasevanje"
                  defaults={{
                    // The homepage quick enquiry carries one service across as
                    // a search param; anything it does not recognise is
                    // discarded rather than trusted.
                    storitve: toEnquiryValues(params.storitev),
                    ime: single(params.ime),
                    telefon: single(params.telefon),
                    sporocilo: single(params.sporocilo),
                  }}
                />
              </div>
            </div>

            <aside data-reveal className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="text-2xl font-semibold tracking-[-0.018em] text-ink">
                Raje po telefonu?
              </h2>
              <p className="mt-3 max-w-prose text-base text-ink-muted">
                Če je lažje, pokličite. Marsikaj lahko razjasnimo že v kratkem
                pogovoru.
              </p>

              <a
                href={company.phone.href}
                aria-label={headerPhone.accessibleLabel}
                className="mt-6 inline-flex min-h-14 items-center gap-3.5 font-display text-[2rem] leading-none font-semibold tracking-[-0.025em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
              >
                <Phone aria-hidden className="size-7 text-brand-strong" />
                {company.phone.display}
              </a>

              <ul className="mt-9 grid gap-6 border-t border-border pt-8">
                <Assurance icon={Clock} title="Brez obveznosti">
                  Povpraševanje vas k ničemer ne zavezuje. Ponudbo pripravimo
                  šele, ko je obseg del jasen.
                </Assurance>
                <Assurance icon={ShieldCheck} title="Vaši podatki">
                  Vpisane podatke uporabimo izključno za odgovor na to
                  povpraševanje.
                </Assurance>
              </ul>
            </aside>
          </RevealGroup>
        </Container>
      </section>

      {/* The page ends on the process rather than on another call to action:
          the form above it already is the call to action. Graphite, because
          this is the page's one anchor and it closes the route. */}
      <ProcessSteps
        id="potek-naslov"
        eyebrow="Kaj sledi"
        title="Kako poteka sodelovanje"
        steps={processSteps}
        surface="graphite"
      />
    </>
  );
}

function Assurance({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-4">
      <span
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-brand-tint"
      >
        <Icon className="size-[18px] text-brand-strong" strokeWidth={1.8} />
      </span>
      <div>
        <h3 className="text-lg font-semibold tracking-[-0.014em] text-ink">
          {title}
        </h3>
        <p className="mt-1.5 max-w-prose text-base text-ink-muted">
          {children}
        </p>
      </div>
    </li>
  );
}
