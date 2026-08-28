import { Check } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * The scope of a service, laid out as a technical grid.
 *
 * This replaced a set of floating pill cards: individually rounded, individually
 * bordered, each with a tinted disc around its tick, four or six of them adrift
 * on a beige band. That is the shape a component library produces, and it made
 * the most useful information on a service page, the list of what is actually
 * included, read as decoration.
 *
 * What is here instead is one object with cells in it. Every cell shares its
 * hairlines with its neighbours, the corner radius is the smallest of the
 * site's three, the tick is a plain 16px mark rather than an icon inside a
 * badge, and the whole thing sits directly on the section surface. It reads the
 * way a specification reads.
 *
 * Every cell carries its own top and left hairline and the frame supplies the
 * remaining two edges, so the grid closes correctly at any column count without
 * a single nth-child rule.
 */
/**
 * A grid whose last row is short leaves a hole with the frame's own bottom
 * hairline running under it, which reads as a cell that failed to render. The
 * final item stretches across whatever the last row has left instead, so the
 * object always closes as a rectangle at every column count.
 *
 * Tailwind resolves class names statically, so the three spans this can produce
 * are written out.
 */
const LAST_SPAN = {
  2: "sm:col-span-2",
  3: "lg:col-span-3",
  "3-2": "lg:col-span-2",
} as const;

export function TechnicalGrid({
  items,
  columns = 3,
  className,
}: {
  items: readonly string[];
  /** Widest-breakpoint column count. Two reads better for four short items. */
  columns?: 2 | 3;
  className?: string;
}) {
  const lastIndex = items.length - 1;

  // At `sm` the grid is always two columns; at `lg` it is `columns`.
  const smRemainder = items.length % 2;
  const lgRemainder = columns === 3 ? items.length % 3 : smRemainder;

  return (
    <ul
      className={cn(
        "grid overflow-hidden rounded-cell border-r border-b border-border sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, index) => (
        <li
          key={item}
          className={cn(
            "flex min-h-[4.25rem] items-center gap-3.5 border-t border-l border-border px-5 py-4 lg:px-6",
            index === lastIndex && smRemainder === 1 && LAST_SPAN[2],
            index === lastIndex &&
              columns === 3 &&
              lgRemainder === 1 &&
              LAST_SPAN[3],
            index === lastIndex &&
              columns === 3 &&
              lgRemainder === 2 &&
              LAST_SPAN["3-2"],
            // At `lg` a three-column grid whose count is even may still have
            // picked up the two-column span above; cancel it where the row is
            // already full.
            index === lastIndex &&
              columns === 3 &&
              lgRemainder === 0 &&
              "lg:col-span-1",
          )}
        >
          <Check
            aria-hidden
            className="size-4 shrink-0 text-brand-strong"
            strokeWidth={2.6}
          />
          <span className="text-base font-medium text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The compact variant, for a short list of object types rather than a scope.
 *
 * Three or four two-word items do not want a full grid; they want to read as
 * one line of qualifiers under the argument they belong to.
 */
export function TechnicalChips({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-2.5 rounded-cell border border-border bg-transparent px-4 py-2.5 text-base text-ink"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-brand" />
          {item}
        </li>
      ))}
    </ul>
  );
}
