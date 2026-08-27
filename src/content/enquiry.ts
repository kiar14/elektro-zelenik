import { services } from "@/content/services";

/**
 * The enquiry vocabulary.
 *
 * One list of values for every form on the site. The homepage quick enquiry
 * carries its selection to `/povprasevanje` as a search param, so the two must
 * agree on the strings, and the seven services must agree with
 * `content/services.ts`. Deriving them here is what guarantees all three.
 *
 * The seven services, plus "Drugo" for everything else. There is no eighth
 * option: an enquiry form must not offer something the company does not
 * publicly present as a service.
 */
export const enquiryOptions = [
  ...services.map((service) => ({
    value: service.slug,
    label: service.title,
  })),
  { value: "drugo", label: "Drugo" },
] as const;

export type EnquiryValue = (typeof enquiryOptions)[number]["value"];

const VALUES = new Set<string>(enquiryOptions.map((option) => option.value));

/** Narrows an untrusted search param to a known option. */
export function toEnquiryValue(value: unknown): EnquiryValue | undefined {
  return typeof value === "string" && VALUES.has(value)
    ? (value as EnquiryValue)
    : undefined;
}

/**
 * The follow-up question worth asking for a given selection, and only where the
 * answer genuinely changes what we would prepare before an appointment.
 *
 * All of these are optional. An enquiry form that interrogates its visitor gets
 * abandoned, so nothing here blocks submission.
 */
export const conditionalQuestion: Partial<Record<EnquiryValue, string>> = {
  elektroinstalacije: "Gre za novogradnjo ali obstoječi objekt?",
  servisiranje: "Za katero napravo gre?",
  "toplotne-crpalke": "Kako je objekt ogrevan zdaj?",
  "racunalniske-mreze": "Za kakšen objekt gre?",
  "alarmni-sistemi": "Za kakšen objekt gre?",
  "video-nadzor": "Za kakšen objekt gre?",
};
