import { Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";
import { headerCta, headerPhone } from "@/content/navigation";

/**
 * The closing conversion block. A quiet surface and brand rule give it enough
 * presence to close the page without turning it into a loud banner.
 */
export function FinalCta() {
  return (
    <section aria-labelledby="zakljucni-cta-naslov" className="bg-ground">
      <Container className="pb-24 lg:pb-32">
        <div className="relative overflow-hidden rounded-lg border border-border bg-surface px-6 py-11 sm:px-10 lg:px-14 lg:py-16">
          <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
            <div>
              <h2
                id="zakljucni-cta-naslov"
                className="max-w-[20ch] text-heading text-ink"
              >
                Povejte nam, kaj potrebujete
              </h2>
              <p className="mt-5 max-w-prose text-lead text-ink-muted">
                Če načrtujete elektroinštalacije, prenovo, servis ali nov
                sistem, se dogovorimo za naslednji korak, ogled in ponudbo.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
              <ActionLink
                href={headerCta.href}
                variant="solid"
                size="lg"
                className="w-full sm:w-auto sm:whitespace-nowrap"
              >
                Brezplačen ogled in ponudba
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
          </div>
        </div>
      </Container>
    </section>
  );
}
