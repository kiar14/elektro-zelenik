import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  bodyEndTone,
  ContentSections,
} from "@/components/sections/ContentSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { findService, relatedServices, services } from "@/content/services";

/**
 * The seven service pages.
 *
 * One route, seven records. Every page is built from the same shared sections
 * in the same order, so the design cannot drift between them, and the only
 * thing that differs from page to page is content: the copy, the number of
 * process steps and whether there are questions worth answering.
 *
 * Anything not in `content/services.ts` is a 404 rather than an empty page.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: "Storitev" };

  return { title: service.title, description: service.lead };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const related = relatedServices(service);

  /**
   * The body alternates its own surfaces, so what follows has to take whichever
   * tone the body did not end on. Without this a four-section page would run a
   * tonal band straight into the process band and read as one long block.
   */
  const endsOnSurface = bodyEndTone(service.sections) === "surface";
  const processSurface = endsOnSurface ? "ground" : "surface";
  const faqSurface = endsOnSurface ? "surface" : "ground";

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.h1}
        lead={service.lead}
        image={service.image}
        imageAlt={service.alt}
        crumbs={[
          { label: "Storitve", href: "/storitve" },
          { label: service.title },
        ]}
      />

      <ContentSections sections={service.sections} />

      {service.process ? (
        <ProcessSteps
          id="postopek-naslov"
          eyebrow={service.process.eyebrow}
          title={service.process.title}
          steps={service.process.steps}
          surface={processSurface}
          className={processSurface === "ground" ? "border-t border-border" : undefined}
        />
      ) : null}

      {service.faq ? (
        // Takes whichever tone the process band did not, so the two never
        // stack as one undifferentiated band.
        <FaqSection
          items={service.faq}
          title={`Pogosta vprašanja, ${service.title.toLowerCase()}`}
          surface={service.process ? faqSurface : processSurface}
        />
      ) : null}

      <RelatedServices items={related} />

      <CtaSection
        title="Se dogovorimo za ogled?"
        body="Opišite objekt in kaj načrtujete. Uskladimo obseg del in pripravimo naslednji korak."
      />
    </>
  );
}
