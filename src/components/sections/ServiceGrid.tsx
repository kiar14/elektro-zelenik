import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { RevealGroup } from "@/components/motion/RevealGroup";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The SERVICE CARD family, lifted unchanged out of the approved homepage.
 *
 * The photograph is the card: it sits on the page background with no container
 * around it and only a small radius, so the images carry the section and the
 * type sits quietly beneath them. Hover adds restrained elevation and a very
 * small scale on the photograph. The green Lucide mark next to each title
 * identifies the service.
 *
 * Used by the homepage grid, `/storitve`, and every related-services block, so
 * a service card looks the same in all three places by construction.
 */
export interface ServiceCardItem {
  title: string;
  body: string;
  href: string;
  icon: Service["icon"];
  image: string;
  alt: string;
}

/**
 * `feature` is the homepage arrangement: two full rows of three with the
 * seventh card centred beneath them. `even` is a plain three-up row, used where
 * the count already divides, such as a related-services block.
 */
type GridLayout = "feature" | "even";

export function ServiceGrid({
  items,
  layout = "even",
  priority = false,
  className,
}: {
  items: readonly ServiceCardItem[];
  layout?: GridLayout;
  /** Set on the first row only where the grid sits above the fold. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <RevealGroup
      stagger={0.055}
      className={cn(
        "grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-18",
        className,
      )}
    >
      {items.map((service, index) => (
        <article
          key={service.href}
          data-reveal
          className={
            layout === "feature" && index === items.length - 1
              ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-1rem)] xl:col-span-1 xl:col-start-2 xl:mx-0 xl:w-auto"
              : undefined
          }
        >
          <Link
            href={service.href}
            className="group block transition-transform duration-300 ease-smooth hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-transparent bg-surface-sunk transition-[border-color,box-shadow] duration-300 ease-smooth group-hover:border-border-strong group-hover:shadow-raised motion-reduce:transition-none">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                priority={priority && index < 3}
                sizes="(min-width: 1280px) 32vw, (min-width: 640px) 46vw, 100vw"
                className="object-cover transition-transform duration-600 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>

            <div className="mt-7 flex items-center gap-2.5">
              <service.icon
                aria-hidden
                className="size-[25px] shrink-0 text-brand-strong transition-transform duration-300 ease-smooth group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                strokeWidth={1.7}
              />
              <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
                {service.title}
              </h3>
            </div>

            <p className="mt-3 max-w-[44ch] text-base text-ink-muted">
              {service.body}
            </p>

            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-strong">
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
    href: service.href,
    icon: service.icon,
    image: service.image,
    alt: service.alt,
  }));
}
