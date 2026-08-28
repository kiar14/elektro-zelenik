import type { LucideIcon } from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/cn";

/**
 * The WHY-US card family.
 *
 * A centred icon on the warm surface, a centred title, centred copy, one quiet
 * border and a small lift on hover. This is the only card used for benefits and
 * proof anywhere on the site; a page that needs that kind of card renders this
 * one rather than growing a variant of its own.
 *
 * THE LAYOUT IS THE POINT HERE.
 *
 * Five cards in a three-column grid leaves two on the last row, hard left, with
 * a hole beside them. The obvious fixes are both wrong: stretching the last two
 * makes them larger than the first three and implies they matter more, and
 * centring them with `justify-center` on a flex row lets them size to their
 * content, so they end up narrower.
 *
 * A six-column grid solves it without touching the cards. Every card spans two
 * columns, so all five are exactly one third of the row wide. The first three
 * take columns 1, 3 and 5; the last two are placed at columns 2 and 4, which
 * leaves one empty column at each end and lands the pair on the centre line.
 * Same width, same height, no exceptions.
 *
 * The equal height comes from the grid itself: rows are sized to their tallest
 * item and the cards are `h-full`, so the five match whatever the longest body
 * copy turns out to be at a given width.
 */
export interface BenefitCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

/**
 * Placement inside the six-column desktop grid, by index.
 *
 * Tailwind resolves class names statically, so these are written out rather
 * than computed. Below `lg` the grid is one or two ordinary columns and none of
 * this applies.
 */
const PLACEMENT = [
  "lg:col-span-2 lg:col-start-1",
  "lg:col-span-2 lg:col-start-3",
  "lg:col-span-2 lg:col-start-5",
  "lg:col-span-2 lg:col-start-2",
  "lg:col-span-2 lg:col-start-4",
] as const;

export function BenefitGrid({
  cards,
  className,
}: {
  cards: readonly BenefitCard[];
  className?: string;
}) {
  // The six-column arrangement is written for exactly five cards. Any other
  // count falls back to the plain three-up grid rather than landing somewhere
  // unintended.
  const centred = cards.length === 5;

  return (
    <RevealGroup
      className={cn(
        "grid gap-5 sm:grid-cols-2 xl:gap-6",
        // Rows are sized to the tallest card in the whole grid, not the
        // tallest in their own row. Without this the second row is visibly
        // deeper than the first whenever its copy runs a line longer, which is
        // the exact thing the arrangement exists to avoid.
        centred ? "lg:auto-rows-fr lg:grid-cols-6" : "lg:grid-cols-3",
        className,
      )}
    >
      {cards.map((card, index) => (
        <article
          key={card.title}
          data-reveal
          className={cn(
            "group flex h-full flex-col items-center rounded-lg border border-border bg-surface px-5 py-7 text-center transition-[transform,border-color,background-color,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:border-border-strong hover:bg-ground hover:shadow-raised motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-7 lg:px-7 lg:py-8",
            centred && PLACEMENT[index],
          )}
        >
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full bg-brand-tint transition-transform duration-300 ease-smooth group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <card.icon className="size-6 text-brand-strong" strokeWidth={1.6} />
          </span>

          <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-ink">
            {card.title}
          </h3>
          <p className="mt-2.5 max-w-[38ch] text-sm text-ink-muted">
            {card.body}
          </p>
        </article>
      ))}
    </RevealGroup>
  );
}
