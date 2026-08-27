import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one heading pattern the page below the hero uses: brand rule, eyebrow,
 * h2, optional lead. Keeping it in one place is what stops ten sections from
 * drifting into ten slightly different heading treatments.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-[48rem]", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-eyebrow font-semibold uppercase",
          isDark ? "text-on-photo-muted" : "text-ink-muted",
        )}
      >
        <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
        {eyebrow}
      </p>

      <h2
        id={id}
        className={cn(
          "mt-5 text-heading",
          isDark ? "text-on-photo" : "text-ink",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "mt-5 max-w-prose text-lead",
            isDark ? "text-on-photo-muted" : "text-ink-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The centred variant: a rule on both sides of the eyebrow, heading and lead
 * centred beneath it.
 *
 * Lifted verbatim out of the approved homepage, where it is the treatment used
 * by "Zakaj izbrati nas" and "Kako poteka sodelovanje". Both of those now
 * render through this component, so the inner pages and the homepage cannot
 * drift apart: there is one implementation of the pattern, not three copies.
 */
export function CenteredHeading({
  eyebrow,
  title,
  lead,
  id,
  className,
  children,
  titleWidth = "narrow",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  className?: string;
  children?: ReactNode;
  /**
   * `narrow` holds the heading to roughly two lines, which is what a process
   * title wants. `wide` lets a longer statement use the full column.
   */
  titleWidth?: "narrow" | "wide";
}) {
  return (
    <div className={cn("mx-auto max-w-[58rem] text-center", className)}>
      <p className="flex items-center justify-center gap-4 text-eyebrow font-semibold uppercase text-ink-muted">
        <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
        {eyebrow}
        <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
      </p>

      <h2
        id={id}
        className={cn(
          "mx-auto mt-5 text-heading text-ink",
          titleWidth === "narrow" && "max-w-[22ch]",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p className="mx-auto mt-6 max-w-[54rem] text-lead text-ink-muted">
          {lead}
        </p>
      ) : null}

      {children}
    </div>
  );
}
