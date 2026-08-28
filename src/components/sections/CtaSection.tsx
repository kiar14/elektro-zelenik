import { Phone } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ActionLink } from "@/components/ui/ActionLink";
import { callCta, headerCta, headerPhone, quoteCta } from "@/content/navigation";

/**
 * The closing conversion block. ONE treatment, on every page including the
 * homepage.
 *
 * It briefly had a second, full-bleed graphite variant for the homepage. That
 * was a mistake: the last thing a visitor sees before the footer is the one
 * component on the site that most needs to be the same object everywhere, and
 * two versions of it meant the homepage ended in a different design system from
 * the page it had just linked to. The dark weight the homepage needs is carried
 * by the trust strip and the process band, both of which are graphite.
 *
 * A warm stone panel on the page ground: the 12px card radius, one quiet
 * border, the panel shadow, the heading and supporting line on the left and the
 * action pair on the right. No rule across the top of it.
 *
 * The primary action is "Pridobite ponudbo" and the phone is always the
 * secondary path. `primary="enquiry"` switches the label to the header's
 * "Pošlji povpraševanje": Kontakt uses it, because that block points at the
 * longer form rather than asking for a quote a second time on a page whose own
 * form the visitor has just scrolled past.
 *
 * Only the heading, the supporting line and that one label change from page to
 * page. Everything else is fixed here.
 */
export function CtaSection({
  title,
  body,
  id = "zakljucni-cta-naslov",
  primary = "quote",
}: {
  title: string;
  body: string;
  id?: string;
  primary?: "quote" | "enquiry";
}) {
  const action = primary === "enquiry" ? headerCta : quoteCta;

  return (
    <section aria-labelledby={id} className="bg-ground">
      <Container className="pb-24 lg:pb-30">
        <div className="rounded-lg border border-border bg-surface px-6 py-11 shadow-panel sm:px-10 lg:px-14 lg:py-14">
          <RevealGroup className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
            <div data-reveal>
              <h2 id={id} className="max-w-[20ch] text-heading text-ink">
                {title}
              </h2>
              <p className="mt-5 max-w-[52ch] text-lead text-ink-muted">
                {body}
              </p>
            </div>

            <div
              data-reveal
              className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end"
            >
              <ActionLink
                href={action.href}
                variant="solid"
                size="lg"
                className="w-full sm:w-auto sm:whitespace-nowrap"
              >
                {action.label}
              </ActionLink>

              <ActionLink
                href={callCta.href}
                variant="outline"
                size="lg"
                aria-label={headerPhone.accessibleLabel}
                className="w-full sm:w-auto sm:whitespace-nowrap"
              >
                <Phone aria-hidden className="size-[18px] text-brand-strong" />
                {callCta.label}
              </ActionLink>
            </div>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
