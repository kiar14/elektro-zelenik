import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/home/SectionHeading";
import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { homeServices } from "@/content/homepage";

/**
 * Six services, three and three.
 *
 * The photograph is the card: it sits on the page background with no container
 * around it, no shadow and only a small radius, so the images carry the
 * section and the type sits quietly beneath them. The green Lucide mark next
 * to each title identifies the service; the company logo is not repeated here,
 * because it already appears in the header and the footer.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="storitve-naslov" className="bg-ground">
      <Container className="py-20 lg:py-28">
        <SectionHeading
          id="storitve-naslov"
          eyebrow="Storitve"
          title="Kaj izvajamo"
          lead="Pokrivamo elektroinštalacije, servis in povezane tehnične sisteme na objektu."
        />

        <RevealGroup
          stagger={0.055}
          className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10"
        >
          {homeServices.map((service) => (
            <article key={service.href} data-reveal>
              <Link href={service.href} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-surface-sunk">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-standard group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <div className="mt-6 flex items-center gap-2.5">
                  <service.icon
                    aria-hidden
                    className="size-[22px] shrink-0 text-brand-strong"
                    strokeWidth={1.7}
                  />
                  <h3 className="text-xl font-semibold tracking-[-0.018em] text-ink">
                    {service.title}
                  </h3>
                </div>

                <p className="mt-3 max-w-prose text-base text-ink-muted">
                  {service.body}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-strong">
                  Več
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-200 ease-standard group-hover:translate-x-0.5"
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
