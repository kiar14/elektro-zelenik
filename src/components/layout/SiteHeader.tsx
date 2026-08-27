import { Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { ActionLink } from "@/components/ui/ActionLink";
import { headerCta, headerPhone, primaryNav } from "@/content/navigation";

/**
 * The global header.
 *
 * Five destinations: Storitve, Reference, FAQ, O podjetju, Kontakt.
 *
 * The navigation is centred on the container's own centre line, not balanced
 * between the logo and the actions. Those two are different widths, so letting
 * flex distribute the row puts the navigation wherever the leftover space
 * happens to fall, which is what made it sit noticeably left of centre. Taking
 * it out of flow and pinning it to 50% is the only way the row reads as
 * centred, because it is the only way it actually is.
 *
 * The logo and the actions keep the flow to themselves and anchor to their own
 * edges. The one thing this costs is that the navigation can no longer push
 * them apart, so the gap either side is checked at `xl`, where it is tightest.
 *
 * The full navigation appears from `xl`. Below that the row cannot hold five
 * Slovenian labels plus both actions without either shrinking the type past
 * comfort or wrapping, so narrower viewports get the sheet in MobileNav, which
 * is designed for them rather than being the desktop menu stacked up.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <Container width="wide">
        <div className="relative flex h-16 items-center gap-4 xl:h-[68px] xl:gap-0">
          <BrandLogo className="mobile-header-logo" />

          <nav
            aria-label="Glavna navigacija"
            className="hidden xl:absolute xl:left-1/2 xl:block xl:-translate-x-1/2"
          >
            <ul className="flex items-center gap-5 2xl:gap-8">
              {primaryNav.map((item) =>
                item.menu ? (
                  <ServicesMenu
                    key={item.href}
                    label={item.label}
                    href={item.href}
                  />
                ) : (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className="inline-flex min-h-11 items-center whitespace-nowrap px-1 text-[0.9375rem] font-medium text-ink-muted transition-colors duration-150 ease-standard hover:text-ink 2xl:text-sm"
                      activeClassName="text-ink"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:gap-3 xl:border-l xl:border-border xl:pl-6 2xl:gap-4 2xl:pl-8">
            <a
              href={headerPhone.href}
              aria-label={headerPhone.accessibleLabel}
              data-mobile-header-control
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-control px-3 text-sm font-semibold text-ink transition-colors duration-150 ease-standard hover:bg-surface max-xl:border max-xl:border-border-strong xl:px-2 max-[419px]:size-11 max-[419px]:justify-center max-[419px]:px-0 2xl:px-3"
            >
              <Phone aria-hidden className="size-[18px] text-brand-strong" />
              <span className="max-[419px]:sr-only">{headerPhone.label}</span>
            </a>

            <ActionLink
              href={headerCta.href}
              variant="solid"
              className="whitespace-nowrap max-xl:hidden"
            >
              {headerCta.label}
            </ActionLink>

            <MobileNav />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}
