import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { BenefitGrid } from "@/components/sections/BenefitGrid";
import { CenteredHeading } from "@/components/ui/SectionHeading";
import { whyCards } from "@/content/homepage";

/**
 * Six practical reasons to choose the company. The main statistics already
 * live beneath the hero, so this section focuses on customer-facing benefits.
 *
 * The heading and the cards are the shared centred heading and the shared
 * benefit-card family; `/o-podjetju` renders the same six through the same two
 * components rather than restating them.
 */
export function WhyZelenik() {
  return (
    <section aria-labelledby="zakaj-naslov" className="bg-ground">
      <Container width="wide" className="py-20 lg:py-24">
        <CenteredHeading
          id="zakaj-naslov"
          eyebrow="Zakaj izbrati nas"
          title="Izkušnje, strokovno svetovanje in zanesljiva izvedba"
          titleWidth="wide"
          lead="Z elektroinštalacijami se ukvarjamo od leta 2000. Strankam pomagamo pri izbiri ustrezne rešitve, dogovorjena dela izvedemo kakovostno in poskrbimo, da je pot od prvega dogovora do zaključka čim bolj jasna."
        >
          <Link
            href="/o-podjetju"
            className="group mt-7 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-brand-strong transition-colors duration-150 ease-standard hover:text-ink"
          >
            Več o podjetju
            <ArrowRight
              aria-hidden
              className="size-[18px] transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
            />
          </Link>
        </CenteredHeading>

        <BenefitGrid cards={whyCards} className="mt-12 lg:mt-14" />
      </Container>
    </section>
  );
}
