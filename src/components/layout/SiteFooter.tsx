import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";
import { allServicesLink, headerPhone, services } from "@/content/navigation";

/**
 * Global footer, on the inverse surface.
 *
 * Same navigation architecture as the rest of the site: the Storitve column is
 * generated from the seven canonical services, so it cannot list something the
 * header does not, and there is no route here that does not exist.
 *
 * Carries only what is verified. Opening hours are absent because the website
 * and the Google profile disagree, and social links are absent because no real
 * URLs have been supplied, a dead or disabled link would be worse than none.
 *
 * Subvencije appears once, in the bottom row rather than in a navigation
 * column. The page is reference information rather than something the company
 * sells, and its placement says so.
 */
const COMPANY_LINKS = [
  { label: "Reference", href: "/reference" },
  { label: "O podjetju", href: "/o-podjetju" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Povpraševanje", href: "/povprasevanje" },
  { label: "Politika zasebnosti", href: "/politika-zasebnosti" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <Container width="wide" className="py-14 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            {/* The logo is green on transparent, so it sits correctly on the
                inverse surface without a second asset. */}
            <BrandLogo className="-ml-0.5" />

            <p className="mt-5 max-w-[34ch] text-sm text-on-photo-muted">
              {company.legalName}
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-3 py-2 text-on-photo-muted">
                <MapPin
                  aria-hidden
                  className="mt-0.5 size-[18px] shrink-0 text-brand"
                />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                </span>
              </li>
              <li>
                <a
                  href={company.phone.href}
                  aria-label={headerPhone.accessibleLabel}
                  className="inline-flex min-h-11 items-center gap-3 text-base font-semibold text-on-photo transition-colors duration-150 ease-standard hover:text-brand"
                >
                  <Phone aria-hidden className="size-[18px] text-brand" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email.primary}`}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-sm text-on-photo-muted transition-colors duration-150 ease-standard hover:text-on-photo"
                >
                  <Mail
                    aria-hidden
                    className="size-[18px] shrink-0 text-brand"
                  />
                  {company.email.primary}
                </a>
              </li>
            </ul>
          </div>

          <FooterNav title="Storitve">
            {/* Two sub-columns from sm to lg, where a single stack of eight
                would push the next column an entire screen down. */}
            <ul className="mt-3 grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              {services.map((service) => (
                <FooterLink key={service.href} href={service.href}>
                  {service.title}
                </FooterLink>
              ))}
              <FooterLink href={allServicesLink.href} emphasis>
                {allServicesLink.label}
              </FooterLink>
            </ul>
          </FooterNav>

          <FooterNav title="Podjetje">
            <ul className="mt-3">
              {COMPANY_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </FooterNav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-sm text-on-photo-muted lg:mt-16 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {company.legalName}
          </p>

          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 lg:justify-end">
            <span>Matična št. {company.registration.maticnaStevilka}</span>
            <span aria-hidden>·</span>
            <span>Davčna št. {company.registration.davcnaStevilka}</span>
            <span aria-hidden>·</span>
            <Link
              href="/subvencije"
              className="inline-flex min-h-11 items-center underline decoration-white/25 underline-offset-4 transition-colors duration-150 ease-standard hover:text-on-photo hover:decoration-current"
            >
              Subvencije
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterNav({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-eyebrow font-semibold uppercase text-on-photo-muted">
        {title}
      </h2>
      {children}
    </nav>
  );
}

function FooterLink({
  href,
  emphasis,
  children,
}: {
  href: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex min-h-11 items-center text-sm transition-colors duration-150 ease-standard hover:text-on-photo ${
          emphasis
            ? "font-semibold text-brand"
            : "text-on-photo-muted"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}
