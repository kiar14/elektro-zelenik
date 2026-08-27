import { Check } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { ServiceSection } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The editorial body of an inner page.
 *
 * Heading on the left, copy on the right, a hairline between blocks and a great
 * deal of whitespace. No cards: these are paragraphs, and wrapping explanatory
 * prose in a container would introduce a fourth card family for no reason.
 *
 * The h2 sits at `text-2xl` rather than the section scale, which puts these
 * blocks one clear step below the page h1 and below the process and FAQ
 * headings. Every value is an existing token; the hierarchy is new, the
 * vocabulary is not.
 *
 * The checked list is the only decoration, and it earns its place: a service
 * page is read by someone scanning for whether the thing they need is on the
 * list.
 */
export function ContentSections({
  sections,
  className,
}: {
  sections: readonly ServiceSection[];
  className?: string;
}) {
  return (
    <section className={cn("bg-ground", className)}>
      <Container width="wide" className="py-20 lg:py-24">
        <RevealGroup className="grid">
          {sections.map((section, index) => (
            <div
              key={section.title}
              data-reveal
              className={cn(
                "grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16",
                index > 0 &&
                  "mt-14 border-t border-border pt-14 lg:mt-20 lg:pt-20",
              )}
            >
              <h2 className="max-w-[20ch] text-2xl font-semibold tracking-[-0.018em] text-ink">
                <span
                  aria-hidden
                  className="mb-5 block h-px w-9 bg-brand"
                />
                {section.title}
              </h2>

              <div>
                {section.body ? (
                  <p className="max-w-prose text-lead text-ink-muted">
                    {section.body}
                  </p>
                ) : null}

                {section.body2 ? (
                  <p className="mt-5 max-w-prose text-lead text-ink-muted">
                    {section.body2}
                  </p>
                ) : null}

                {section.bullets ? (
                  <ul
                    className={cn(
                      "grid gap-x-8 gap-y-3.5",
                      section.body || section.body2 ? "mt-8" : "",
                      section.bullets.length > 4 && "sm:grid-cols-2",
                    )}
                  >
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-base text-ink"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-tint"
                        >
                          <Check
                            className="size-3.5 text-brand-strong"
                            strokeWidth={2.2}
                          />
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
