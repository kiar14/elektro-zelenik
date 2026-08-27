import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * The trail above every inner-page heading.
 *
 * The last entry is the current page and is not a link, which is both correct
 * and what `aria-current="page"` announces. The separators are decorative and
 * hidden, so a screen reader hears the trail as a plain list of destinations.
 */
export interface Crumb {
  label: string;
  /** Omitted on the final crumb, which is the page you are already on. */
  href?: string;
}

export function Breadcrumbs({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Drobtinice">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
        <li>
          <Link
            href="/"
            className="inline-flex min-h-8 items-center rounded-xs transition-colors duration-150 ease-standard hover:text-ink"
          >
            Domov
          </Link>
        </li>

        {items.map((crumb, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={crumb.label} className="flex items-center gap-1.5">
              <ChevronRight
                aria-hidden
                className="size-3.5 shrink-0 text-border-strong"
              />
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="inline-flex min-h-8 items-center rounded-xs transition-colors duration-150 ease-standard hover:text-ink"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-ink">
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
