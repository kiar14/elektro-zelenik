import { Phone } from "lucide-react";
import Image from "next/image";

import { HeroIlluminationLayer } from "@/components/home/HeroIlluminationLayer";
import { Container } from "@/components/layout/Container";
import { ActionLink } from "@/components/ui/ActionLink";
import { company } from "@/content/company";
import { headerPhone } from "@/content/navigation";

/**
 * Two frames of one photograph: the same house, camera, framing and landscape,
 * differing only in whether the building is lit. Both are 1672x941 and are
 * positioned by the same `.hero-frame` rule, so their geometry is identical by
 * construction rather than by matching class lists.
 *
 * Measured from the supplied files: the architecture begins at x = 708 of 1672,
 * i.e. 42.3% across the frame. Everything left of that is sky, distant hills and
 * lawn, the negative space the copy sits in. `.hero-copy` and `.hero-scrim` are
 * both sized against that number.
 */
const HERO_FRAMES = {
  unlit: "/images/hero/hero-house-off.png",
  lit: "/images/hero/hero-house-on.png",
  alt: "Sodobna enodružinska hiša ob mraku z osvetljeno fasado in okni.",
  sizes: "100vw",
  /** One value for both frames; a mismatch here would show in the blend. */
  quality: 82,
} as const;

export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative bg-ink">
      {/* The photograph is the hero. It fills the section edge to edge; the copy
          sits over it, never beside it. */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={HERO_FRAMES.unlit}
          alt={HERO_FRAMES.alt}
          fill
          priority
          quality={HERO_FRAMES.quality}
          sizes={HERO_FRAMES.sizes}
          className="hero-frame"
        />
        <HeroIlluminationLayer
          src={HERO_FRAMES.lit}
          sizes={HERO_FRAMES.sizes}
          quality={HERO_FRAMES.quality}
        />
        <div aria-hidden className="hero-scrim absolute inset-0" />
      </div>

      <Container
        width="wide"
        className="home-hero-height relative flex items-end pb-12 sm:pb-16 lg:items-center lg:pt-20 lg:pb-12 xl:pt-32 xl:pb-20"
      >
        <div data-surface="photo" className="hero-copy @container">
          <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-on-photo-muted">
            <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
            {company.address.city} · {company.sinceLabel}
          </p>

          <h1 id="hero-title" className="mt-5 text-display text-on-photo">
            Elektroinštalacije in energetske rešitve
          </h1>

          <p className="mt-6 text-lead text-on-photo-muted">
            Elektroinštalacije in sončne elektrarne, od načrtovanja do
            priklopa.
          </p>

          {/* Container query, not a breakpoint: the copy column is sized
              against the architecture line, so how much room the actions have
              depends on the column, not on the viewport. */}
          <div className="mt-9 flex flex-col gap-3 @min-[28.5rem]:flex-row @min-[28.5rem]:items-center">
            <ActionLink
              href="/povprasevanje"
              variant="solid"
              size="lg"
              className="w-full @min-[28.5rem]:w-auto @min-[28.5rem]:whitespace-nowrap"
            >
              Brezplačen ogled in ponudba
            </ActionLink>

            <ActionLink
              href={headerPhone.href}
              variant="outline"
              size="lg"
              aria-label={headerPhone.accessibleLabel}
              className="w-full border-white/50 bg-white/10 text-on-photo hover:border-white hover:bg-white/20 @min-[28.5rem]:w-auto @min-[28.5rem]:whitespace-nowrap"
            >
              <Phone aria-hidden className="size-[18px] text-brand" />
              {headerPhone.label}
            </ActionLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
