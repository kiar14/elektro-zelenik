import { company } from "@/content/company";

/**
 * How well a service is evidenced.
 *
 * - `confirmed`               present in the company's own current material
 * - `partner`                 delivered together with business partners
 * - `needs-client-verification` registered or advertised elsewhere, but not yet
 *                             confirmed by the client as actively offered
 *
 * Only `confirmed` services are rendered anywhere on the site in this phase.
 */
export type ServiceStatus =
  | "confirmed"
  | "partner"
  | "needs-client-verification";

export type ServiceGroupId = "instalacije" | "energetika" | "servis";

export interface ServiceLink {
  label: string;
  href: string;
  group: ServiceGroupId;
  status: ServiceStatus;
  /** Where the claim comes from, or what still has to be checked. */
  source: string;
}

export const serviceGroups: ReadonlyArray<{
  id: ServiceGroupId;
  label: string;
}> = [
  { id: "instalacije", label: "Elektroinštalacije" },
  { id: "energetika", label: "Energetika" },
  { id: "servis", label: "Servis in svetovanje" },
];

export const services: readonly ServiceLink[] = [
  {
    label: "Elektroinštalacije v novogradnjah",
    href: "/storitve/elektroinstalacije-novogradnje",
    group: "instalacije",
    status: "confirmed",
    source: "Stran O podjetju: navedena kot najobsežnejša dejavnost.",
  },
  {
    label: "Elektroinštalacije",
    href: "/storitve/elektroinstalacije",
    group: "instalacije",
    status: "confirmed",
    source: "Obstoječa spletna stran, seznam storitev.",
  },
  {
    label: "Pametne inštalacije",
    href: "/storitve/pametne-instalacije",
    group: "instalacije",
    status: "confirmed",
    source: "Obstoječa spletna stran: klasične in pametne inštalacije.",
  },
  {
    label: "Obnova elektroinštalacij",
    href: "/storitve/obnova-elektroinstalacij",
    group: "instalacije",
    status: "needs-client-verification",
    source: "Naveden le na profilu MojMojster, ne na lastni spletni strani.",
  },

  {
    label: "Sončne elektrarne",
    href: "/soncne-elektrarne",
    group: "energetika",
    status: "confirmed",
    source: "Stran O podjetju: montaža fotovoltaičnih sistemov.",
  },
  {
    label: "Toplotne črpalke Panasonic",
    href: "/storitve/toplotne-crpalke",
    group: "energetika",
    status: "confirmed",
    source: "Obstoječa spletna stran: dobava, montaža in zagon Panasonic.",
  },
  {
    label: "Baterijski hranilniki",
    href: "/storitve/baterijski-hranilniki",
    group: "energetika",
    status: "needs-client-verification",
    source: "Registrirana dejavnost D35.160, a nikjer ni predstavljena.",
  },
  {
    label: "Polnilnice za električna vozila",
    href: "/storitve/polnilnice-za-elektricna-vozila",
    group: "energetika",
    status: "needs-client-verification",
    source: "Ni nobene navedbe pri podjetju; potrebna potrditev stranke.",
  },

  {
    label: "Servis in priklop naprav",
    href: "/storitve/servis-in-priklop-naprav",
    group: "servis",
    status: "confirmed",
    source: "Obstoječa spletna stran: priklop naprav, popravila, klimati.",
  },
  {
    label: "Video nadzor",
    href: "/storitve/video-nadzor",
    group: "servis",
    status: "confirmed",
    source: "Obstoječa spletna stran, seznam storitev.",
  },
  {
    label: "Računalniške mreže",
    href: "/storitve/racunalniske-mreze",
    group: "servis",
    status: "confirmed",
    source: "Obstoječa spletna stran, seznam storitev.",
  },
  {
    label: "Svetovanje",
    href: "/storitve/svetovanje",
    group: "servis",
    status: "confirmed",
    source: "Obstoječa spletna stran, seznam storitev.",
  },
  {
    label: "Elektro meritve",
    href: "/storitve/elektro-meritve",
    group: "servis",
    status: "needs-client-verification",
    source: "Registrirana dejavnost N71.200, a nikjer ni predstavljena.",
  },
  {
    label: "Alarmni sistemi",
    href: "/storitve/alarmni-sistemi",
    group: "servis",
    status: "partner",
    source:
      "Obstoječa spletna stran navaja izvedbo v sodelovanju s poslovnimi partnerji.",
  },
];

/** The only services that may appear in the interface in this phase. */
export const publishedServices = services.filter(
  (service) => service.status === "confirmed",
);

export interface NavItem {
  label: string;
  href: string;
  /** When set, the item opens a menu of these services instead of only linking. */
  menu?: readonly ServiceLink[];
}

export const primaryNav: readonly NavItem[] = [
  { label: "Storitve", href: "/storitve", menu: publishedServices },
  { label: "Sončne elektrarne", href: "/soncne-elektrarne" },
  { label: "Reference", href: "/reference" },
  { label: "Subvencije", href: "/subvencije" },
  { label: "O podjetju", href: "/o-podjetju" },
  { label: "Kontakt", href: "/kontakt" },
];

export const headerCta = {
  label: "Brezplačna ponudba",
  href: "/povprasevanje",
} as const;

export const headerPhone = {
  label: company.phone.display,
  href: company.phone.href,
  accessibleLabel: `Pokličite ${company.phone.display}`,
} as const;

/** Every route the header can reach, used to generate the phase-1 stubs. */
export const serviceStubSlugs = services
  .map((service) => service.href)
  .filter((href) => href.startsWith("/storitve/"))
  .map((href) => href.replace("/storitve/", ""));
