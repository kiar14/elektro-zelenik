# Elektroinštalacije Zelenik

Website for ZELENIK, družba za posredništvo, elektro in druge storitve, d.o.o.
(Janežovski Vrh 49, 2253 Destrnik). Site language is Slovenian throughout;
code, filenames and comments are English.

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · React Server
Components by default.

```bash
npm run dev        # development server
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Build status

Every public page is built: homepage, `/storitve` plus the seven service pages,
`/reference`, `/o-podjetju`, `/kontakt`, `/povprasevanje`, `/subvencije` and
`/politika-zasebnosti`.

Homepage order: hero → trust strip → storitve → quick enquiry → zakaj Zelenik →
postopek → reference → final CTA → footer.

Photovoltaics is not part of the public service architecture. There is no
`/soncne-elektrarne` route, no solar entry in the navigation, the footer, the
enquiry vocabulary or any body copy, and no solar imagery in `public/`. The
public service set is exactly the seven in `src/content/services.ts`.

## Motion

One animation system: GSAP with ScrollTrigger. Lenis provides damped wheel
scrolling and is stepped from the GSAP ticker, so there is exactly one RAF loop
on the page (`src/components/motion/SmoothScroll.tsx`).

Initial hidden states live in CSS (`[data-reveal]`, `[data-process-line]`) so
server-rendered markup is already hidden on first paint and cannot flash. Both
`prefers-reduced-motion: reduce` and a `<noscript>` rule in the root layout
override them, so content is never withheld from anyone.

Under reduced motion Lenis never starts, counters render final values, and all
reveals are visible immediately.

## Content data

`src/content/company.ts` is the single source of truth for names, address,
phone, email and registration details. Nothing may be hardcoded in a component.

`src/content/services.ts` is the single source of truth for the seven services.
The header dropdown, the mobile accordion, the footer column, `/storitve`, the
seven detail routes, every related-services block and both enquiry forms read
from it, so the seven cannot drift apart across those surfaces. Each section of
a service page names its own `layout`, which is what gives the seven pages seven
different rhythms rather than one shape repeated.

`src/content/references.ts` holds the reference projects. **One real-world
property is one project.** A building with several photographs owns them all and
shows them as one gallery; it is never split into several reference cards.

`unverifiedCompanyData` in `company.ts` records facts that are contradictory
(opening hours) or unconfirmed and must not be displayed until the client
confirms them. `TODO_CLIENT` marks the same thing in a component.

## SEO and head

`src/content/company.ts` holds `url`, the production origin, and it is the only
place the domain is written down. `src/lib/seo.ts` derives everything else from
it: `absoluteUrl()`, the two Open Graph cards, and `pageSeo()`.

Every indexable page calls `pageSeo({ path, title, description })`, which
returns the title, the description, exactly one `alternates.canonical`, and a
complete `openGraph` and `twitter` block whose `og:url` is the same URL as the
canonical. The root layout sets `metadataBase` and the title template and
nothing else: Next.js merges metadata shallowly and children inherit whatever a
layout declares, so a canonical set there would stamp the homepage URL onto
every route.

Because `metadataBase` is a constant rather than something read from
`VERCEL_URL`, a preview deployment cannot publish its own hostname to a search
engine or a social scraper.

Next.js normalises the homepage canonical to the bare origin
(`https://elektro-zelenik.si`, no trailing slash). That is deliberate on their
side and is not configurable without `trailingSlash: true`, which would add a
slash to every other route as well.

## Generated brand assets

`node scripts/generate-brand-assets.mjs` regenerates the favicon set and both
Open Graph cards from assets already in the repository. Run it after changing
the logo, the symbol or the hero photograph.

| output | what it is |
|---|---|
| `src/app/favicon.ico` | 16, 32 and 48 px frames |
| `src/app/icon.png` | 512 px |
| `src/app/apple-icon.png` | 180 px |
| `public/og/og-home.jpg` | 1200x630, the hero frame under the site's own scrim |
| `public/og/og-default.png` | 1200x630, the branded card every other page uses |

The favicon source is `public/brand/zelenik-symbol.png`, which was verified
byte-identical to `logo-doo-5.png` on the live site. The live site's own favicon
is that same file scaled to 512 with no re-crop, so the framing here is the live
site's framing, unmodified.

The script fetches IBM Plex Sans and Inter into `.cache/fonts` on first run.
That directory is ignored and the typefaces are never committed.

## Brand assets

`public/brand/` holds the genuine 2023 Zelenik d.o.o. identity files, retrieved
unmodified from the existing site:

- `zelenik-logo-horizontal.png` — 2300×500, transparent, used in the header
- `zelenik-symbol.png` — 3000×3000 standalone symbol, retained, not yet used

The brand green is sampled from those files: every green pixel in both is
exactly `rgb(12, 169, 45)`. It is defined once, in `src/app/globals.css`, as
`--color-brand` / `--color-brand-strong` / `--color-brand-tint`. No brand colour
is hardcoded anywhere else.

## Images

Every photographic asset in `public/` is a WebP master. Next.js serves AVIF
where the browser accepts it and WebP where it does not
(`images.formats` in `next.config.ts`). Sources are sized at roughly twice their
largest rendered CSS width, so nothing multi-megabyte is ever shipped: the whole
of `public/` is about 2.8 MB and the homepage above-the-fold image payload is
about 120 KB.

The brand PNGs in `public/brand/` are the genuine identity files and are left
alone. Vector and logo assets are never converted.

To re-encode after new photographs are supplied, resize to the target width and
encode WebP at quality 82 to 88, comparing output before replacing a reference.

### Hero photography

`public/images/hero/hero-house-off.webp` and `hero-house-on.webp` are the
supplied photographs. Both are 1672x941 and are encoded at the same quality —
they must stay identical in size and encoding, because they are treated as two
frames of one scene, are laid into the same box by a single CSS rule
(`.hero-frame`), and any difference between them would show up inside the
blend.

Measured from those files: the architecture begins at x = 708 of 1672, i.e.
**42.3% across the frame**. Everything left of that is sky, hills and lawn — the
negative space the copy sits in. `.hero-copy` (max width) and `.hero-scrim`
(where the wash reaches zero) are both derived from that number, so if the
photograph is ever recropped, those two rules are what need revisiting.

The source is 1672px wide, which is the ceiling for a full-bleed hero: above a
1672px viewport the optimiser has nothing more to serve. A 2560px original would
render sharper on large and high-density displays.
