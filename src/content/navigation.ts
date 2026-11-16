export type NavItem = { to: string; label: string };

export const mainNav: NavItem[] = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/toteutukset', label: 'Toteutukset' },
  { to: '/yritys', label: 'Yritys' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
];

export const quoteLink = '/yhteystiedot#tarjouspyynto';
