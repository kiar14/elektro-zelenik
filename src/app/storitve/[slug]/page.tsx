import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentSections } from "@/components/sections/ContentSections";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { findService, relatedServices, services } from "@/content/services";
import { pageSeo } from "@/lib/seo";

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

  return pageSeo({
    path: service.href,
    title: service.title,
    description: service.lead,
  });
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

      {/* The page's one dark anchor. Every service page is warm stone and
          white from the breadcrumbs down; this is the band that gives it a
          structure rather than a sequence. */}
      {service.process ? (
        <ProcessSteps
          id="postopek-naslov"
          eyebrow={service.process.eyebrow}
          title={service.process.title}
          steps={service.process.steps}
          surface="graphite"
        />
      ) : null}

      {service.faq ? (
        <FaqSection
          items={service.faq}
          title={`Pogosta vprašanja, ${service.title.toLowerCase()}`}
          surface="surface"
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
