/**
 * Subsidies.
 *
 * Every figure on this subject changes: call amounts, eligibility, deadlines
 * and even which body runs the scheme. Nothing here is guessed. The page is
 * built as an architecture that can hold real values once they are checked
 * against the official sources listed below, and until then it says what it
 * does not know rather than inventing a number.
 *
 * `TODO_RESEARCH` marks every value that must be verified against the official
 * source before it is published. `lastUpdated` must be set to the date of that
 * check, and is rendered on the page so a visitor can see how fresh it is.
 */

/** Sentinel for an unverified value. Rendered as a visible gap, never as text
 *  that could be mistaken for a figure. */
export const TODO_RESEARCH = "TODO_RESEARCH" as const;

export type SubsidyValue = string | typeof TODO_RESEARCH;

export function isVerified(value: SubsidyValue): value is string {
  return value !== TODO_RESEARCH;
}

/**
 * ISO date of the last verification against the official sources.
 *
 * TODO_RESEARCH: not yet checked. Set this the day the figures below are
 * confirmed, and re-check before every deploy that touches this page.
 */
export const lastUpdated: string | null = null;

export interface SubsidyProgramme {
  id: string;
  /** What the scheme covers, in the visitor's terms. */
  title: string;
  /** Safe, non-numeric description of the scheme's purpose. */
  summary: string;
  /** The body that runs it. */
  authority: SubsidyValue;
  /** Current call reference. */
  callReference: SubsidyValue;
  /** Amount or rate. Never estimated. */
  amount: SubsidyValue;
  /** Who may apply. */
  eligibility: SubsidyValue;
  /** Closing date or "do porabe sredstev". */
  deadline: SubsidyValue;
  /** Official page the values above were read from. */
  sourceUrl: SubsidyValue;
}

export const programmes: readonly SubsidyProgramme[] = [
  {
    id: "soncna-elektrarna",
    title: "Sončna elektrarna",
    summary:
      "Spodbude za naložbe v samooskrbo z električno energijo iz sončne energije za stanovanjske objekte.",
    authority: TODO_RESEARCH,
    callReference: TODO_RESEARCH,
    amount: TODO_RESEARCH,
    eligibility: TODO_RESEARCH,
    deadline: TODO_RESEARCH,
    sourceUrl: TODO_RESEARCH,
  },
  {
    id: "toplotna-crpalka",
    title: "Toplotna črpalka",
    summary:
      "Spodbude za zamenjavo starega ogrevalnega sistema s toplotno črpalko v stanovanjskih objektih.",
    authority: TODO_RESEARCH,
    callReference: TODO_RESEARCH,
    amount: TODO_RESEARCH,
    eligibility: TODO_RESEARCH,
    deadline: TODO_RESEARCH,
    sourceUrl: TODO_RESEARCH,
  },
];

/**
 * Where the values above have to be read from. These are the bodies that
 * actually publish the calls; nothing on this page may cite anything else.
 *
 * TODO_RESEARCH: confirm that both bodies are still the correct authorities and
 * record the exact call pages before any figure is published.
 */
export const officialSources: readonly {
  label: string;
  note: string;
}[] = [
  {
    label: "Eko sklad, Slovenski okoljski javni sklad",
    note: "Javni pozivi za nepovratne finančne spodbude občanom.",
  },
  {
    label: "Borzen, Center za podpore",
    note: "Podpore proizvodnji električne energije iz obnovljivih virov.",
  },
];

/**
 * What the company will and will not say about subsidies.
 *
 * The company is an installer, not an advisor on public funding, and nothing in
 * its material claims otherwise. This copy is deliberately limited to that.
 */
export const scopeNote =
  "Nismo svetovalci za javne razpise in postopka vloge ne vodimo namesto vas. Pri izvedbi poskrbimo za dela, ki so v naši pristojnosti, glede pogojev posamezne spodbude pa se obrnite neposredno na pristojno institucijo.";
