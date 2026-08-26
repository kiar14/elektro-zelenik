import { CountUp } from "@/components/home/CountUp";
import { Container } from "@/components/layout/Container";
import { trustMetrics } from "@/content/homepage";

/**
 * The transition out of the cinematic hero into the page.
 *
 * Four exactly equal columns. Each metric is centred within its own column, so
 * the four optical centres land on 12.5 / 37.5 / 62.5 / 87.5 percent and the
 * separators sit precisely on the 25 / 50 / 75 boundaries. Nothing is aligned
 * to a cell's left edge.
 */
export function TrustStrip() {
  return (
    <section
      aria-label="Podjetje v številkah"
      className="border-b border-border bg-surface"
    >
      <Container width="wide">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          {trustMetrics.map((metric, index) => (
            <li
              key={metric.label}
              className={[
                "flex min-h-[132px] flex-col items-center justify-center px-3 py-9 text-center",
                "lg:min-h-[164px] lg:px-6 lg:py-11",
                // Separators on the interior boundaries only.
                "border-border",
                index >= 2 ? "border-t lg:border-t-0" : "",
                index % 2 === 1 ? "border-l lg:border-l" : "",
                index === 2 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <p className="font-display text-metric font-semibold tabular-nums text-brand-strong">
                <CountUp
                  value={metric.value}
                  decimals={metric.decimals}
                  suffix={metric.suffix}
                  formatted={metric.formatted}
                />
              </p>
              <p className="mt-3 max-w-[18ch] text-eyebrow font-semibold uppercase text-ink-muted">
                {metric.label}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
