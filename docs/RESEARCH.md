# Research: verified facts, sources and open questions

Research date: 10 November 2026. Everything the site states about the company comes from the sources below. Anything that could not be verified is either left out or listed under **Open questions**.

## Sources examined

| Source | What it gave us |
| --- | --- |
| `valolux.net/index.htm` and every sub-page (`yritys`, `palvelut`, all 13 service pages, `kohteet`, `kohteet_teippaukset`, `yhteys`) | Company description, services, service details, reference projects, contact details |
| `valolux.net/valolux.swf` (Flash header, unpacked locally) | 5 extra photos not visible on the HTML pages: the company **van livery** (logo + slogan), a **workshop photo**, higher-resolution Puukeskus and Stora Enso photos |
| `valolux.skypro.fi` | Valolux's promotional-products web shop (Skypro dealer). Confirms address and phones, and lists a different email address (see conflicts) |
| finder.fi company page (data from the YTJ business register) | Official name, business ID, legal form, registered home municipality, registration date |
| PRH open data API | Sole traders aren't included, so it only confirmed that "Valolux Oy" is **not** a registered limited company |

## Verified facts used on the site

| Fact | Value | Source |
| --- | --- | --- |
| Official name | Valomainospalvelu Valolux | YTJ via finder.fi |
| Business ID (Y-tunnus) | 1578984-1 | YTJ via finder.fi |
| Founded | February 2000 (register: 21.3.2000) → shown as "vuodesta 2000" / "helmikuussa 2000" | yritys.htm, finder.fi |
| Address | Paukkajantie 4, 80130 Joensuu – Joensuu industrial area | yritys.htm, yhteys.htm, Skypro, finder.fi |
| Phones | 0400 730 427, 0500 730 427 | yhteys.htm, Skypro, footer graphic, finder.fi |
| Email | valolux@co.inet.fi | yhteys.htm, finder.fi |
| Core work | Design, manufacture, installation and service of illuminated signs | yritys.htm |
| Speciality | Illuminated signs for outdoor and indoor use; also signs and vinyl graphics | yritys.htm |
| Customers | Both private customers and businesses, small and large signs | index.htm |
| Service details | Light boxes (aluminium, brass, copper; acrylic / PL honeycomb faces), LED signs and their benefits, LED displays (clock/temperature/price, yellow/red/orange), neon letters, decorative neon, signs and wayfinding, large-format prints, advertising towers/pylons (incl. wood), car and window graphics | palvelut sub-pages |
| Service intervals | Tubes ~3–5 yrs, neon tube ~5–10 yrs, neon transformer ~5–12 yrs | huolto.htm |
| Warranty | 1–2 years depending on the product | takuu.htm |
| Quote tip | "Tarjouspyynnössä voit käyttää arvioituja mittoja" | yhteys.htm |
| Welcome line | "Tervetuloa tutustumaan toimintaamme Paukkajantielle!" | yhteys.htm |
| Slogan | "Valoa yöhön" | Painted on the company van (Flash header photo) |
| Reference projects | 10 named illuminated-sign projects + 3 uncaptioned window-graphics photos | kohteet.htm, kohteet_teippaukset.htm |
| Promotional products | Web shop at valolux.skypro.fi | Skypro dealer page |

**Service area.** No service area is stated anywhere, so the site claims none. It only names the places in the reference list: Joensuu, Outokumpu, Pankakoski and Tikkakoski. SEO copy targets "valomainokset Joensuu".

## Conflicts and the decisions taken

| Conflict | Decision |
| --- | --- |
| Legal form: the old site says "Valomainospalvelu Valolux **Oy**", but the register lists a **sole trader** (yksityinen elinkeinonharjoittaja, home municipality Liperi) | Uses the registered name without "Oy". **Confirm with the client.** |
| Email: `valolux@co.inet.fi` (own site, finder.fi) vs `valolux@valolux.fi` (Skypro page) | Uses the address on the company's own site. **Confirm the preferred address.** Note: valolux.fi currently hosts an unrelated home-lighting shop (see below), so `@valolux.fi` mail ownership is unclear. |
| Founding date: February 2000 (own site) vs 21.3.2000 (register) | "vuodesta 2000"; "helmikuussa 2000" where the company's own wording is quoted |
| Spelling "Outokumu" on kohteet.htm | Corrected to Outokumpu |

## Not to be confused with

- **valolux.fi**: currently a WooCommerce store, "ValoLux – Valoa ja tyyliä arkeen", for home lighting and interiors. Not this company's website.
- **Valomainos Oy** (Klaukkala, Nurmijärvi, Y-tunnus 0197068-2): a different signage company.
- **Valomainospalvelu Luostarinen Oy**: a different company, dissolved in 2020.

## Brand identity findings

- **Logo**: "ValoLux" in an ornate upright swash script with a looped V and L. "VALOMAINOSPALVELU" appears in spaced capitals with it. The same script appears on the web header (white on a yellow→red gradient), the storefront sign (red on a blue panel) and the van livery (**gold on deep navy**, with a starburst and "VALOA YÖHÖN").
- **No vector original was available.** `src/components/brand/logoPaths.ts` is a trace of the van livery photo, the sharpest source. The method is in `scripts/tools/trace-logo.mjs`. It is faithful, but it is a **reconstruction. Request the original vector file from the client before launch.**
- **Palette**: gold-on-night from the van livery (primary), cool blue from the storefront panel (secondary "volt" accent, used sparingly), and the red of the old site (errors only).

## Imagery provenance

All photographs on the site are Valolux's own published material (valolux.net HTML pages and Flash header). Originals are kept unmodified in `source-assets/valolux-net/`. `npm run images` crops out the baked-in white frames and converts them to WebP.

- **Permission**: the photos show customers' signs and logos. They are presented as references, exactly as on the current site. **Confirm reuse with the client.**
- **Resolution**: the originals are at most 600 × 440 px, so the layout shows them near native size. For launch, ask the client for new or higher-resolution photography, especially night shots.
- **Illustrations**: service visuals (light box, LED display, neon, pylon, window film, tube diagram) are custom SVG/canvas drawings. They are labelled on the page as illustrations ("havainnekuvia").
- No stock photography and no AI-generated imagery is used.

## Deliberately not included (nothing to verify it)

Testimonials, staff names, team size, customer counts, project specs, prices, certifications, awards, opening hours, a service-area claim, and any statistics.

## Open questions for the client

1. Correct legal name and form (Oy or sole trader) and the preferred email address.
2. Permission to reuse the reference photos, and newer or higher-resolution images.
3. Original vector logo files.
4. Opening hours, if they should be published.
5. Content for "Erikoistyöt", which is listed on the old site but its page says "osio tulossa".
6. Privacy-policy details (contact person, retention period, legal basis).
