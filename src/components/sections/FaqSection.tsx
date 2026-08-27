import { Plus } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { FaqItem } from "@/content/services";
import { CenteredHeading } from "@/components/ui/SectionHeading";

/**
 * Frequently asked questions.
 *
 * Built on native `<details>` and `<summary>`, so the disclosure works with the
 * keyboard, is announced correctly and needs no client component: this stays a
 * server component and ships no JavaScript at all. Every answer is in the
 * server-rendered HTML whether or not it is open.
 *
 * Hairlines only. Boxing each question would introduce a card family the design
 * does not have, and would fight the calm the inner pages are meant to hold.
 */
export function FaqSection({
  items,
  title = "Pogosta vprašanja",
  eyebrow = "Vprašanja",
  id = "vprasanja-naslov",
  surface = "surface",
}: {
  items: readonly FaqItem[];
  title?: string;
  eyebrow?: string;
  id?: string;
  /** `ground` where a tonal band already sits directly above this one. */
  surface?: "surface" | "ground";
}) {
  return (
    <section
      aria-labelledby={id}
      className={
        surface === "surface"
          ? "border-y border-border bg-surface"
          : "bg-ground"
      }
    >
      <Container className="py-20 lg:py-24">
        <CenteredHeading id={id} eyebrow={eyebrow} title={title} />

        <RevealGroup className="mx-auto mt-12 max-w-[46rem] lg:mt-14">
          {items.map((item) => (
            <details
              key={item.question}
              data-reveal
              className="group border-b border-border first:border-t"
            >
              <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold tracking-[-0.014em] text-ink transition-colors duration-150 ease-standard hover:text-brand-strong [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-strong transition-transform duration-300 ease-smooth group-open:rotate-45 motion-reduce:transition-none"
                >
                  <Plus className="size-[18px]" strokeWidth={2} />
                </span>
              </summary>

              <p className="max-w-prose pr-14 pb-6 text-base text-ink-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
