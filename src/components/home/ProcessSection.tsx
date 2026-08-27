import { Container } from "@/components/layout/Container";
import { ProcessMotion } from "@/components/motion/ProcessMotion";
import { processSteps } from "@/content/homepage";

/**
 * Four stages on a hairline.
 *
 * Desktop: four even columns, one horizontal rule running behind the markers,
 * everything centred under them. Mobile: the same sequence turned on its side
 * into a vertical timeline, where left-aligned copy simply reads better.
 *
 * The structure comes from whitespace, the rule and the markers. No cards, no
 * borders around steps, no boxes.
 */
const MARKER_SIZE = 68;
const MARKER_CENTRE = MARKER_SIZE / 2;

export function ProcessSection() {
  return (
    <section
      aria-labelledby="postopek-naslov"
      className="border-y border-border bg-surface"
    >
      <Container width="wide" className="py-20 lg:py-30">
        <div className="text-center">
          <p className="flex items-center justify-center gap-4 text-eyebrow font-semibold uppercase text-ink-muted">
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
            Postopek
            <span aria-hidden className="h-px w-9 shrink-0 bg-border-strong" />
          </p>
          <h2
            id="postopek-naslov"
            className="mx-auto mt-5 max-w-[22ch] text-heading text-ink"
          >
            Kako poteka sodelovanje
          </h2>
        </div>

        <ProcessMotion className="relative mt-16 lg:mt-24">
          {/* The rule the markers sit on. Desktop only. On mobile the
              connectors inside each step carry the sequence instead. */}
          <span
            aria-hidden
            data-process-line
            className="absolute right-0 left-0 hidden h-px bg-border-strong lg:block"
            style={{ top: `${MARKER_CENTRE}px` }}
          />

          {/* Vertical timeline all the way to lg. A two-by-two grid in between
              would drop the connecting line entirely and lose the sequence. */}
          <ol className="grid gap-y-12 lg:grid-cols-4 lg:gap-x-12 xl:gap-x-16">
            {processSteps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Vertical connector to the next marker, narrow widths only. */}
                {index < processSteps.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -bottom-10 w-px bg-border-strong lg:hidden"
                    style={{
                      left: `${MARKER_CENTRE}px`,
                      top: `${MARKER_SIZE}px`,
                    }}
                  />
                ) : null}

                <span
                  aria-hidden
                  className="relative z-10 flex shrink-0 items-center justify-center rounded-[14px] bg-brand-strong font-display text-xl font-semibold tabular-nums text-white ring-6 ring-surface"
                  style={{ width: MARKER_SIZE, height: MARKER_SIZE }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="pb-2 lg:mt-8 lg:max-w-[280px]">
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
