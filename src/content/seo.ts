/**
 * Per-route metadata. Also read by scripts/postbuild.mjs, which writes a static
 * HTML entry per route so titles and descriptions exist before JavaScript runs.
 * Keep this file free of imports so the build script can load it as plain data.
 */
export type PageMeta = { path: string; title: string; description: string };

export const SITE_NAME = 'Valomainospalvelu Valolux';

export const pageMeta: PageMeta[] = [
  {
    path: '/',
    title: 'Valomainokset Joensuu | Valomainospalvelu Valolux',
    description:
      'Valolux suunnittelee, valmistaa, asentaa ja huoltaa valomainokset Joensuussa vuodesta 2000 – valomainokset, LED-mainokset, neonit, opasteet ja teippaukset.',
  },
  {
    path: '/palvelut',
    title: 'Palvelut – valomainokset, LED, neon, opasteet ja teippaukset | Valolux',
    description:
      'Valomainoskotelot, LED-mainokset ja -näytöt, neonkirjaimet, somisteneonit, opasteet, mainostornit, teippaukset sekä valomainosten huolto ja korjaus Joensuussa.',
  },
  {
    path: '/toteutukset',
    title: 'Toteutukset – valomainoksia ja teippauksia | Valolux',
    description:
      'Valoluxin toteuttamia valomainoksia, valokirjaimia, mainostorneja ja teippauksia Joensuusta, Outokummusta, Pankakoskelta ja Tikkakoskelta.',
  },
  {
    path: '/yritys',
    title: 'Yritys – valomainoksia vuodesta 2000 | Valolux',
    description:
      'Valomainospalvelu Valolux on vuonna 2000 perustettu joensuulainen valomainosyritys. Toimipisteemme sijaitsee Paukkajantiellä Joensuun teollisuusalueella.',
  },
  {
    path: '/yhteystiedot',
    title: 'Yhteystiedot ja tarjouspyyntö | Valolux',
    description:
      'Pyydä tarjous valomainoksesta. Valomainospalvelu Valolux, Paukkajantie 4, 80130 Joensuu. Puh. 0400 730 427 / 0500 730 427.',
  },
  {
    path: '/tietosuoja',
    title: 'Tietosuojaseloste | Valolux',
    description: 'Valomainospalvelu Valoluxin yhteydenottolomakkeen tietosuojaseloste (luonnos).',
  },
];

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Sivua ei löytynyt | Valolux',
  description: 'Etsimääsi sivua ei löytynyt.',
};
