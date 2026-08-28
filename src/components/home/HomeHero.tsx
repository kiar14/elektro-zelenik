import { Phone } from "lucide-react";
import Image from "next/image";

import { HeroIlluminationLayer } from "@/components/home/HeroIlluminationLayer";
import { Container } from "@/components/layout/Container";
import { HeroReveal } from "@/components/motion/HeroReveal";
import { ActionLink } from "@/components/ui/ActionLink";
import { company } from "@/content/company";
import { headerPhone } from "@/content/navigation";

/**
 * Two frames of one photograph: the same house, camera, framing and landscape,
 * differing only in whether the building is lit. Both are 1672x941 WebP masters
 * encoded at the same quality, because a difference in encoding between them
 * would show up as noise inside the blend. Both are
 * positioned by the same `.hero-frame` rule, so their geometry is identical by
 * construction rather than by matching class lists.
 *
 * Measured from the supplied files: the architecture begins at x = 708 of 1672,
 * i.e. 42.3% across the frame. Everything left of that is sky, distant hills and
 * lawn, the negative space the copy sits in. `.hero-copy` and `.hero-scrim` are
 * both sized against that number.
 */
const HERO_FRAMES = {
  unlit: "/images/hero/hero-house-off.webp",
  lit: "/images/hero/hero-house-on.webp",
  alt: "Sodobna enodružinska hiša ob mraku z osvetljeno fasado in okni.",
  sizes: "100vw",
  /** One value for both frames; a mismatch here would show in the blend. */
  quality: 82,
} as const;

export function HomeHero() {
  return (
    // The header is lifted out of the flow on this route, so this section is
    // the first thing in the document at every width and the photograph runs to
    // the very top of the page with the navigation floating over it. See
    // `.site-header[data-homepage]` in globals.css.
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

      {/* From `lg` the copy is optically centred in the frame rather than
          anchored to its foot, so the header no longer being in the flow would
          otherwise lift it by half the rail's height. The top padding carries
          that height so the copy lands on exactly the pixel it did before:

            lg   65px header + the approved 80px  = 145px = 9.0625rem
            xl   69px header + the approved 128px = 197px = 12.3125rem

          The bottom padding is untouched, because the foot of the hero is
          still the top of the trust strip. */}
      <Container
        width="wide"
        className="home-hero-height relative flex items-end pb-[4.5rem] sm:pb-16 lg:items-center lg:pt-[9.0625rem] lg:pb-12 xl:pt-[12.3125rem] xl:pb-20"
      >
        <HeroReveal>
          <p
            data-hero-item
            className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-on-photo-muted"
          >
            <span
              aria-hidden
              data-hero-rule
              className="h-px w-9 shrink-0 origin-left bg-brand"
            />
            {company.address.city} · {company.sinceLabel}
          </p>

          <h1
            id="hero-title"
            data-hero-title
            className="mobile-hero-title mt-5 text-display text-on-photo"
          >
            <span className="block sm:inline">Elektroinštalacije</span>{" "}
            <span className="block sm:inline">in energetske</span>{" "}
            <span className="block sm:inline">rešitve</span>
          </h1>

          <p
            data-hero-item
            className="mt-6 max-w-[40ch] text-[1rem] leading-[1.42] text-on-photo-muted sm:max-w-none sm:text-lead sm:leading-[1.55]"
          >
            Elektroinštalacije, servis in tehnične rešitve, od načrtovanja do
            izvedbe.
          </p>

          {/* Container query, not a breakpoint: the copy column is sized
              against the architecture line, so how much room the actions have
              depends on the column, not on the viewport. */}
          <div
            data-hero-item
            className="mt-9 flex flex-col gap-3 @min-[28.5rem]:flex-row @min-[28.5rem]:items-center"
          >
            <ActionLink
              href="/povprasevanje"
              variant="solid"
              size="lg"
              data-hero-action
              className="w-full @min-[28.5rem]:w-auto @min-[28.5rem]:whitespace-nowrap"
            >
              Pridobite ponudbo
            </ActionLink>

            {/* The number itself is one tap away in the header and is spelled
                out on Kontakt; here the action is the instruction. */}
            <ActionLink
              href={headerPhone.href}
              variant="outline"
              size="lg"
              aria-label={headerPhone.accessibleLabel}
              data-hero-action
              className="w-full border-white/45 bg-white/10 text-on-photo shadow-none hover:border-white/80 hover:bg-white/18 @min-[28.5rem]:w-auto @min-[28.5rem]:whitespace-nowrap"
            >
              <Phone aria-hidden className="size-[18px] text-brand" />
              Pokličite nas
            </ActionLink>
          </div>
        </HeroReveal>
      </Container>
    </section>
  );
}
