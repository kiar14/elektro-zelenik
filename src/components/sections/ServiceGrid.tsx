import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RevealGroup } from "@/components/motion/RevealGroup";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The SERVICE CARD family.
 *
 * The photograph is the card: it sits on the page background with no container
 * around it, so the images carry the section and the type sits quietly beneath
 * them. Hover adds a restrained lift and a very small scale on the photograph.
 * The green Lucide mark next to each title identifies the service.
 *
 * The one exception is the featured card, which is a real panel. That contrast
 * is the whole point of it: seven cards of one size say that all seven matter
 * equally, and they do not. Elektroinštalacije is the service the company is,
 * and the other six are what it also does on the same building.
 */
export interface ServiceCardItem {
  title: string;
  body: string;
  /** The longer page-level line. Used only by the featured card. */
  lead?: string;
  href: string;
  icon: Service["icon"];
  image: string;
  alt: string;
}

/* -------------------------------------------------------------------------
 * The showcase: one featured service, then the rest at equal weight.
 * ---------------------------------------------------------------------- */

/**
 * Featured card plus a plain grid of everything after it.
 *
 * With seven services this resolves to one panel and two rows of three, which
 * is what replaced the old 3 + 3 + 1 arrangement: the seventh card used to sit
 * alone under two full rows with nothing beside it, and an orphan cell is the
 * single most legible sign that a layout was filled rather than composed.
 */
export function ServiceShowcase({
  items,
  priority = false,
  className,
}: {
  items: readonly ServiceCardItem[];
  /** Set where the showcase sits above the fold. */
  priority?: boolean;
  className?: string;
}) {
  const [featured, ...rest] = items;
  if (!featured) return null;

  return (
    <div className={className}>
      <RevealGroup>
        <FeaturedServiceCard item={featured} priority={priority} />
      </RevealGroup>

      <ServiceGrid items={rest} className="mt-10 lg:mt-14" />
    </div>
  );
}

function FeaturedServiceCard({
  item,
  priority,
}: {
  item: ServiceCardItem;
  priority: boolean;
}) {
  return (
    <article data-reveal>
      <Link
        href={item.href}
        className="group grid overflow-hidden rounded-frame border border-border bg-surface transition-[border-color,box-shadow] duration-300 ease-smooth hover:border-border-strong hover:shadow-raised motion-reduce:transition-none lg:grid-cols-[45%_55%]"
      >
        {/* The photograph runs to the panel edge on three sides rather than
            sitting inside it with a margin, so the panel reads as one object
            and not as a card containing a smaller card. */}
        <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunk sm:aspect-[2/1] lg:aspect-auto lg:min-h-[23rem]">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-11 lg:px-12 lg:py-14 xl:px-14">
          <div className="flex items-center gap-3">
            <item.icon
              aria-hidden
              className="size-7 shrink-0 text-brand-strong"
              strokeWidth={1.6}
            />
            <h3 className="text-subheading text-ink">{item.title}</h3>
          </div>

          <p className="mt-5 max-w-[46ch] text-lead text-ink-muted">
            {item.lead ?? item.body}
          </p>

          <span className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-brand-strong">
            Več
            <ArrowRight
              aria-hidden
              className="size-[18px] transition-transform duration-250 ease-smooth group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

/* -------------------------------------------------------------------------
 * The plain grid.
 * ---------------------------------------------------------------------- */

/**
 * Three up from `lg`. It used to turn at `xl`, which left a 1024 to 1279px
 * desktop looking at a two-column list of photographs where the design is a
 * row of three.
 */
export function ServiceGrid({
  items,
  priority = false,
  className,
}: {
  items: readonly ServiceCardItem[];
  priority?: boolean;
  className?: string;
}) {
  return (
    <RevealGroup
      stagger={0.055}
      className={cn(
        "grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-9 lg:gap-y-14 xl:gap-x-11",
        className,
      )}
    >
      {items.map((service, index) => (
        <article key={service.href} data-reveal className="flex">
          {/* A column, so the "Več" of every card in a row lands on one line
              whatever the body copy does. */}
          <Link
            href={service.href}
            className="group flex w-full flex-col transition-transform duration-300 ease-smooth hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-transparent bg-surface-sunk transition-[border-color,box-shadow] duration-300 ease-smooth group-hover:border-border-strong group-hover:shadow-raised motion-reduce:transition-none">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                priority={priority && index < 3}
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"
                className="object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="mt-6 flex items-center gap-2.5">
              <service.icon
                aria-hidden
                className="size-[22px] shrink-0 text-brand-strong"
                strokeWidth={1.7}
              />
              <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
                {service.title}
              </h3>
            </div>

            <p className="mt-2.5 max-w-[42ch] text-base text-ink-muted">
              {service.body}
            </p>

            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand-strong">
              Več
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-250 ease-smooth group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </span>
          </Link>
        </article>
      ))}
    </RevealGroup>
  );
}

/** Maps the canonical service records onto the card shape. */
export function toServiceCards(
  items: readonly Service[],
): readonly ServiceCardItem[] {
  return items.map((service) => ({
    title: service.title,
    body: service.cardBody,
    lead: service.lead,
    href: service.href,
    icon: service.icon,
    image: service.image,
    alt: service.alt,
  }));
}
