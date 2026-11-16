# Valolux – website redesign (concept demo)

A speculative redesign for **Valomainospalvelu Valolux**, an illuminated-sign company in Joensuu, Finland, operating since 2000. The site content is in Finnish.

> **This is a private sales demo, not the company's official website.** It is marked as such on every page (demo badge, footer note) and kept out of search engines (`noindex` + `robots.txt`). The contact form sends nothing.

Concept: **From darkness to light.** The homepage opens on a dark wall where the real Valolux script logo, rebuilt as layered SVG, switches on like a channel-letter sign. A spark of current runs through it, the letters flicker on, the light spills onto the corrugated facade, and the headline appears.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type check + production build + static route pages → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

Requires Node ≥ 22.18. The build scripts import small `.ts` data modules directly.

| Script | What it does |
| --- | --- |
| `npm run typecheck` | TypeScript project check |
| `npm run images` | Rebuild optimised WebP + manifest from `source-assets/` |
| `node scripts/generate-brand-assets.mjs` | Rebuild favicon, touch icon and OG image from the logo paths |

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 8 · GSAP + ScrollTrigger (hero timeline and scroll-linked scenes only) · Lucide icons · self-hosted fonts (Archivo variable, Instrument Serif). No WebGL and no smooth-scroll library: native scrolling is untouched.

## Structure

```
src/
  content/            ← edit text and data here
    company.ts          verified contact and company facts (single source)
    services.ts         services + details (from the company's own pages)
    projects.ts         reference projects, captions, alt texts, categories
    seo.ts              per-route titles/descriptions (also used by the build)
  components/
    brand/              traced logo paths, LogoMark, IlluminatedSign (hero sign), Starburst
    home/               Hero (sign-on timeline), Intro, ServicesShowcase, SelectedProjects, Process, AboutTeaser, ContactCta
    visuals/            custom service illustrations (SVG + canvas LED matrix)
    layout/             Header, MobileMenu, Footer, DemoBadge, RouteVeil, PointerLight, ScrollManager
    ui/                 PageHero, LitImage, Lightbox, SignHeadline, Eyebrow
    contact/            ContactForm (validation, states)
  services/contact/   submission adapter: mock (active), Apps Script + reCAPTCHA (stubs)
  pages/              Home, Palvelut, Toteutukset, Yritys, Yhteystiedot, Tietosuoja, 404
  styles/             design tokens and components (index.css), sign/hero (sign.css), visuals.css
  assets/media/       generated WebP images + typed manifest
source-assets/        untouched originals from valolux.net (provenance)
scripts/              image pipeline, brand assets, post-build, logo trace tool
docs/                 RESEARCH, INTEGRATIONS, DEPLOYMENT
```

## Design system

- **Palette**, taken from the real brand: the gold script on deep navy of the company van ("Valoa yöhön") gives the primary night-and-gold scheme. The storefront's blue panel becomes a sparing cool "volt" accent, used for demo notices. The old site's red is used for errors only.
- **Type**: *Archivo* variable (weight and width axes). Headings run expanded and heavy, like channel-letter signage. *Instrument Serif* italic gives warm, gold accent words that echo the script logo. Body text is 17 px; all text has full Finnish character support.
- **Signature details**: LED indicators that power on as a section enters view; a line of light as the page transition; photos that start dark and switch on as they scroll in; and cards whose borders catch a pointer-following light.
- **Restraint**: calm sections alternate with a few high-impact moments: the hero, the scroll-lit statement, the process light path and the closing CTA.

## Motion and accessibility

- **Hero intro**: about 4 s on first load, and a quick version when returning to the homepage. Any key press, scroll, click or touch skips straight to the end state. Navigation is usable from the first frame. The "Valot päällä/pois" switch replays the sign-on.
- **Flicker**: at most two dips per letter, spread over ~0.7 s, well under the WCAG three-flashes-per-second threshold.
- **`prefers-reduced-motion`**: the sign appears lit, with no flicker or movement. Reveals, parallax and the pointer light are switched off.
- **Mobile**: a lighter version of the sign (no reflection or facade texture, smaller blur). Visuals power on as they reach the centre of the screen instead of on hover.
- **Accessibility features**:
  - semantic landmarks and one H1 per page
  - a skip link
  - focus moves to the page heading after navigation
  - a focus-trapped mobile menu with an inert background
  - a native `<dialog>` lightbox with keyboard and swipe support
  - form errors linked to fields with an error summary
  - visible focus rings, and alt text on every image
- **Performance**: sub-pages are lazy-loaded and images lazy-loaded with intrinsic sizes and tiny placeholders. Fonts are self-hosted, and animation runs on `opacity`/`transform` only. The LED canvas renders only while visible and lit.

## Content status – read before showing or publishing

Placeholders and unverified items:

- **Logo**: a vector trace of the authentic raster logo. Replace it with the original artwork.
- **Legal form and email**: conflicting sources (see `docs/RESEARCH.md`). Confirm both.
- **Reference photos**: the company's own published images (low resolution). Confirm reuse rights. New photography is recommended.
- **Privacy policy**: a structured **draft** with marked gaps.
- **"Erikoistyöt"** box: neutral call-to-action copy, because the old site has no content for it.
- **Service illustrations**: drawings, labelled as such on the page.
- **Contact form**: demo mode only. See `docs/INTEGRATIONS.md`.

Missing authentic assets: original logo files, high-resolution or recent project photos, photos of the team or premises (optional), and opening hours.

## QA performed locally

- `tsc` and the production build pass.
- All routes were rendered in headless Chrome at 1440 × 900 and 390 × 844:
  - no console errors, no failed requests, no broken images and no missing alt text
  - no horizontal overflow
  - one H1 per page and correct titles
- Hero sign-on captured frame by frame, plus the reduced-motion and mobile variants. The power switch was also tested.
- Navigation tested: route transitions, focus management, hash links, back/forward and deep links.
- Contact form tested: error summary and focus, live validation, busy state, demo result. It made **zero network requests**.
- Lightbox (keyboard and Esc), filters and the mobile menu (inert background, Esc) all work.
- GitHub Pages sub-path build (`BASE_PATH=/valolux/`) tested against a local server that imitates Pages.

Deployment, Apps Script and reCAPTCHA are documented but intentionally **not** implemented: see `docs/DEPLOYMENT.md` and `docs/INTEGRATIONS.md`.
