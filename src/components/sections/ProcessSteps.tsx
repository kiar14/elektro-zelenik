import { Container } from "@/components/layout/Container";
import { ProcessMotion } from "@/components/motion/ProcessMotion";
import { CenteredHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

/**
 * The one multi-step treatment used anywhere on the site.
 *
 * This is the approved homepage "Kako poteka sodelovanje" component, lifted out
 * unchanged and given content props. The homepage renders through it, and so
 * does every service page and the enquiry page, which is what guarantees there
 * is exactly one process aesthetic rather than nine similar ones.
 *
 * Wide: even columns, one horizontal rule running behind the markers,
 * everything centred under them. Narrow: the same sequence turned on its side
 * into a vertical timeline, where left-aligned copy simply reads better.
 *
 * Structure comes from whitespace, the rule and the markers. No cards, no
 * borders around steps, no boxes. Only the content and the number of steps
 * change from page to page.
 */
const MARKER_SIZE = 68;
const MARKER_CENTRE = MARKER_SIZE / 2;

export interface ProcessStepItem {
  title: string;
  body: string;
}

/**
 * The marker's ring punches a hole in the connecting rule, so it has to be
 * painted in the section's own background colour. Getting this wrong is the one
 * way the component can look broken on a different surface, so the two values
 * are declared together rather than being passed in separately.
 */
const SURFACES = {
  surface: {
    section: "border-y border-border bg-surface",
    ring: "ring-surface",
  },
  ground: {
    section: "bg-ground",
    ring: "ring-ground",
  },
} as const;

/**
 * Where the timeline turns from vertical to horizontal.
 *
 * Three or four steps have room to lay out side by side from `lg`, which is the
 * homepage's own behaviour and is left exactly as it was. Five would divide the
 * same row into 160px columns there, which turns a two-word title into two lines
 * and a sentence into six, so the denser case stays in the vertical timeline for
 * one breakpoint longer and turns at `xl` instead.
 *
 * That is not a second layout. It is the same two states the component already
 * has, with the switch placed where the copy can actually live in the column.
 *
 * Tailwind resolves class names statically, so each set is written out in full
 * rather than composed from a variable prefix.
 */
const BREAKPOINTS = {
  lg: {
    line: "hidden lg:block",
    item: "lg:flex-col lg:items-center lg:gap-0 lg:text-center",
    connector: "lg:hidden",
    copy: "lg:mt-8 lg:max-w-[280px]",
  },
  xl: {
    line: "hidden xl:block",
    item: "xl:flex-col xl:items-center xl:gap-0 xl:text-center",
    connector: "xl:hidden",
    copy: "xl:mt-8 xl:max-w-[280px]",
  },
} as const;

export function ProcessSteps({
  eyebrow = "Postopek",
  title,
  steps,
  id = "postopek-naslov",
  surface = "surface",
  className,
}: {
  eyebrow?: string;
  title: string;
  steps: readonly ProcessStepItem[];
  id?: string;
  surface?: keyof typeof SURFACES;
  className?: string;
}) {
  const tone = SURFACES[surface];
  const dense = steps.length >= 5;
  const bp = dense ? BREAKPOINTS.xl : BREAKPOINTS.lg;

  return (
    <section aria-labelledby={id} className={cn(tone.section, className)}>
      <Container width="wide" className="py-20 lg:py-30">
        <CenteredHeading id={id} eyebrow={eyebrow} title={title} />

        <ProcessMotion className="relative mt-16 lg:mt-24">
          {/* The rule the markers sit on. Wide viewports only. Below that the
              connectors inside each step carry the sequence instead. */}
          <span
            aria-hidden
            data-process-line
            className={cn(
              "absolute right-0 left-0 h-px bg-border-strong",
              bp.line,
            )}
            style={{ top: `${MARKER_CENTRE}px` }}
          />

          {/* A two-by-two grid in between would drop the connecting line
              entirely and lose the sequence, so there is no intermediate
              state: it is the vertical timeline until it is the full row. */}
          <ol
            className={cn(
              "grid gap-y-12",
              steps.length === 3 && "lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16",
              steps.length === 4 && "lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16",
              steps.length >= 5 && "xl:grid-cols-5 xl:gap-x-10 2xl:gap-x-12",
            )}
          >
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                className={cn("relative flex gap-5", bp.item)}
              >
                {/* Vertical connector to the next marker, narrow widths only. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden
                    className={cn("absolute -bottom-10 w-px bg-border-strong", bp.connector)}
                    style={{
                      left: `${MARKER_CENTRE}px`,
                      top: `${MARKER_SIZE}px`,
                    }}
                  />
                ) : null}

                <span
                  aria-hidden
                  data-process-marker
                  className={cn(
                    "relative z-10 flex shrink-0 items-center justify-center rounded-[14px] bg-brand-strong font-display text-xl font-semibold tabular-nums text-white ring-6",
                    tone.ring,
                  )}
                  style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className={cn("pb-2", bp.copy)}>
                  <h3 className="text-lg font-semibold tracking-[-0.014em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-base text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </ProcessMotion>
      </Container>
    </section>
  );
}
