import { Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ActionLink } from "@/components/ui/ActionLink";
import { headerCta, headerPhone } from "@/content/navigation";

/**
 * The closing conversion block, lifted out of the approved homepage so every
 * page ends the same way.
 *
 * The primary action is always "Pošlji povpraševanje". The phone is the
 * secondary direct path and never competes with it. Only the heading and the
 * supporting line change from page to page.
 */
export function CtaSection({
  title,
  body,
  id = "zakljucni-cta-naslov",
}: {
  title: string;
  body: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="bg-ground">
      <Container className="pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-11 sm:px-10 lg:px-14 lg:py-16">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />
          <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div data-reveal>
              <h2 id={id} className="max-w-[20ch] text-heading text-ink">
                {title}
              </h2>
              <p className="mt-5 max-w-prose text-lead text-ink-muted">
                {body}
              </p>
            </div>

            <div
              data-reveal
              className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end"
            >
              <ActionLink
                href={headerCta.href}
                variant="solid"
                size="lg"
                className="w-full sm:w-auto sm:whitespace-nowrap"
              >
                {headerCta.label}
              </ActionLink>

              <ActionLink
                href={headerPhone.href}
                variant="outline"
                size="lg"
                aria-label={headerPhone.accessibleLabel}
                className="w-full sm:w-auto sm:whitespace-nowrap"
              >
                <Phone aria-hidden className="size-[18px] text-brand-strong" />
                {headerPhone.label}
              </ActionLink>
            </div>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
