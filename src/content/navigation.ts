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
 * Five destinations, plus the phone and the enquiry action on the right. FAQ
 * sits directly after Reference: both are things a visitor reads before they
 * are ready to enquire, and putting it there keeps the two "about the work"
 * items together and the two "about the company" items after them.
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
  { label: "FAQ", href: "/faq" },
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
