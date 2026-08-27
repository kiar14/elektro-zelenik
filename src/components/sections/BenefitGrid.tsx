import type { LucideIcon } from "lucide-react";

import { RevealGroup } from "@/components/motion/RevealGroup";
import { cn } from "@/lib/cn";

/**
 * The WHY-US card family, lifted unchanged out of the approved homepage.
 *
 * Wide horizontal proportion, centred icon in a brand-tint disc, centred title,
 * centred copy, one restrained border on a tonal surface, and a small lift on
 * hover. This is the only card used for benefits, proof and explanatory
 * features anywhere on the site; a page that needs that kind of card renders
 * this one rather than growing a variant of its own.
 */
export interface BenefitCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function BenefitGrid({
  cards,
  className,
}: {
  cards: readonly BenefitCard[];
  className?: string;
}) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6",
        className,
      )}
    >
      {cards.map((card) => (
        <article
          key={card.title}
          data-reveal
          className="group flex flex-col items-center rounded-lg border border-border bg-surface px-4 py-6 text-center transition-[transform,border-color,background-color,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:border-border-strong hover:bg-ground hover:shadow-raised motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:px-7 sm:py-7 lg:px-8 xl:min-h-[15.5rem] xl:px-9"
        >
          <span
            aria-hidden
            className="flex size-12 items-center justify-center rounded-full bg-brand-tint transition-transform duration-300 ease-smooth group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:size-13"
          >
            <card.icon className="size-[25px] text-brand-strong" strokeWidth={1.7} />
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
  );
}
