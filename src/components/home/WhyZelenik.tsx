import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { proofCells, whyCards } from "@/content/homepage";

/**
 * The trust section: centred introduction, a three-cell proof strip, then
 * three substantial cards.
 *
 * The proof strip deliberately restates the identity in a different register
 * rather than repeating the four counters from directly under the hero.
 */
export function WhyZelenik() {
  return (
    <section aria-labelledby="zakaj-naslov" className="bg-ground">
      <Container className="py-20 lg:py-28">
        <div className="mx-auto max-w-[46rem] text-center">
          <p className="flex items-center justify-center gap-4 text-eyebrow font-semibold uppercase text-ink-muted">
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
            Zakaj mi
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
          </p>

          <h2 id="zakaj-naslov" className="mt-5 text-heading text-ink">
            Zakaj Zelenik
          </h2>

          <p className="mx-auto mt-6 max-w-[44rem] text-lead text-ink-muted">
            Podjetje deluje lokalno od leta 2000 in izvaja elektro dela na
            stanovanjskih, poslovnih in kmetijskih objektih.
          </p>

          <Link
            href="/o-podjetju"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-brand-strong transition-colors duration-150 ease-standard hover:text-ink"
          >
            Več o nas
            <ArrowRight
              aria-hidden
              className="size-[18px] transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <ul className="mt-16 grid border-y border-border sm:grid-cols-3 lg:mt-20">
          {proofCells.map((cell, index) => (
            <li
              key={cell.value}
              className={[
                "flex flex-col items-center justify-center px-5 py-8 text-center",
                "border-border",
                index > 0 ? "border-t sm:border-t-0 sm:border-l" : "",
              ].join(" ")}
            >
              {cell.icon ? (
                <cell.icon
                  aria-hidden
                  className="mb-3 size-6 text-brand-strong"
                  strokeWidth={1.7}
                />
              ) : null}
              <p
                className={
                  cell.icon
                    ? "text-xl font-semibold tracking-[-0.015em] text-ink"
                    : "font-display text-2xl font-semibold tracking-[-0.022em] text-ink"
                }
              >
                {cell.value}
              </p>
              <p className="mt-2 text-base text-ink-muted">{cell.label}</p>
            </li>
          ))}
        </ul>

        {/* Three across only from lg. At tablet widths a third of the container
            is about 210px, which breaks these headings mid-phrase. */}
        <RevealGroup className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {whyCards.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="flex flex-col items-center rounded-lg border border-border bg-surface px-7 py-10 text-center lg:px-8 lg:py-12"
            >
              <span
                aria-hidden
                className="flex size-14 items-center justify-center rounded-full bg-brand-tint"
              >
                <card.icon
                  className="size-6 text-brand-strong"
                  strokeWidth={1.7}
                />
              </span>

              <h3 className="mt-6 text-xl font-semibold tracking-[-0.015em] text-ink">
                {card.title}
              </h3>
              <p className="mt-3 max-w-[42ch] text-base text-ink-muted">
                {card.body}
              </p>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
