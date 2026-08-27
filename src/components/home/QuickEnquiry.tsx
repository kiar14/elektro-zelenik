import { Phone } from "lucide-react";

import { QuickEnquiryForm } from "@/components/home/QuickEnquiryForm";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { headerPhone } from "@/content/navigation";

/**
 * The conversion path, placed where a visitor first knows enough to use it:
 * directly after the services.
 *
 * The two-column idea is the approved one, but the proportions and the height
 * are not. The copy column used to take 40% and the form 60%, on a band as deep
 * as a full content section, which left the form narrow and the section long
 * for what it asks. It is now roughly 35 / 65 in favour of the form, and the
 * band is a step shallower than the sections around it: this is a short
 * transaction, and it should look like one.
 */
export function QuickEnquiry() {
  return (
    <section
      aria-labelledby="povprasevanje-naslov"
      className="border-y border-border bg-surface-sunk"
    >
      <Container width="wide" className="py-14 lg:py-18">
        <RevealGroup className="grid gap-9 lg:grid-cols-[minmax(0,0.54fr)_minmax(0,1fr)] lg:items-center lg:gap-14 xl:gap-18">
          <div data-reveal>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted">
              <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
              Povpraševanje
            </p>

            <h2
              id="povprasevanje-naslov"
              className="mt-4 text-heading text-ink"
            >
              Potrebujete izvajalca?
            </h2>

            <p className="mt-4 max-w-prose text-lead text-ink-muted">
              Na kratko opišite, kaj potrebujete, in oglasimo se za dogovor o
              naslednjem koraku.
            </p>

            <a
              href={headerPhone.href}
              aria-label={headerPhone.accessibleLabel}
              className="mt-7 inline-flex min-h-11 items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong"
            >
              <Phone aria-hidden className="size-6 text-brand-strong" />
              {headerPhone.label}
            </a>

            <p className="mt-1.5 text-base text-ink-muted">
              Lahko nas tudi pokličete.
            </p>
          </div>

          <div
            data-reveal
            className="rounded-lg border border-border bg-ground p-6 sm:p-8"
          >
            <QuickEnquiryForm />
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
