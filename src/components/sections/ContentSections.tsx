import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import {
  TechnicalChips,
  TechnicalGrid,
} from "@/components/sections/TechnicalGrid";
import type { ServiceSection } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * The editorial body of a service page.
 *
 * Two problems were fixed here at once.
 *
 * The first was tonal. The body alternated ground and warm stone strictly by
 * index, which produced the white / beige / white / beige rhythm that made
 * every service page look like the same page with different words in it. Tone
 * is now chosen by what a block is doing: scope grids and side-by-side columns
 * sit on white, and the one long-form argument on the page takes the warm band.
 * Most pages therefore have exactly one stone section rather than three, and
 * the dark weight comes from the process band below instead.
 *
 * The second was density. Every block used to open at the same distance from
 * the one above it and close at the same distance from the one below, so four
 * blocks of very different importance were given identical space. A scope grid
 * and a two-column pair are now noticeably tighter than the argument block,
 * which is the one thing on the page that is allowed to breathe.
 *
 * Where two neighbouring blocks share a tone they are separated by a hairline
 * rather than by a change of colour. That is deliberate: a border is a quieter
 * way to say "new section" than a band, and the page needs fewer bands.
 */

type Tone = "ground" | "surface";

const TONES: Record<Tone, string> = {
  ground: "bg-ground",
  surface: "bg-surface",
};

/**
 * Tone by role, not by index.
 *
 * The first block is always white, because every service page opens on the warm
 * stone hero and a stone block directly under it would read as one band running
 * from the breadcrumbs to the middle of the page. After that the long-form
 * argument takes the warm band and everything else stays white. A section may
 * name its own surface where a page's particular sequence needs the warm band
 * somewhere else; alarmni-sistemi is the one page that does.
 */
function toneFor(
  section: ServiceSection,
  index: number,
  previous: Tone | null,
): Tone {
  if (section.surface) return section.surface;
  if (index === 0) return "ground";
  if ((section.layout ?? "feature") === "editorial" && previous !== "surface") {
    return "surface";
  }
  return "ground";
}

/**
 * Resolves every block's tone in one pass, because each one depends on the one
 * before it. Kept outside the component so nothing is mutated during render.
 */
function resolveTones(sections: readonly ServiceSection[]) {
  return sections.reduce<
    { section: ServiceSection; tone: Tone; repeatsTone: boolean }[]
  >((accumulated, section, index) => {
    const previous = accumulated[index - 1]?.tone ?? null;
    const tone = toneFor(section, index, previous);
    accumulated.push({ section, tone, repeatsTone: previous === tone });
    return accumulated;
  }, []);
}

export function ContentSections({
  sections,
  className,
}: {
  sections: readonly ServiceSection[];
  className?: string;
}) {
  const resolved = resolveTones(sections);

  return (
    <>
      {resolved.map(({ section, tone, repeatsTone }, index) => (
        <Block
          key={section.title}
          section={section}
          tone={tone}
          className={cn(
            index === 0 ? className : undefined,
            // A change of tone already reads as a new section. Where the tone
            // is the same, one hairline does the same job without adding
            // another band to the page.
            repeatsTone && "border-t border-border",
            // The body always closes against whatever follows it.
            index === resolved.length - 1 && "border-b border-border",
          )}
        />
      ))}
    </>
  );
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
  // The argument block is the one allowed the full band, and only when it
  // actually carries the pulled-out line that earns it. An editorial block
  // that is a heading and one paragraph gets the tighter band like everything
  // else, otherwise it reads as a section with a hole in the bottom of it.
  const roomy = layout === "editorial" && Boolean(section.body2);

  return (
    <section className={cn(TONES[tone], className)}>
      <Container
        width="wide"
        className={roomy ? "py-20 lg:py-28" : "py-16 lg:py-20"}
      >
        <RevealGroup>
          {layout === "feature" ? <Scope section={section} /> : null}
          {layout === "list" ? <Scope section={section} stacked /> : null}
          {layout === "editorial" ? <Editorial section={section} /> : null}
          {layout === "split" ? <Split section={section} /> : null}
          {layout === "note" ? <Note section={section} /> : null}
        </RevealGroup>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------
 * feature / list - what the service covers
 * ---------------------------------------------------------------------- */

/**
 * The scope block: what the service covers, as a technical grid, under a head
 * that comes in two shapes.
 *
 * `feature` sets the heading on the left and the short explanation on the
 * right, on one baseline. That is the shape a page-opening statement wants: two
 * columns of unequal weight, rather than a heading stacked above a paragraph
 * that then runs the full width of the page, which is the shape a document has.
 *
 * `stacked` is the quieter one, for a block that qualifies something already
 * argued above it rather than opening the page. It carries the brand rule and
 * holds both heading and explanation to a narrow measure.
 */
function Scope({
  section,
  stacked = false,
}: {
  section: ServiceSection;
  stacked?: boolean;
}) {
  // Four short items read better as a square than as a row of three with one
  // cell stretched across the gap. Every other count takes three columns.
  const columns = section.bullets?.length === 4 ? 2 : 3;

  return (
    <>
      {stacked ? (
        <div data-reveal className="max-w-[52rem]">
          <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
          <h2 className="text-subheading text-ink">{section.title}</h2>
          {section.body ? (
            <p className="mt-6 max-w-[58ch] text-lead text-ink-muted">
              {section.body}
            </p>
          ) : null}
        </div>
      ) : (
        <div
          data-reveal
          className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:items-end lg:gap-16"
        >
          <h2 className="max-w-[16ch] text-subheading text-ink">
            {section.title}
          </h2>

          {section.body ? (
            <p className="max-w-[58ch] text-lead text-ink-muted">
              {section.body}
            </p>
          ) : null}
        </div>
      )}

      {section.bullets ? (
        <div data-reveal>
          <TechnicalGrid
            items={section.bullets}
            columns={columns}
            className="mt-10 lg:mt-12"
          />
        </div>
      ) : null}

      {section.body2 ? (
        <p
          data-reveal
          className="mt-10 max-w-[58ch] text-base text-ink-muted lg:mt-12"
        >
          {section.body2}
        </p>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * editorial - one argument, and the line it turns on
 * ---------------------------------------------------------------------- */

/**
 * The page's long-form block. The heading holds a narrow left column and stays
 * put while the argument scrolls past it; the first paragraph carries the
 * argument and the second is the line it turns on, pulled out at larger type
 * against a brand rule.
 *
 * No card. The whole point of the block is that a statement can be given weight
 * by type, measure and one rule, which is a great deal quieter than putting a
 * paragraph inside a rounded rectangle and calling that emphasis.
 */
function Editorial({ section }: { section: ServiceSection }) {
  return (
    <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
      <div data-reveal>
        <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
        <h2 className="max-w-[15ch] text-subheading text-ink lg:sticky lg:top-32">
          {section.title}
        </h2>
      </div>

      <div data-reveal>
        {section.body ? (
          <p className="max-w-[62ch] text-lead text-ink-muted">
            {section.body}
          </p>
        ) : null}

        {section.body2 ? (
          <p className="mt-9 max-w-[52ch] border-l-2 border-brand pl-6 text-xl leading-[1.45] text-ink sm:pl-8">
            {section.body2}
          </p>
        ) : null}

        {section.bullets ? (
          <TechnicalChips items={section.bullets} className="mt-9" />
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
 * split - two positions of equal weight
 * ---------------------------------------------------------------------- */

/**
 * Two paragraphs read side by side, divided by one vertical rule.
 *
 * Where the two positions are named things rather than two halves of one
 * thought, each column carries its own number and title. That numbering is the
 * only ornament in the block: no cards, no panels, no tinted background. A rule
 * between two columns is enough to say they are a pair, and it is the cheapest
 * possible way to say it.
 */
function Split({ section }: { section: ServiceSection }) {
  const columns = section.columns;

  return (
    <>
      <div data-reveal className="max-w-[46rem]">
        <span aria-hidden className="mb-6 block h-px w-10 bg-brand" />
        <h2 className="text-subheading text-ink">{section.title}</h2>
      </div>

      <div
        data-reveal
        className="mt-10 grid border-t border-border pt-10 md:grid-cols-2 lg:mt-12 lg:pt-12"
      >
        {columns
          ? columns.map((column, index) => (
              <div
                key={column.title}
                className={cn(
                  index === 0 && "md:pr-10 lg:pr-16",
                  index > 0 &&
                    "max-md:mt-9 max-md:border-t max-md:border-border max-md:pt-9 md:border-l md:border-border md:pl-10 lg:pl-16",
                )}
              >
                <p className="font-display text-lg font-semibold tabular-nums text-brand-strong">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.018em] text-ink">
                  {column.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-lead text-ink-muted">
                  {column.body}
                </p>
              </div>
            ))
          : (
              <>
                {section.body ? (
                  <p className="max-w-[46ch] text-lead text-ink-muted md:pr-10 lg:pr-16">
                    {section.body}
                  </p>
                ) : null}
                {section.body2 ? (
                  <p className="max-w-[46ch] text-lead text-ink-muted max-md:mt-9 max-md:border-t max-md:border-border max-md:pt-9 md:border-l md:border-border md:pl-10 lg:pl-16">
                    {section.body2}
                  </p>
                ) : null}
              </>
            )}
      </div>

      {section.bullets ? (
        <div data-reveal>
          <TechnicalGrid
            items={section.bullets}
            columns={section.bullets.length === 4 ? 2 : 3}
            className="mt-12"
          />
        </div>
      ) : null}
    </>
  );
}

/* -------------------------------------------------------------------------
 * note - a short aside
 * ---------------------------------------------------------------------- */

/**
 * One short paragraph that has to be said but does not carry the page.
 *
 * It used to be a wide bordered panel with a 56px tinted disc and a 26px icon
 * in it, which gave the least important block on the page the loudest object on
 * it. It is now a heading and a paragraph held to a narrow measure against a
 * brand rule, in a shallow section, so it reads as an aside because it is laid
 * out like one.
 */
function Note({ section }: { section: ServiceSection }) {
  return (
    <div
      data-reveal
      className="max-w-[46rem] border-l-2 border-brand pl-6 sm:pl-8"
    >
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
  );
}
