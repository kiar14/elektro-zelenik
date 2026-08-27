import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import type { GalleryRow, ReferenceProject } from "@/content/references";
import { cn } from "@/lib/cn";

/**
 * One project, one section, however many photographs it has.
 *
 * The gallery is composed rather than tiled. Each row carries its own ratio and
 * each cell its own column span, so a row resolves to a single height and the
 * spans are chosen against the photographs' real proportions: a landscape gets
 * the wide cell, a portrait the narrow one, and nothing is squeezed into a box
 * that does not fit it. That is what lets several frames of one building read
 * as one composed project rather than as a row of cards.
 *
 * There is no text inside a gallery. A line of prose beside a photograph, on a
 * project whose scope is not documented, can only be filler, so the copy stops
 * at the category, the title and a subtitle where one is genuinely verified.
 *
 * Below `lg` every cell is full width and every photograph falls back to its
 * own ratio, so the composition stacks rather than shrinking into unreadable
 * slivers.
 */

/**
 * Tailwind resolves class names statically, so the spans, offsets and ratios a
 * project may use are written out rather than interpolated.
 */
const SPANS: Record<number, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

const STARTS: Record<number, string> = {
  4: "lg:col-start-4",
  5: "lg:col-start-5",
};

const ROW_ASPECTS: Record<string, string> = {
  "3/1": "lg:aspect-[3/1]",
  "16/9": "lg:aspect-[16/9]",
  "16/10": "lg:aspect-[16/10]",
  "9/4": "lg:aspect-[9/4]",
  "9/5": "lg:aspect-[9/5]",
};

const MOBILE_ASPECTS: Record<string, string> = {
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
};

export function ProjectGallery({
  project,
  index,
  flushTop = false,
}: {
  project: ReferenceProject;
  /**
   * Only the first project's lead photograph loads eagerly. Nothing here is
   * `priority`: every gallery sits below the hero and the section heading, so a
   * preload hint would only compete with the type that is actually the LCP.
   */
  index: number;
  /** Set where a section heading already sits directly above this one. */
  flushTop?: boolean;
}) {
  const headingId = `projekt-${project.slug}`;

  return (
    <section
      aria-labelledby={headingId}
      className={
        index % 2 === 1 ? "border-y border-border bg-surface" : "bg-ground"
      }
    >
      <Container
        className={cn(
          "pb-18 lg:pb-24",
          flushTop ? "pt-12 lg:pt-14" : "pt-18 lg:pt-24",
        )}
      >
        <RevealGroup stagger={0.08}>
          <div data-reveal className="max-w-[46rem]">
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-brand-strong">
              <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
              {project.category}
            </p>

            <h2 id={headingId} className="mt-4 text-subheading text-ink">
              {project.title}
            </h2>

            {project.description ? (
              <p className="mt-4 max-w-prose text-lead text-ink-muted">
                {project.description}
              </p>
            ) : null}
          </div>

          <div className="mt-9 grid gap-5 lg:mt-12 lg:gap-6">
            {project.rows.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                row={row}
                eager={index === 0 && rowIndex === 0}
              />
            ))}
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}

function Row({ row, eager }: { row: GalleryRow; eager: boolean }) {
  return (
    <div
      className={cn(
        "grid gap-5 lg:grid-cols-12 lg:gap-6",
        ROW_ASPECTS[row.aspect],
      )}
    >
      {row.images.map((image) => (
        <figure
          key={image.src}
          data-reveal
          className={cn(
            "group relative overflow-hidden rounded-lg bg-surface-sunk lg:aspect-auto lg:h-full",
            MOBILE_ASPECTS[image.mobileAspect ?? "4/3"],
            SPANS[image.span] ?? "lg:col-span-6",
            image.start ? STARTS[image.start] : undefined,
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes={
              image.span >= 12
                ? "(min-width: 1280px) 1100px, 100vw"
                : image.span >= 6
                  ? "(min-width: 1280px) 740px, (min-width: 1024px) 58vw, 100vw"
                  : "(min-width: 1280px) 380px, (min-width: 1024px) 30vw, 100vw"
            }
            style={image.position ? { objectPosition: image.position } : undefined}
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </figure>
      ))}
    </div>
  );
}
