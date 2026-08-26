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
