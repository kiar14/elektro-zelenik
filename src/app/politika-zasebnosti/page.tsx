import { AlertTriangle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { PageHero } from "@/components/sections/PageHero";
import { company } from "@/content/company";
import { pageSeo } from "@/lib/seo";

const TITLE = "Politika zasebnosti";

export const metadata: Metadata = pageSeo({
  path: "/politika-zasebnosti",
  title: TITLE,
  description:
    "Kateri podatki se zbirajo prek te spletne strani, zakaj in kakšne pravice imate.",
});

/**
 * Privacy policy.
 *
 * Written plainly and only about what this website actually does today: it
 * carries a contact form and an enquiry form, and it loads no analytics, no
 * embedded maps, no social widgets and no third-party scripts of any kind.
 *
 * Legal specifics that have not been confirmed are marked rather than invented.
 * TODO_CLIENT: confirm the retention period, name the hosting and email
 * processors once delivery is wired up in the next phase, and have the finished
 * text reviewed before launch.
 */
interface Section {
  heading: string;
  paragraphs: readonly (string | React.ReactNode)[];
  bullets?: readonly string[];
}

/**
 * Placeholders are rendered as an obvious, labelled note rather than as ordinary
 * prose. A `TODO_CLIENT` that reads like a sentence is one that ships; one that
 * looks like an unfinished form field does not.
 */
function isTodo(paragraph: string | React.ReactNode): paragraph is string {
  return typeof paragraph === "string" && paragraph.startsWith("TODO_CLIENT");
}

function TodoNote({ text }: { text: string }) {
  return (
    <p className="mt-4 flex max-w-prose items-start gap-3 rounded-md border border-dashed border-border-strong bg-surface px-4 py-3 text-sm text-ink-muted">
      <AlertTriangle
        aria-hidden
        className="mt-0.5 size-[18px] shrink-0 text-ink-muted"
      />
      <span>
        <span className="font-semibold text-ink">Za dopolnitev. </span>
        {text.replace("TODO_CLIENT: ", "")}
      </span>
    </p>
  );
}

export default function Page() {
  const sections: readonly Section[] = [
    {
      heading: "Upravljavec podatkov",
      paragraphs: [
        `Upravljavec osebnih podatkov, zbranih prek te spletne strani, je ${company.legalName}, ${company.address.full}.`,
        `Matična številka ${company.registration.maticnaStevilka}, davčna številka ${company.registration.davcnaStevilka}.`,
        <>
          Za vprašanja o obdelavi podatkov nas pokličite na{" "}
          <a
            href={company.phone.href}
            className="font-medium text-brand-strong underline underline-offset-4"
          >
            {company.phone.display}
          </a>{" "}
          ali pišite na{" "}
          <a
            href={`mailto:${company.email.primary}`}
            className="font-medium text-brand-strong underline underline-offset-4"
          >
            {company.email.primary}
          </a>
          .
        </>,
      ],
    },
    {
      heading: "Kateri podatki se zbirajo",
      paragraphs: [
        "Podatke zbiramo samo takrat, ko nam jih sami pošljete prek obrazca za povpraševanje ali obrazca na strani Kontakt.",
      ],
      bullets: [
        "Ime",
        "Telefonska številka",
        "E-naslov, če ga vpišete",
        "Kraj, če ga vpišete",
        "Vrsta storitve, ki vas zanima",
        "Vsebina vašega sporočila",
      ],
    },
    {
      heading: "Zakaj podatke obdelujemo",
      paragraphs: [
        "Vpisane podatke uporabimo izključno za to, da odgovorimo na vaše povpraševanje, se z vami dogovorimo o obsegu del in po potrebi pripravimo ponudbo.",
        "Podlaga za obdelavo je vaše soglasje, ki ga date ob oddaji obrazca, in izvedba ukrepov na vašo zahtevo pred sklenitvijo pogodbe.",
        "Vaših podatkov ne uporabljamo za pošiljanje oglasnih sporočil in jih ne prodajamo tretjim osebam.",
      ],
    },
    {
      heading: "Kako dolgo jih hranimo",
      paragraphs: [
        "Povpraševanja hranimo toliko časa, kolikor je potrebno za obravnavo vašega vprašanja in za morebitno izvedbo del, nato jih izbrišemo.",
        "TODO_CLIENT: določite konkretno obdobje hrambe in ga vpišite na to mesto.",
      ],
    },
    {
      heading: "Komu jih posredujemo",
      paragraphs: [
        "Podatkov ne posredujemo tretjim osebam, razen kadar je to nujno za izvedbo dogovorjenih del, na primer poslovnemu partnerju, ki prevzame določen del izvedbe. V takem primeru vas o tem obvestimo vnaprej.",
        "TODO_CLIENT: po vzpostavitvi pošiljanja e-pošte navedite ponudnika gostovanja in ponudnika e-poštne storitve kot obdelovalca.",
      ],
    },
    {
      heading: "Piškotki in sledenje",
      paragraphs: [
        "Ta spletna stran ne uporablja piškotkov za analitiko, oglaševanje ali sledenje. Ne uporabljamo orodij za merjenje obiska, ne vgrajujemo vsebin družbenih omrežij in ob nalaganju strani ne prenašamo skript tretjih oseb.",
        "Zemljevid do našega naslova je navadna povezava, ki se odpre v vaši aplikaciji za zemljevide, in ne vgrajena vsebina, ki bi se nalagala skupaj s stranjo.",
      ],
    },
    {
      heading: "Vaše pravice",
      paragraphs: [
        "V zvezi s svojimi podatki lahko kadar koli uveljavljate spodaj naštete pravice. Za to nam zadostuje sporočilo na naš e-naslov ali telefonski klic.",
      ],
      bullets: [
        "Dostop do podatkov, ki jih hranimo o vas",
        "Popravek netočnih podatkov",
        "Izbris podatkov",
        "Omejitev obdelave",
        "Preklic soglasja",
        "Pritožba pri Informacijskem pooblaščencu Republike Slovenije",
      ],
    },
    {
      heading: "Spremembe te politike",
      paragraphs: [
        "Politiko posodobimo, kadar se spremeni način obdelave podatkov, na primer ko bo na tej strani vzpostavljeno samodejno pošiljanje obrazcev.",
        "TODO_CLIENT: pred objavo naj celotno besedilo pregleda oseba, pristojna za varstvo osebnih podatkov.",
      ],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Pravno"
        title={TITLE}
        lead="Kateri podatki se zbirajo prek te spletne strani, zakaj jih potrebujemo in kakšne pravice imate."
        crumbs={[{ label: TITLE }]}
        actions={false}
      />

      <section className="bg-ground">
        <Container className="py-20 lg:py-24">
          <RevealGroup className="max-w-[46rem]">
            {sections.map((section, index) => (
              <section
                key={section.heading}
                data-reveal
                className={
                  index > 0
                    ? "mt-12 border-t border-border pt-12 lg:mt-14 lg:pt-14"
                    : undefined
                }
              >
                <h2 className="text-2xl font-semibold tracking-[-0.018em] text-ink">
                  {section.heading}
                </h2>

                {section.paragraphs.map((paragraph, position) =>
                  isTodo(paragraph) ? (
                    <TodoNote key={position} text={paragraph} />
                  ) : (
                    <p
                      key={position}
                      className="mt-4 max-w-prose text-base text-ink-muted"
                    >
                      {paragraph}
                    </p>
                  ),
                )}

                {section.bullets ? (
                  <ul className="mt-5 grid gap-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-base text-ink-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <p data-reveal className="mt-12 text-sm text-ink-muted">
              Za vprašanja o obdelavi podatkov je na voljo{" "}
              <Link
                href="/kontakt"
                className="font-medium text-brand-strong underline underline-offset-4"
              >
                stran Kontakt
              </Link>
              .
            </p>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
