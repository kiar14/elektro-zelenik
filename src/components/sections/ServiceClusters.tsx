import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { ActionLink } from "@/components/ui/ActionLink";
import { quoteCta } from "@/content/navigation";
import { findService } from "@/content/services";

/**
 * "Več storitev pri enem izvajalcu", on `/storitve`.
 *
 * The point of the section is the relationship between the seven services, and
 * a fourth grid of seven equal cards says nothing about that: the visitor has
 * just scrolled past exactly such a grid. So the argument sits on the left and
 * the seven are regrouped on the right into the three clusters they actually
 * fall into on a building site, each with the one line that explains why its
 * members belong together.
 *
 * Every service appears exactly once and every chip links to its own page, so
 * this is a second route into the same seven rather than a decorative diagram.
 * Nothing that is not one of the seven is named here.
 */
interface Cluster {
  label: string;
  note: string;
  slugs: readonly string[];
}

const CLUSTERS: readonly Cluster[] = [
  {
    label: "Inštalacije in načrtovanje",
    note: "Osnova objekta. Tu se odloči, kaj bo pozneje sploh izvedljivo.",
    slugs: ["elektroinstalacije", "svetovanje"],
  },
  {
    label: "Tehnični sistemi",
    note: "Napeljavo je najlažje izvesti skupaj z elektroinštalacijami, dokler je še dostopna.",
    slugs: ["racunalniske-mreze", "alarmni-sistemi", "video-nadzor"],
  },
  {
    label: "Naprave in vzdrževanje",
    note: "Dobavo, priklop, zagon in poznejši servis prevzame ista ekipa.",
    slugs: ["toplotne-crpalke", "servisiranje"],
  },
];

export function ServiceClusters({ id = "povezano-naslov" }: { id?: string }) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-border bg-surface"
    >
      <Container width="wide" className="py-20 lg:py-28">
        <RevealGroup className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-20">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted">
              <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
              En izvajalec
            </p>

            <h2 id={id} className="mt-5 max-w-[16ch] text-heading text-ink">
              Več storitev pri enem izvajalcu
            </h2>

            <p className="mt-6 max-w-prose text-lead text-ink-muted">
              Kadar se na objektu sreča več sistemov, jih je lažje uskladiti, če
              jih obravnava ena ekipa. Tako se lahko elektroinštalacije,
              omrežja, varnostni sistemi, naprave in servis načrtujejo kot
              celota.
            </p>

            <ActionLink
              href={quoteCta.href}
              variant="solid"
              size="lg"
              className="mt-9 w-full sm:w-auto"
            >
              {quoteCta.label}
            </ActionLink>
          </div>

          <ul className="grid gap-5">
            {CLUSTERS.map((cluster) => (
              <li
                key={cluster.label}
                data-reveal
                className="rounded-lg border border-border bg-ground px-5 py-6 sm:px-8 sm:py-7"
              >
                <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink">
                  <span aria-hidden className="h-px w-6 shrink-0 bg-brand" />
                  {cluster.label}
                </p>

                <p className="mt-3 max-w-prose text-base text-ink-muted">
                  {cluster.note}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {cluster.slugs.map((slug) => {
                    const service = findService(slug);
                    if (!service) return null;

                    return (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="group inline-flex min-h-11 items-center gap-2.5 rounded-cell border border-border bg-surface px-4 text-sm font-medium text-ink transition-colors duration-150 ease-standard hover:border-brand-strong hover:bg-brand-tint"
                      >
                        <service.icon
                          aria-hidden
                          className="size-[19px] shrink-0 text-brand-strong"
                          strokeWidth={1.7}
                        />
                        {service.title}
                        <ArrowRight
                          aria-hidden
                          className="size-4 text-brand-strong opacity-0 transition-[opacity,transform] duration-200 ease-smooth group-hover:translate-x-0.5 group-hover:opacity-100 motion-reduce:transition-none"
                        />
                      </Link>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        </RevealGroup>
      </Container>
    </section>
  );
}
