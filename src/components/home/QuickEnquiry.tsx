import { Phone } from "lucide-react";

import { QuickEnquiryForm } from "@/components/home/QuickEnquiryForm";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { headerPhone } from "@/content/navigation";

/**
 * The conversion path, placed where a visitor first knows enough to use it:
 * directly after the services.
 *
 * Two panels, joined into one object rather than laid out as a paragraph beside
 * a box. The left is graphite and carries the ask; the right is the lightest
 * surface on the page and carries the form. That contrast is doing real work:
 * on a page of warm neutrals, the one place where something is filled in is the
 * only place that is white, and the eye goes there without being told to.
 *
 * The pair is a single rounded frame with no gap between the halves, so the
 * section reads as one conversion area rather than as two components that
 * happen to be adjacent.
 */
export function QuickEnquiry() {
  return (
    <section
      aria-labelledby="povprasevanje-naslov"
      className="border-y border-border bg-surface"
    >
      <Container width="wide" className="py-16 lg:py-20">
        <RevealGroup>
          <div
            data-reveal
            className="grid overflow-hidden rounded-frame border border-border shadow-panel lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]"
          >
            {/* ---------------------------------------------------------- */}
            <div className="flex flex-col justify-center bg-graphite px-6 py-10 sm:px-9 sm:py-12 lg:px-11 xl:px-13">
              <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-on-photo-muted">
                <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
                Povpraševanje
              </p>

              <h2
                id="povprasevanje-naslov"
                className="mt-5 text-heading text-on-photo"
              >
                Potrebujete izvajalca?
              </h2>

              <p className="mt-5 max-w-[44ch] text-lead text-on-photo-muted">
                Na kratko opišite, kaj potrebujete. Za prvi dogovor je dovolj
                nekaj osnovnih informacij.
              </p>

              <div className="mt-9 border-t border-graphite-line pt-7">
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-on-photo-muted">
                  Ali nas pokličite
                </p>
                <a
                  href={headerPhone.href}
                  aria-label={headerPhone.accessibleLabel}
                  className="mt-3 inline-flex min-h-11 items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-on-photo transition-colors duration-150 ease-standard hover:text-brand"
                >
                  <Phone aria-hidden className="size-[22px] text-brand" />
                  {headerPhone.label}
                </a>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            <div className="bg-ground px-6 py-10 sm:px-9 sm:py-12 lg:px-11 xl:px-13">
              <QuickEnquiryForm />
            </div>
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
