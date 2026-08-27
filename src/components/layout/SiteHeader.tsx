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
 * Four destinations. Removing Sončne elektrarne was not a deletion: the row was
 * re-measured around what remains rather than left with a hole where the fifth
 * item used to be.
 *
 * The navigation is now anchored beside the wordmark instead of being pushed to
 * the right of the row. With five items a right-anchored nav left a workable
 * gap after the logo; with four it left roughly 240px of dead space at 1280,
 * and the nav read as an island floating in the middle of the header. Anchored
 * left, the only slack in the row sits between the navigation and the actions,
 * which is where a header is supposed to carry it. The gutters between items
 * were opened a step at the same time, because there is now room for them.
 *
 * The full navigation appears from `xl`. Below that the row cannot hold four
 * Slovenian labels plus both actions without either shrinking the type past
 * comfort or wrapping, so narrower viewports get the sheet in MobileNav, which
 * is designed for them rather than being the desktop menu stacked up.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <Container width="wide">
        <div className="flex h-16 items-center gap-4 xl:h-[68px] xl:gap-8">
          <BrandLogo />

          <nav
            aria-label="Glavna navigacija"
            className="hidden xl:ml-10 xl:block 2xl:ml-14"
          >
            <ul className="flex items-center gap-6 2xl:gap-9">
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
