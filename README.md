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

Homepage and global footer are built. Inner pages remain marked placeholders
(`src/components/layout/PageStub.tsx`) so no navigation link 404s.

Homepage order: hero → trust strip → storitve → quick enquiry → zakaj Zelenik →
postopek → reference → final CTA → footer.

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

`src/content/navigation.ts` carries the navigation and the service list. Every
service has a `status`:

| status | meaning |
|---|---|
| `confirmed` | present in the company's own current material |
| `partner` | delivered together with business partners |
| `needs-client-verification` | registered or advertised elsewhere, not yet confirmed as actively offered |

**Only `confirmed` services are rendered anywhere in the interface.** The others
stay in the data with a `source` note recording what still has to be checked.
`unverifiedCompanyData` in `company.ts` records facts that are contradictory
(opening hours) and must not be displayed until the client confirms them.

## Brand assets

`public/brand/` holds the genuine 2023 Zelenik d.o.o. identity files, retrieved
unmodified from the existing site:

- `zelenik-logo-horizontal.png` — 2300×500, transparent, used in the header
- `zelenik-symbol.png` — 3000×3000 standalone symbol, retained, not yet used

The brand green is sampled from those files: every green pixel in both is
exactly `rgb(12, 169, 45)`. It is defined once, in `src/app/globals.css`, as
`--color-brand` / `--color-brand-strong` / `--color-brand-tint`. No brand colour
is hardcoded anywhere else.

## Hero photography

`public/images/hero/hero-house-off.png` and `hero-house-on.png` are the supplied
photographs, used unmodified. Both are 1672x941 — they must stay identical in
size, because they are treated as two frames of one scene and are laid into the
same box by a single CSS rule (`.hero-frame`).

Measured from those files: the architecture begins at x = 708 of 1672, i.e.
**42.3% across the frame**. Everything left of that is sky, hills and lawn — the
negative space the copy sits in. `.hero-copy` (max width) and `.hero-scrim`
(where the wash reaches zero) are both derived from that number, so if the
photograph is ever recropped, those two rules are what need revisiting.

The source is 1672px wide, which is the ceiling for a full-bleed hero: above a
1672px viewport the optimiser has nothing more to serve. A 2560px original would
render sharper on large and high-density displays.
