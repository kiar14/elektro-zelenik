import { Phone } from "lucide-react";
import Image from "next/image";

import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ActionLink } from "@/components/ui/ActionLink";
import { headerPhone, quoteCta } from "@/content/navigation";

/**
 * The opening band of every page that is not the homepage.
 *
 * Deliberately calmer than the homepage hero: the same eyebrow rule, the same
 * display type and the same two actions, but on the warm tonal surface rather
 * than over a photograph, with no scrim and no lighting sequence. The signature
 * entrance belongs to the homepage and nothing in here competes with it.
 *
 * Where a page has a representative photograph it sits beside the copy at
 * roughly 45% of the composition, in the larger of the site's three radii. That
 * is the one place `--radius-frame` is used on an inner page, and it is what
 * gives the image enough presence to be the second half of the hero rather than
 * an illustration parked next to the type.
 *
 * The primary action here is "Pridobite ponudbo", not the header's "Pošlji
 * povpraševanje". Both go to the same page: the header asks for the message,
 * and a page that has just described a piece of work asks for the thing the
 * visitor actually wants out of it.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
  imageAlt,
  actions = true,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: readonly Crumb[];
  image?: string;
  imageAlt?: string;
  /** The standard enquiry + phone pair. Off where a page is itself the form. */
  actions?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="stran-naslov"
      className="border-b border-border bg-surface"
    >
      <Container width="wide" className="pt-5 pb-16 lg:pt-7 lg:pb-20">
        <Breadcrumbs items={crumbs} />

        {/* `immediate`: this group is the top of the page and is on screen when
            it paints, so it plays on mount rather than waiting to be scrolled
            to. See the note on the prop. */}
        <RevealGroup
          immediate
          className={
            image
              ? "mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-14 xl:gap-18"
              : "mt-8 lg:mt-10"
          }
        >
          <div data-reveal className={image ? undefined : "max-w-[52rem]"}>
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted">
              <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
              {eyebrow}
            </p>

            <h1
              id="stran-naslov"
              className="mt-5 max-w-[19ch] text-display text-ink"
            >
              {title}
            </h1>

            {lead ? (
              <p className="mt-6 max-w-[52ch] text-lead text-ink-muted">
                {lead}
              </p>
            ) : null}

            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ActionLink
                  href={quoteCta.href}
                  variant="solid"
                  size="lg"
                  className="w-full sm:w-auto sm:whitespace-nowrap"
                >
                  {quoteCta.label}
                </ActionLink>

                <ActionLink
                  href={headerPhone.href}
                  variant="outline"
                  size="lg"
                  aria-label={headerPhone.accessibleLabel}
                  className="w-full sm:w-auto sm:whitespace-nowrap"
                >
                  <Phone
                    aria-hidden
                    className="size-[18px] text-brand-strong"
                  />
                  Pokličite nas
                </ActionLink>
              </div>
            ) : null}

            {children}
          </div>

          {image ? (
            <div
              data-reveal
              className="relative aspect-[16/10] overflow-hidden rounded-frame border border-border bg-surface-sunk sm:aspect-[2/1] lg:aspect-[6/5]"
            >
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </RevealGroup>
      </Container>
    </section>
  );
}
