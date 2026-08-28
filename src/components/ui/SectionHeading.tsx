import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The one heading pattern the page below the hero uses: brand rule, eyebrow,
 * h2, optional lead. Keeping it in one place is what stops ten sections from
 * drifting into ten slightly different heading treatments.
 *
 * THE EYEBROW IS OPTIONAL, AND SHOULD USUALLY BE OMITTED.
 *
 * A tiny green rule and an uppercase label before every single heading is one
 * of the most recognisable signatures of a page that was assembled rather than
 * designed, and it stops meaning anything the third time it appears. Use it for
 * a major section introduction or a page identifier; leave it off where the
 * heading already says the same word the eyebrow would ("Reference" above
 * "Izvedeni projekti" is the label twice, not hierarchy).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-[48rem]", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-eyebrow font-semibold uppercase",
            isDark ? "text-on-photo-muted" : "text-ink-muted",
          )}
        >
          <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={id}
        className={cn(
          "text-heading",
          eyebrow && "mt-5",
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
  tone = "light",
  className,
  children,
  titleWidth = "narrow",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
  /**
   * `narrow` holds the heading to roughly two lines, which is what a process
   * title wants. `wide` lets a longer statement use the full column.
   */
  titleWidth?: "narrow" | "wide";
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("mx-auto max-w-[58rem] text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center justify-center gap-4 text-eyebrow font-semibold uppercase",
            isDark ? "text-on-photo-muted" : "text-ink-muted",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-9 shrink-0",
              isDark ? "bg-graphite-line-strong" : "bg-border-strong",
            )}
          />
          {eyebrow}
          <span
            aria-hidden
            className={cn(
              "h-px w-9 shrink-0",
              isDark ? "bg-graphite-line-strong" : "bg-border-strong",
            )}
          />
        </p>
      ) : null}

      <h2
        id={id}
        className={cn(
          "mx-auto text-heading",
          eyebrow && "mt-5",
          isDark ? "text-on-photo" : "text-ink",
          titleWidth === "narrow" && "max-w-[22ch]",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "mx-auto mt-6 max-w-[54rem] text-lead",
            isDark ? "text-on-photo-muted" : "text-ink-muted",
          )}
        >
          {lead}
        </p>
      ) : null}

      {children}
    </div>
  );
}
