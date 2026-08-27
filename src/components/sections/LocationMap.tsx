import { ExternalLink, MapPin } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { RevealGroup } from "@/components/motion/RevealGroup";
import { company } from "@/content/company";

/**
 * The map that closes O podjetju.
 *
 * No API key, and none is needed: `output=embed` is the public form of the
 * Google Maps embed, which is also exactly what the company's current website
 * uses on its own contact page. Nothing here has to be provisioned, billed or
 * kept secret.
 *
 * A server component with a plain iframe. The frame is `loading="lazy"` and
 * sits below the fold, so the browser does not fetch it until the visitor
 * scrolls near it, which is where the performance saving actually comes from.
 * There is no click-to-load gate: the map simply appears.
 *
 * It sits inside the content container rather than running edge to edge. A
 * full-bleed map reads as a page footer rather than as part of the page, and
 * the rounded, bordered frame is the same treatment every other photograph and
 * panel on the site already uses.
 */
const QUERY = encodeURIComponent(company.address.full);
const EMBED_SRC = `https://www.google.com/maps?q=${QUERY}&hl=sl&z=15&output=embed`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${QUERY}`;

export function LocationMap({ id = "lokacija-naslov" }: { id?: string }) {
  return (
    <section
      aria-labelledby={id}
      className="border-t border-border bg-surface"
    >
      <Container className="py-16 lg:py-20">
        <RevealGroup>
          <div
            data-reveal
            className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5"
          >
            <div>
              <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-ink-muted">
                <span aria-hidden className="h-px w-9 shrink-0 bg-brand" />
                Lokacija
              </p>
              <h2 id={id} className="mt-4 text-subheading text-ink">
                Kje nas najdete
              </h2>
              <p className="mt-3 flex items-start gap-2.5 text-lead text-ink-muted">
                <MapPin
                  aria-hidden
                  className="mt-1.5 size-[18px] shrink-0 text-brand-strong"
                />
                {company.address.full}
              </p>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-control px-4 font-sans text-[0.9375rem] font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-smooth hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Odpri v Google Zemljevidih
              <ExternalLink aria-hidden className="size-4 text-brand-strong" />
            </a>
          </div>

          {/* Wide and shallow. At the content width this is roughly 3:1, which
              is the proportion a location map wants: enough context around the
              pin, without a square of countryside nobody needs. */}
          <div
            data-reveal
            className="mt-9 h-[260px] overflow-hidden rounded-lg border border-border bg-surface-sunk sm:h-[320px] lg:mt-10 lg:h-[380px]"
          >
            <iframe
              src={EMBED_SRC}
              title={`Zemljevid, ${company.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </RevealGroup>
      </Container>
    </section>
  );
}
