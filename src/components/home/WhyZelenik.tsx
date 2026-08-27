import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { whyCards } from "@/content/homepage";

/**
 * Six practical reasons to choose the company. The main statistics already
 * live beneath the hero, so this section focuses on customer-facing benefits.
 */
export function WhyZelenik() {
  return (
    <section aria-labelledby="zakaj-naslov" className="bg-ground">
      <Container width="wide" className="py-20 lg:py-24">
        <div className="mx-auto max-w-[58rem] text-center">
          <p className="flex items-center justify-center gap-4 text-eyebrow font-semibold uppercase text-ink-muted">
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
            Zakaj izbrati nas
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
          </p>

          <h2 id="zakaj-naslov" className="mt-5 text-heading text-ink">
            Izkušnje, strokovno svetovanje in zanesljiva izvedba
          </h2>

          <p className="mx-auto mt-6 max-w-[54rem] text-lead text-ink-muted">
            Z elektroinštalacijami se ukvarjamo od leta 2000. Strankam pomagamo
            pri izbiri ustrezne rešitve, dogovorjena dela izvedemo kakovostno in
            poskrbimo, da je pot od prvega dogovora do zaključka čim bolj jasna.
          </p>

          <Link
            href="/o-podjetju"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-brand-strong transition-colors duration-150 ease-standard hover:text-ink"
          >
            Več o podjetju
            <ArrowRight
              aria-hidden
              className="size-[18px] transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 xl:grid-cols-3 xl:gap-6">
          {whyCards.map((card) => (
            <article
              key={card.title}
              data-reveal
              className="flex flex-col items-center rounded-lg border border-border bg-surface px-4 py-6 text-center sm:px-7 sm:py-7 lg:px-8 xl:min-h-[15.5rem] xl:px-9"
            >
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-brand-tint sm:size-12"
              >
                <card.icon
                  className="size-[22px] text-brand-strong"
                  strokeWidth={1.7}
                />
              </span>

              <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em] text-ink sm:mt-5">
                {card.title}
              </h3>
              <p className="mt-2.5 max-w-[40ch] text-sm text-ink-muted sm:mt-3">
                {card.body}
              </p>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
