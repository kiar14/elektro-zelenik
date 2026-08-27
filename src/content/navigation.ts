import { company } from "@/content/company";
import { allServicesLink, services, type Service } from "@/content/services";

/**
 * The final site navigation.
 *
 * There is exactly one services architecture, and it lives in
 * `content/services.ts`. The header dropdown, the mobile accordion, the footer
 * column and `/storitve` all read the same seven records from there, so the
 * four surfaces cannot drift apart.
 *
 * Four destinations, plus the phone and the enquiry action on the right. Sončne
 * elektrarne used to sit between Storitve and Reference; it is gone, along with
 * its route, because the company does not present photovoltaics as one of its
 * public services. The row was re-measured around what remains rather than
 * being left with a hole where the fifth item used to be.
 *
 * Subvencije is deliberately absent. The page still exists and is reachable
 * from the footer, but it is a piece of reference information rather than a
 * thing the company sells, so it does not occupy a slot in the primary
 * navigation.
 */

export interface NavItem {
  label: string;
  href: string;
  /** When set, the item opens a disclosure listing these services. */
  menu?: readonly Service[];
}

export const primaryNav: readonly NavItem[] = [
  { label: "Storitve", href: "/storitve", menu: services },
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
