import { company } from "@/content/company";
import { allServicesLink, services, type Service } from "@/content/services";

/**
 * The final site navigation.
 *
 * There is exactly one services architecture, and it lives in
 * `content/services.ts`. The header dropdown, the mobile accordion, the footer
 * column and `/storitve` all read the same seven records from there, so the
 * three surfaces cannot drift apart.
 *
 * Sončne elektrarne is a top-level destination rather than an eighth service:
 * it is a distinct offering with its own page and stays directly visible in the
 * main navigation.
 *
 * Subvencije is deliberately absent. The page still exists and is reachable
 * contextually from Sončne elektrarne and from the footer, but it is a piece of
 * reference information rather than a thing the company sells, so it does not
 * occupy a slot in the primary navigation.
 */

export interface NavItem {
  label: string;
  href: string;
  /** When set, the item opens a disclosure listing these services. */
  menu?: readonly Service[];
}

export const primaryNav: readonly NavItem[] = [
  { label: "Storitve", href: "/storitve", menu: services },
  { label: "Sončne elektrarne", href: "/soncne-elektrarne" },
  { label: "Reference", href: "/reference" },
  { label: "O podjetju", href: "/o-podjetju" },
  { label: "Kontakt", href: "/kontakt" },
];

export const headerCta = {
  label: "Pošlji povpraševanje",
  href: "/povprasevanje",
} as const;

export const headerPhone = {
  label: company.phone.display,
  href: company.phone.href,
  accessibleLabel: `Pokličite ${company.phone.display}`,
} as const;

export { allServicesLink, services };
