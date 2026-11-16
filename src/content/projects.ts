import { media, type MediaKey } from '../assets/media';

/**
 * Reference projects published on valolux.net/kohteet.htm and
 * kohteet_teippaukset.htm. Names and places are exactly as listed there
 * (except the obvious typo "Outokumu" → Outokumpu). The window-film photos
 * were published without captions, so they are described by what is visible.
 * The sign type is classified from the photograph.
 *
 * Before publishing: confirm with Valolux that these photos may be reused.
 */
export type ProjectCategory = 'valomainos' | 'kirjaimet' | 'torni' | 'teippaus';

export const categoryLabels: Record<ProjectCategory, string> = {
  valomainos: 'Valomainos',
  kirjaimet: 'Valokirjaimet',
  torni: 'Mainostorni',
  teippaus: 'Teippaus',
};

export type Project = {
  id: MediaKey;
  title: string;
  place?: string;
  category: ProjectCategory;
  /** What the photo shows — used as the image alt text */
  alt: string;
  night?: boolean;
};

export const projects: Project[] = [
  {
    id: 'puukeskus',
    title: 'Puukeskus',
    place: 'Joensuu',
    category: 'valomainos',
    alt: 'Puukeskuksen keltainen valomainoskotelo vihreällä logolla ja tekstillä palaa illalla rakennuksen julkisivussa.',
    night: true,
  },
  {
    id: 'storaenso',
    title: 'Stora Enso',
    place: 'Pankakoski',
    category: 'kirjaimet',
    alt: 'Stora Enson erilliskirjaimet ja punavalkoinen tunnus tiilirakennuksen katolla.',
  },
  {
    id: 'kone-center',
    title: 'Kone-Center',
    place: 'Outokumpu',
    category: 'valomainos',
    alt: 'Kone-Centerin valaistu kattomainos iltataivasta vasten, punamusta logo valkoisella pohjalla.',
    night: true,
  },
  {
    id: 'lukkorengas',
    title: 'Lukkorengas',
    place: 'Joensuu',
    category: 'valomainos',
    alt: 'Lukkorengas oy -valomainos hohtaa pimeässä myymälän sisäänkäynnin yläpuolella.',
    night: true,
  },
  {
    id: 'karripojat',
    title: 'Kärripojat',
    place: 'Joensuu',
    category: 'torni',
    alt: 'Kärripojat oy:n valaistu mainostorni, jossa päällekkäin neljä valokoteloa, kuvattuna pimeällä.',
    night: true,
  },
  {
    id: 'pop-joensuu',
    title: 'Paikallisosuuspankki',
    place: 'Joensuu',
    category: 'kirjaimet',
    alt: 'POP Joensuu -erilliskirjaimet ja koivunlehtilogo laatoitetussa seinässä.',
  },
  {
    id: 'autobaari',
    title: 'Tikkakosken Autobaari',
    place: 'Tikkakoski',
    category: 'valomainos',
    alt: 'Sininen Tikkakosken Autobaari -valomainoskotelo rapatussa julkisivussa.',
  },
  {
    id: 'delta-auto',
    title: 'Delta Auto',
    place: 'Joensuu',
    category: 'valomainos',
    alt: 'Fiat Huolto -valomainoskotelo profiilipeltiseinässä.',
  },
  {
    id: 'lasermedia',
    title: 'Lasermedia',
    place: 'Joensuu',
    category: 'valomainos',
    alt: 'LaserMedia Oy – Sisäänkäynti -valomainoskotelo sisäänkäynnin yläpuolella.',
  },
  {
    id: 'solenovo',
    title: 'Solenovo',
    place: 'Joensuu',
    category: 'valomainos',
    alt: 'Solenovon kaksipuolinen ulokemainos rakennuksen kulmassa.',
  },
  {
    id: 'teippaus-kukka',
    title: 'Ikkunateippaus, kukkakauppa',
    category: 'teippaus',
    alt: 'Kukkakaupan ikkuna, jossa valkoinen Kukkasidonnat-teksti ja vihreät köynnöskuviot.',
  },
  {
    id: 'teippaus-fysio',
    title: 'Ikkunateippaus, fysioterapia',
    category: 'teippaus',
    alt: 'Fysioterapiakeskuksen ikkunateippaukset: logo, puhelinnumero ja palveluluettelo.',
  },
  {
    id: 'teippaus-kirja',
    title: 'Ikkunateippaus, kirjakauppa',
    category: 'teippaus',
    alt: 'Kirjakaupan näyteikkunat oransseilla otsikkoteippauksilla ja valkoisilla teksteillä.',
  },
];

export type ProjectId = MediaKey;

export const getProject = (id: ProjectId) => projects.find((p) => p.id === id)!;

export const projectMedia = (p: Project) => media[p.id];

/** Selection for the homepage – night shots carry the "from darkness to light" story */
export const featuredProjectIds: ProjectId[] = ['puukeskus', 'storaenso', 'karripojat', 'kone-center', 'lukkorengas'];
