import Image from "next/image";

import { RevealGroup } from "@/components/motion/RevealGroup";
import type { ReferenceItem } from "@/content/references";
import { cn } from "@/lib/cn";

/**
 * The REFERENCE ITEM family, lifted unchanged out of the approved homepage.
 *
 * A photograph in a small radius with no border, a very small scale on hover,
 * and a caption beneath it: brand-green category, then the title. No overlay,
 * no scrim, no text over the image, and no description invented to fill space.
 *
 * `lead` renders the first item across the full width, which is the homepage
 * arrangement. `/reference` uses the same treatment for a longer list.
 */
export function ReferenceGrid({
  items,
  lead = false,
  className,
}: {
  items: readonly ReferenceItem[];
  /** Give the first photograph the full width, as on the homepage. */
  lead?: boolean;
  className?: string;
}) {
  const feature = lead ? items[0] : undefined;
  const rest = lead ? items.slice(1) : items;

  return (
    <RevealGroup
      stagger={0.09}
      className={cn("grid gap-8 lg:grid-cols-2 lg:gap-10", className)}
    >
      {feature ? (
        <ReferenceCard
          item={feature}
          data-reveal
          className="lg:col-span-2"
          aspect="aspect-[16/10] lg:aspect-[21/9]"
          sizes="(min-width: 1024px) 76vw, 100vw"
          lead
        />
      ) : null}

      {rest.map((item) => (
        <ReferenceCard
          key={item.src}
          item={item}
          data-reveal
          aspect="aspect-[4/3] lg:aspect-[3/2]"
          sizes="(min-width: 1024px) 37vw, 100vw"
        />
      ))}
    </RevealGroup>
  );
}

export function ReferenceCard({
  item,
  aspect,
  sizes,
  className,
  lead,
  ...rest
}: {
  item: ReferenceItem;
  aspect: string;
  sizes: string;
  className?: string;
  lead?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <figure className={className} {...rest}>
      <div
        className={`group relative overflow-hidden rounded-lg bg-surface-sunk ${aspect}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <figcaption className="mt-5">
        <span className="text-eyebrow font-semibold uppercase text-brand-strong">
          {item.category}
        </span>
        <span
          className={`mt-2 block font-semibold tracking-[-0.015em] text-ink ${
            lead ? "text-2xl" : "text-xl"
          }`}
        >
          {item.title}
        </span>
        {item.note ? (
          <span className="mt-1.5 block text-base text-ink-muted">
            {item.note}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
