import Image from "next/image";

import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ActionLink } from "@/components/ui/ActionLink";
import { references } from "@/content/homepage";

/**
 * Exactly three projects, one of each kind: commercial, residential,
 * agricultural. The point of the section is range, so no building appears
 * twice and no illustrative marketing imagery appears at all.
 *
 * The commercial photograph carries its photographer's watermark. It is left
 * intact deliberately, see the TODO in content/homepage.ts.
 */
export function ReferencesSection() {
  const [feature, ...supporting] = references;

  return (
    <section aria-labelledby="reference-naslov" className="bg-ground">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading
            id="reference-naslov"
            eyebrow="Reference"
            title="Izvedeni objekti"
            lead="Poslovni, stanovanjski in kmetijski objekti. Vse fotografije so z naših gradbišč in dokončanih objektov."
          />
          <ActionLink
            href="/reference"
            variant="outline"
            className="max-lg:hidden"
          >
            Oglejte si vse reference
          </ActionLink>
        </div>

        <RevealGroup
          stagger={0.09}
          className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-2 lg:gap-10"
        >
          {/* The widest photograph leads, and it is the only landscape one. */}
          <ReferenceCard
            item={feature}
            data-reveal
            className="lg:col-span-2"
            aspect="aspect-[16/10] lg:aspect-[21/9]"
            sizes="(min-width: 1024px) 76vw, 100vw"
            lead
          />

          {supporting.map((item) => (
            <ReferenceCard
              key={item.src}
              item={item}
              data-reveal
              aspect="aspect-[4/3] lg:aspect-[3/2]"
              sizes="(min-width: 1024px) 37vw, 100vw"
            />
          ))}
        </RevealGroup>

        <ActionLink
          href="/reference"
          variant="outline"
          size="lg"
          className="mt-12 w-full lg:hidden"
        >
          Oglejte si vse reference
        </ActionLink>
      </Container>
    </section>
  );
}

function ReferenceCard({
  item,
  aspect,
  sizes,
  className,
  lead,
  ...rest
}: {
  item: (typeof references)[number];
  aspect: string;
  sizes: string;
  className?: string;
  lead?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <figure className={className} {...rest}>
      <div
        className={`group relative overflow-hidden rounded-lg bg-surface-sunk ${aspect}`}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>

      <figcaption className="mt-5">
        <span className="text-eyebrow font-semibold uppercase text-brand-strong">
          {item.category}
        </span>
        <span
          className={`mt-2 block font-semibold tracking-[-0.015em] text-ink ${
            lead ? "text-2xl" : "text-xl"
          }`}
        >
          {item.title}
        </span>
        {item.note ? (
          <span className="mt-1.5 block text-base text-ink-muted">
            {item.note}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
