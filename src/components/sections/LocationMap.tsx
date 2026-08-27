"use client";

import { ExternalLink, MapPin, Play } from "lucide-react";
import { useState } from "react";

import { company } from "@/content/company";

/**
 * The map, as a facade.
 *
 * Nothing from Google is requested on first render. What paints is a static
 * panel built from the site's own tokens; the iframe is mounted only when the
 * visitor asks for it, which keeps a third-party frame, its scripts and its
 * cookies off every page load of O podjetju.
 *
 * The embed URL is the public `output=embed` form, so no API key is exposed and
 * none is required. The iframe itself is also `loading="lazy"`, which matters
 * for the one render where it does exist.
 *
 * The direct link is not a fallback. It is the better route on a phone, where a
 * tap should open the native maps application rather than a frame inside a
 * page, so it is always visible whether or not the frame has been loaded.
 */
const QUERY = encodeURIComponent(company.address.full);
const EMBED_SRC = `https://www.google.com/maps?q=${QUERY}&hl=sl&z=15&output=embed`;
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${QUERY}`;

export function LocationMap({ id = "lokacija-naslov" }: { id?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <section aria-labelledby={id} className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-wide px-5 pt-16 pb-0 md:px-8 lg:px-12 lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
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
      </div>

      {/* Full-bleed: the map is the widest element on the page and gains
          nothing from sitting inside the text column. */}
      <div className="mt-10 lg:mt-12">
        <div className="relative h-[320px] w-full overflow-hidden bg-surface-sunk sm:h-[380px] lg:h-[440px]">
          {loaded ? (
            <iframe
              src={EMBED_SRC}
              title={`Zemljevid, ${company.address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen={false}
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="group absolute inset-0 flex size-full flex-col items-center justify-center gap-4 px-6 text-center transition-colors duration-200 ease-standard hover:bg-surface"
            >
              {/* A quiet grid standing in for the map, drawn from the site's
                  own border token. No third-party tile is fetched for it. */}
              <span
                aria-hidden
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              <span
                aria-hidden
                className="relative flex size-14 items-center justify-center rounded-full bg-brand-tint transition-transform duration-300 ease-smooth group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              >
                <Play className="size-6 text-brand-strong" strokeWidth={1.8} />
              </span>

              <span className="relative">
                <span className="block text-lg font-semibold tracking-[-0.014em] text-ink">
                  Naloži zemljevid
                </span>
                <span className="mt-1.5 block max-w-[38ch] text-base text-ink-muted">
                  Zemljevid se naloži šele na vaš klik, zato se ob obisku strani
                  ne naložijo zunanje vsebine.
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
