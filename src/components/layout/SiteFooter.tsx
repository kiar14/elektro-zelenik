import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/layout/Container";
import { company } from "@/content/company";
import { headerPhone, publishedServices } from "@/content/navigation";

/**
 * Global footer, on the inverse surface.
 *
 * Carries only what is verified. Opening hours are absent because the website
 * and the Google profile disagree, and social links are absent because no real
 * URLs have been supplied, a dead or disabled link would be worse than none.
 */
const COMPANY_LINKS = [
  { label: "Reference", href: "/reference" },
  { label: "O podjetju", href: "/o-podjetju" },
  { label: "Subvencije", href: "/subvencije" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Povpraševanje", href: "/povprasevanje" },
  { label: "Politika zasebnosti", href: "/politika-zasebnosti" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink">
      <Container width="wide" className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {/* The logo is green on transparent, so it sits correctly on the
                inverse surface without a second asset. */}
            <BrandLogo className="-ml-0.5" />

            <p className="mt-5 max-w-[34ch] text-sm text-on-photo-muted">
              {company.legalName}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3 text-on-photo-muted">
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
                  className="inline-flex min-h-11 items-center gap-3 font-semibold text-on-photo transition-colors duration-150 ease-standard hover:text-brand"
                >
                  <Phone aria-hidden className="size-[18px] text-brand" />
                  {company.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email.primary}`}
                  className="inline-flex min-h-11 items-center gap-3 break-all text-on-photo-muted transition-colors duration-150 ease-standard hover:text-on-photo"
                >
                  <Mail aria-hidden className="size-[18px] shrink-0 text-brand" />
                  {company.email.primary}
                </a>
              </li>
            </ul>
          </div>

          <FooterNav title="Storitve">
            {publishedServices.map((service) => (
              <FooterLink key={service.href} href={service.href}>
                {service.label}
              </FooterLink>
            ))}
          </FooterNav>

          <FooterNav title="Podjetje">
            {COMPANY_LINKS.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterNav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-on-photo-muted sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>
            © {year} {company.legalName}
          </p>
          <p className="sm:text-right">
            Matična št. {company.registration.maticnaStevilka} · Davčna št.{" "}
            {company.registration.davcnaStevilka} · {company.sinceLabel}
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
      <ul className="mt-3">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex min-h-11 items-center text-sm text-on-photo-muted transition-colors duration-150 ease-standard hover:text-on-photo"
      >
        {children}
      </Link>
    </li>
  );
}
