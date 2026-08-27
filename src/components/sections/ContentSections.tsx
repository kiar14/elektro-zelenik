import { Check, Info } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { ServiceSection } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The editorial body of an inner page.
 *
 * This used to be one shape repeated: a small heading on the left, a paragraph
 * on the right, a hairline, and the same again. Technically clean, but a page
 * built entirely out of it has no hierarchy and no rhythm, and the seven
 * service pages all looked like the same page with different words in it.
 *
 * There are now five block layouts. Each section names the one that fits what
 * it is actually saying, so the sequence differs from service to service:
 *
 *   feature    an opening statement with the scope of the service laid out
 *              beneath it as a grid of capability tiles
 *   list       a checked list as the main event, headed by a short intro
 *   editorial  one long-form argument, with its second paragraph pulled out
 *              against a brand rule
 *   split      two paragraphs set side by side under one heading
 *   note       a short, single-paragraph aside in a bordered panel
 *
 * Surfaces alternate strictly by index rather than by layout, so no two blocks
 * of the same tone ever sit on top of one another and every layout has to work
 * on both. Every block heading sits at `text-subheading`, one clear step under
 * the `text-heading` the page-level bands use, which is what keeps the page
 * reading h1 > band > block rather than as a run of similar-sized type.
 *
 * The vocabulary is entirely the site's existing one: the same tokens, the same
 * brand rule, the same brand-tint disc, the same 12px radius. What is new is the
 * arrangement, not the language.
 */

type Tone = "ground" | "surface";

const TONES: Record<
  Tone,
  { section: string; panel: string; panelBorder: string }
> = {
  ground: {
    section: "bg-ground",
    panel: "bg-surface",
    panelBorder: "border-border",
  },
  surface: {
    section: "border-y border-border bg-surface",
    panel: "bg-ground",
    panelBorder: "border-border",
  },
};

export function ContentSections({
  sections,
  className,
  /** Tone of the first block. The rest alternate from it. */
  startTone = "ground",
}: {
  sections: readonly ServiceSection[];
  className?: string;
  startTone?: Tone;
}) {
  return (
    <>
      {sections.map((section, index) => {
        const tone: Tone =
          (index % 2 === 0) === (startTone === "ground") ? "ground" : "surface";

        return (
          <Block
            key={section.title}
            section={section}
            tone={tone}
            className={index === 0 ? className : undefined}
          />
        );
      })}
    </>
  );
}

/**
 * The tone the body ends on, so whatever follows can take the other one and
 * two identical bands never stack.
 */
export function bodyEndTone(
  sections: readonly { title: string }[],
  startTone: Tone = "ground",
): Tone {
  const last = sections.length - 1;
  if (last < 0) return startTone;
  return (last % 2 === 0) === (startTone === "ground") ? "ground" : "surface";
}

function Block({
  section,
  tone,
  className,
}: {
  section: ServiceSection;
  tone: Tone;
  className?: string;
}) {
  const layout = section.layout ?? "feature";
  const styles = TONES[tone];

  return (
    <section className={cn(styles.section, className)}>
      <Container width="wide" className="py-18 lg:py-24">
        <RevealGroup>
          {layout === "feature" ? (
            <Feature section={section} styles={styles} />
          ) : null}
          {layout === "list" ? (
            <ChecklistBlock section={section} styles={styles} />
          ) : null}
          {layout === "editorial" ? <Editorial section={section} /> : null}
          {layout === "split" ? (
            <Split section={section} styles={styles} />
          ) : null}
          {layout === "note" ? (
            <Note section={section} styles={styles} />
          ) : null}
        </RevealGroup>
      </Container>
    </section>
  );
}

type Styles = (typeof TONES)[Tone];

/* -------------------------------------------------------------------------
 * feature
 * ---------------------------------------------------------------------- */

/**
 * The opening block. The heading holds the left third and stays put while the
 * argument scrolls past it; the scope of the service then lands underneath as
 * tiles, which is the shape someone scanning for "do they do the thing I need"
 * can actually read.
 */
function Feature({ section, styles }: { section: ServiceSection; styles: Styles }) {
  return (
    <>
      <div
        data-reveal
        className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16"
      >
        <h2 className="text-subheading text-ink lg:sticky lg:top-28 lg:self-start">
          <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
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
        </div>
      </div>

      {section.bullets ? (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 xl:grid-cols-3">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              data-reveal
              className={cn(
                "flex items-center gap-4 rounded-lg border px-5 py-4.5",
                styles.panel,
                styles.panelBorder,
              )}
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint"
              >
                <Check className="size-5 text-brand-strong" strokeWidth={2.1} />
              </span>
              <span className="text-base font-medium text-ink">{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * list
 * ---------------------------------------------------------------------- */

/** The list is the point of the block, so it gets the width and the intro sits
 *  above it rather than beside it. */
function ChecklistBlock({
  section,
  styles,
}: {
  section: ServiceSection;
  styles: Styles;
}) {
  return (
    <>
      <div data-reveal className="max-w-[52rem]">
        <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
        <h2 className="text-subheading text-ink">{section.title}</h2>
        {section.body ? (
          <p className="mt-6 max-w-prose text-lead text-ink-muted">
            {section.body}
          </p>
        ) : null}
        {section.body2 ? (
          <p className="mt-5 max-w-prose text-lead text-ink-muted">
            {section.body2}
          </p>
        ) : null}
      </div>

      {section.bullets ? (
        <ul
          data-reveal
          className={cn(
            "mt-10 grid overflow-hidden rounded-lg border sm:grid-cols-2 lg:mt-12",
            styles.panel,
            styles.panelBorder,
          )}
        >
          {section.bullets.map((bullet, index, all) => (
            <li
              key={bullet}
              className={cn(
                "flex min-h-[4.5rem] items-center gap-4 px-5 py-4 sm:px-7",
                // Hairlines between rows only, never a border on every side.
                index > 0 && "border-t border-border",
                index === 1 && "sm:border-t-0",
                index % 2 === 1 && "sm:border-l sm:border-l-border",
                // An odd last item runs the full width, so the rule above it
                // reaches both edges of the panel instead of stopping halfway
                // across at an empty cell.
                index === all.length - 1 &&
                  all.length % 2 === 1 &&
                  "sm:col-span-2",
              )}
            >
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-tint"
              >
                <Check className="size-5 text-brand-strong" strokeWidth={2.1} />
              </span>
              <span className="text-base font-medium text-ink">{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * editorial
 * ---------------------------------------------------------------------- */

/**
 * One argument, given room. The heading runs at section scale, the first
 * paragraph carries it and the second is pulled out against the brand rule,
 * which is where the block earns its weight without a card or a box.
 */
function Editorial({ section }: { section: ServiceSection }) {
  return (
    <div data-reveal className="max-w-[54rem]">
      <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
      <h2 className="max-w-[18ch] text-subheading text-ink">{section.title}</h2>

      {section.body ? (
        <p className="mt-7 max-w-prose text-lead text-ink-muted">
          {section.body}
        </p>
      ) : null}

      {section.body2 ? (
        <p className="mt-9 max-w-[46rem] border-l-2 border-brand pl-6 text-xl text-ink sm:pl-8">
          {section.body2}
        </p>
      ) : null}

      {section.bullets ? (
        <ul className="mt-9 flex flex-wrap gap-x-3 gap-y-3">
          {section.bullets.map((bullet) => (
            <li
              key={bullet}
              className="inline-flex items-center gap-2.5 rounded-control border border-border-strong px-4 py-2.5 text-base text-ink"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-brand" />
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * split
 * ---------------------------------------------------------------------- */

/** Two paragraphs of equal weight, read side by side rather than in sequence. */
function Split({ section, styles }: { section: ServiceSection; styles: Styles }) {
  return (
    <>
      <div data-reveal className="max-w-[46rem]">
        <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
        <h2 className="text-subheading text-ink">{section.title}</h2>
      </div>

      <div
        data-reveal
        className="mt-9 grid gap-x-16 gap-y-6 border-t border-border pt-9 md:grid-cols-2 lg:mt-11 lg:pt-11"
      >
        {section.body ? (
          <p className="max-w-prose text-lead text-ink-muted">{section.body}</p>
        ) : null}
        {section.body2 ? (
          <p className="max-w-prose text-lead text-ink-muted">
            {section.body2}
          </p>
        ) : null}
      </div>

      {section.bullets ? (
        <ul
          data-reveal
          className={cn(
            "mt-10 grid gap-4 rounded-lg border p-5 sm:grid-cols-2 sm:p-7 xl:grid-cols-3",
            styles.panel,
            styles.panelBorder,
          )}
        >
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3 text-base text-ink">
              <span
                aria-hidden
                className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-tint"
              >
                <Check className="size-3.5 text-brand-strong" strokeWidth={2.2} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * note
 * ---------------------------------------------------------------------- */

/** A short aside. One paragraph does not deserve a full band, so it is given a
 *  panel and a mark instead and the section around it stays shallow. */
function Note({ section, styles }: { section: ServiceSection; styles: Styles }) {
  return (
    <div
      data-reveal
      className={cn(
        "mx-auto flex max-w-[56rem] flex-col gap-5 rounded-lg border px-6 py-7 sm:flex-row sm:gap-7 sm:px-9 sm:py-9",
        styles.panel,
        styles.panelBorder,
      )}
    >
      <span
        aria-hidden
        className="flex size-13 shrink-0 items-center justify-center rounded-full bg-brand-tint sm:size-14"
      >
        <Info className="size-6 text-brand-strong sm:size-[26px]" strokeWidth={1.6} />
      </span>

      <div>
        <h2 className="text-xl font-semibold tracking-[-0.018em] text-ink">
          {section.title}
        </h2>
        {section.body ? (
          <p className="mt-3 max-w-prose text-base text-ink-muted">
            {section.body}
          </p>
        ) : null}
        {section.body2 ? (
          <p className="mt-4 max-w-prose text-base text-ink-muted">
            {section.body2}
          </p>
        ) : null}
      </div>
    </div>
  );
}
