import { Phone } from "lucide-react";

import { QuickEnquiryForm } from "@/components/home/QuickEnquiryForm";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { headerPhone } from "@/content/navigation";

/**
 * The conversion path, placed where a visitor first knows enough to use it:
 * directly after the services. Copy on the left, a short form on the right:
 * name, phone, what it is about. Nothing else, so it can be finished in a few
 * seconds.
 */
export function QuickEnquiry() {
  return (
    <section
      aria-labelledby="povprasevanje-naslov"
      className="border-y border-border bg-surface-sunk"
    >
      <Container className="py-20 lg:py-24">
        <RevealGroup className="grid gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1fr)] lg:gap-16">
          <div data-reveal>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted">
              <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
              Povpraševanje
            </p>

            <h2
              id="povprasevanje-naslov"
              className="mt-5 text-heading text-ink"
            >
              Potrebujete izvajalca?
            </h2>

            <p className="mt-5 max-w-prose text-lead text-ink-muted">
              Pustite ime, telefonsko številko in vrsto storitve. Oglasimo se
              in se pogovorimo o tem, kaj načrtujete in kaj je za vaš objekt
              smiselno.
            </p>

            <a
              href={headerPhone.href}
              aria-label={headerPhone.accessibleLabel}
              className="mt-8 inline-flex min-h-11 items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
            >
              <Phone aria-hidden className="size-6 text-brand-strong" />
              {headerPhone.label}
            </a>

            <p className="mt-2 text-base text-ink-muted">
              Če vam je lažje po telefonu, pokličite.
            </p>
          </div>

          <div
            data-reveal
            className="rounded-lg border border-border bg-ground p-6 sm:p-9"
          >
            <QuickEnquiryForm />
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
