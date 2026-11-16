/**
 * Verified company facts. Every value here has a source; see docs/RESEARCH.md.
 * Edit this file to update contact details across the whole site.
 */
export const company = {
  /** Registered name (YTJ via finder.fi). The old website uses "… Oy", but the
   *  register lists a sole trader, so the legal suffix is intentionally omitted. */
  name: 'Valomainospalvelu Valolux',
  shortName: 'Valolux',
  businessId: '1578984-1',
  /** valolux.net/yritys.htm: "helmikuussa 2000 perustettu"; register date 21.3.2000 */
  founded: 2000,
  /** Slogan painted on the company van (photo in the valolux.net Flash header) */
  slogan: 'Valoa yöhön.',
  address: {
    street: 'Paukkajantie 4',
    postalCode: '80130',
    city: 'Joensuu',
    region: 'Pohjois-Karjala',
    note: 'Joensuun teollisuusalueella',
  },
  phones: [
    { label: '0400 730 427', href: 'tel:+358400730427' },
    { label: '0500 730 427', href: 'tel:+358500730427' },
  ],
  /** From valolux.net/yhteys.htm and finder.fi. Note: the Skypro dealer page lists
   *  valolux@valolux.fi instead — confirm the preferred address with the client. */
  email: 'valolux@co.inet.fi',
  /** Promotional products web shop run as a Skypro dealer (valolux.skypro.fi) */
  promoShopUrl: 'https://valolux.skypro.fi/',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Paukkajantie+4,+80130+Joensuu',
  /** Places named in the reference list of valolux.net/kohteet.htm */
  referencePlaces: ['Joensuu', 'Outokumpu', 'Pankakoski', 'Tikkakoski'],
} as const;

export const yearsInBusiness = () => new Date().getFullYear() - company.founded;
