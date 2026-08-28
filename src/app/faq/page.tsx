import type { Metadata } from "next";

import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { PageHero } from "@/components/sections/PageHero";
import { faqItems } from "@/content/faq";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/faq",
  title: "Pogosta vprašanja",
  description:
    "Odgovori na vprašanja o obsegu del, poteku izvedbe, svetovanju pred začetkom, servisu in oddaji povpraševanja.",
});

/**
 * Pogosta vprašanja.
 *
 * The page is the shared accordion and nothing else: ten questions, the closing
 * call to action, and no invented second section to give the route more weight
 * than it needs. Every answer traces to something already on the site, so the
 * FAQ cannot drift away from what the service pages say.
 *
 * `FaqSection` renders its own h2, so the page has exactly one h1, in the hero.
 */
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Pogosta vprašanja"
        title="Odgovori na najpogostejša vprašanja"
        lead="Kaj izvajamo, kdaj je pravi trenutek za dogovor in kako poteka sodelovanje."
        crumbs={[{ label: "FAQ" }]}
      />

      <FaqSection
        items={faqItems}
        title="Vprašanja, ki jih dobimo najpogosteje"
        surface="ground"
      />

      <CtaSection
        title="Vašega vprašanja ni na seznamu?"
        body="Povejte, kaj načrtujete, in odgovorimo na konkretno vprašanje o vašem objektu."
      />
    </>
  );
}
