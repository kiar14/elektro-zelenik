import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { homeServices } from "@/content/homepage";

/**
 * Seven services: two full rows of three and a centred final card.
 *
 * The photograph is the card: it sits on the page background with no container
 * around it and only a small radius, so the images carry the section and the
 * type sits quietly beneath them. Hover adds only restrained elevation. The green Lucide mark next
 * to each title identifies the service; the company logo is not repeated here,
 * because it already appears in the header and the footer.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="storitve-naslov" className="bg-ground">
      <Container width="wide" className="py-20 lg:py-28">
        <SectionHeading
          id="storitve-naslov"
          eyebrow="Storitve"
          title="Kaj izvajamo"
          lead="Pokrivamo elektroinštalacije, servis in povezane tehnične sisteme na objektu."
        />

        <RevealGroup
          stagger={0.055}
          className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-18"
        >
          {homeServices.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              className={
                index === homeServices.length - 1
                  ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-1rem)] xl:col-span-1 xl:col-start-2 xl:mx-0 xl:w-auto"
                  : undefined
              }
            >
              <Link
                href={service.href}
                className="group block transition-transform duration-300 ease-illuminate hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-transparent bg-surface-sunk transition-[border-color,box-shadow] duration-300 ease-illuminate group-hover:border-border-strong group-hover:shadow-raised motion-reduce:transition-none">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1280px) 32vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-600 ease-illuminate group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <div className="mt-7 flex items-center gap-2.5">
                  <service.icon
                    aria-hidden
                    className="size-[25px] shrink-0 text-brand-strong transition-transform duration-300 ease-illuminate group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    strokeWidth={1.7}
                  />
                  <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3 max-w-[44ch] text-base text-ink-muted">
                  {service.body}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-strong">
                  Več
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-250 ease-illuminate group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  />
                </span>
              </Link>
            </article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
