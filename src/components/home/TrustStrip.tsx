import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { trustMetrics } from "@/content/homepage";

/**
 * The transition out of the cinematic hero into the page.
 *
 * Four exactly equal columns. Each metric is centred within its own column, so
 * the four optical centres land on 12.5 / 37.5 / 62.5 / 87.5 percent and the
 * separators sit precisely on the 25 / 50 / 75 boundaries. Nothing is aligned
 * to a cell's left edge.
 *
 * The layout, the grid rows, the heights, the type scale and the spacing are
 * the approved ones and are not to be adjusted here. The only thing that
 * changed in the visual pass is the surface: the strip is graphite rather than
 * warm stone, so that it belongs to the photograph above it instead of starting
 * the page's pale sections a screen early. The values and labels take the
 * light-on-dark pair for that reason and nothing else.
 */
export function TrustStrip() {
  return (
    <section aria-label="Podjetje v številkah" className="bg-graphite">
      <Container width="wide">
        <RevealGroup stagger={0.06}>
          <ul className="grid grid-cols-2 lg:grid-cols-4">
            {trustMetrics.map((metric, index) => (
              <li
                key={metric.label}
                data-reveal
                data-trust-column
                className={[
                  "grid min-h-[132px] grid-rows-[auto_2.9em] content-center items-start px-3 py-8 text-center",
                  "lg:min-h-[100px] lg:grid-rows-[auto_2.4em] lg:px-6 lg:py-0 xl:min-h-[112px] xl:py-1",
                  // Separators on the interior boundaries only.
                  "border-graphite-line",
                  index >= 2 ? "border-t lg:border-t-0" : "",
                  index % 2 === 1 ? "border-l lg:border-l" : "",
                  index === 2 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <p className="w-full font-display text-[clamp(2.5rem,6vw,3.5rem)] leading-none font-semibold tabular-nums text-on-photo lg:text-[2.75rem] xl:text-[3rem] 2xl:text-[3.25rem]">
                  {metric.formatted}
                </p>
                <p className="mx-auto mt-2 flex max-w-[18ch] items-start justify-center text-eyebrow font-semibold uppercase text-on-photo-muted">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
