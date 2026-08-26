import { Phone } from "lucide-react";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/layout/Container";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLink } from "@/components/layout/NavLink";
import { ServicesMenu } from "@/components/layout/ServicesMenu";
import { ActionLink } from "@/components/ui/ActionLink";
import { headerCta, headerPhone, primaryNav } from "@/content/navigation";

export function SiteHeader() {
  return (
    <HeaderShell>
      <Container width="wide">
        <div className="flex h-16 items-center gap-4 xl:h-[68px] xl:gap-6 2xl:gap-8">
          <BrandLogo />

          <nav
            aria-label="Glavna navigacija"
            className="ml-auto hidden xl:block"
          >
            <ul className="flex items-center gap-4 2xl:gap-7">
              {primaryNav.map((item) =>
                item.menu ? (
                  <ServicesMenu key={item.href} item={item} />
                ) : (
                  <li key={item.href}>
                    <NavLink
                      href={item.href}
                      className="inline-flex min-h-11 items-center whitespace-nowrap px-1 text-[0.875rem] font-medium text-ink-muted transition-colors duration-150 ease-standard hover:text-ink 2xl:text-sm"
                      activeClassName="text-ink"
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 xl:ml-0 xl:gap-3 xl:border-l xl:border-border xl:pl-5 2xl:gap-4 2xl:pl-8">
            <a
              href={headerPhone.href}
              aria-label={headerPhone.accessibleLabel}
              className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-sm px-3 text-sm font-semibold text-ink transition-colors duration-150 ease-standard hover:bg-surface max-xl:border max-xl:border-border-strong xl:px-2 max-[419px]:size-11 max-[419px]:justify-center max-[419px]:px-0 2xl:px-3"
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
