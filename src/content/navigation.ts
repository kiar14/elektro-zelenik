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

/**
 * The two labels the same destination is asked for under.
 *
 * `headerCta` is the standing invitation in the navigation and at the foot of
 * the mobile sheet: it names the thing the visitor sends.
 *
 * `quoteCta` is what a page asks for once it has described a piece of work: it
 * names the thing the visitor gets back. Page heroes and the closing calls to
 * action use it.
 *
 * Two labels, deliberately, and each one is used in exactly one role. Which
 * label appears where is never decided per page.
 */
export const headerCta = {
  label: "Pošlji povpraševanje",
  href: "/povprasevanje",
} as const;

export const quoteCta = {
  label: "Pridobite ponudbo",
  href: "/povprasevanje",
} as const;

/** The secondary, direct path, on any marketing section. */
export const callCta = {
  label: "Pokličite nas",
  href: company.phone.href,
} as const;

export const headerPhone = {
  label: company.phone.display,
  href: company.phone.href,
  accessibleLabel: `Pokličite ${company.phone.display}`,
} as const;

export { allServicesLink, services };
