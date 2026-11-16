import type { ProjectId } from './projects';

/**
 * Services as listed on valolux.net/palvelut.htm and its sub-pages.
 * Wording is modernised; the substance comes from the company's own pages.
 */
export type VisualKey = 'lightbox' | 'led' | 'neon' | 'pylon' | 'film' | 'tube';

export type ServiceGroup = { title: string; items: string[] };

export type Service = {
  id: string;
  number: string;
  title: string;
  /** One-liner for the homepage showcase */
  short: string;
  lead: string;
  body: string[];
  groups?: ServiceGroup[];
  visual: VisualKey;
  related?: ProjectId[];
  /** Small factual tags shown with the service */
  tags: string[];
};

export const services: Service[] = [
  {
    id: 'valomainokset',
    number: '01',
    title: 'Valomainokset',
    short: 'Sisältä valaistut mainoskotelot pienistä kylteistä suuriin julkisivuihin.',
    lead: 'Klassinen valomainos on edelleen näkyvä ja kestävä tapa korostaa yrityksen julkisivua – päivällä ja erityisesti pimeällä.',
    body: [
      'Valomainoskotelot valmistetaan usein alumiinista ja valaistaan sisältä. Rakenteessa voidaan käyttää myös muita materiaaleja, kuten messinkiä ja kuparia.',
      'Etupinnat ovat tyypillisesti akryylia tai PL-kennomuovia. Toteutamme sekä pienet että suuret valomainokset räätälöitynä yrityksille ja yksityisille asiakkaille.',
    ],
    groups: [
      { title: 'Runko', items: ['Alumiini', 'Messinki', 'Kupari'] },
      { title: 'Etupinta', items: ['Akryyli', 'PL-kennomuovi'] },
    ],
    visual: 'lightbox',
    related: ['puukeskus', 'lukkorengas', 'kone-center'],
    tags: ['Ulko- ja sisäkäyttöön', 'Räätälöity koko'],
  },
  {
    id: 'led',
    number: '02',
    title: 'LED-mainokset ja -näytöt',
    short: 'Energiatehokkaat LED-valomainokset sekä näyttölaitteet kello-, lämpötila- ja hintatiedoille.',
    lead: 'Jos haluat erottuvuutta, LED-mainos näkyvällä paikalla tekee sen tehokkaasti – ja kevyemmällä rakenteella.',
    body: [
      'LED-valojen käyttö valomainoksissa lisääntyy kovaa vauhtia. Niiden etuja ovat pitkäikäisyys ja kestävyys, alhaiset huoltokustannukset, pienempi energiankulutus sekä valmiin mainoksen kevyempi rakenne.',
      'LED-valomainokset ovat usein akryylipintaisia, ja valaistus voidaan tehdä rakenteen etupuolelle tai takapuolelle taustavalaistuksi.',
      'LED-näyttölaitteilla voidaan esittää – myös liikkuvasti – kello-, lämpötila- ja hintatietoja. Näyttöjä voidaan sijoittaa esimerkiksi ulkomainoksiksi, julkisiin kulkuvälineisiin, halleihin, myymälöihin, urheilutapahtumiin ja huoltoasemille.',
    ],
    groups: [
      { title: 'LEDin edut', items: ['Pitkäikäisyys ja kestävyys', 'Alhaiset huoltokustannukset', 'Pienempi energiankulutus', 'Kevyempi rakenne'] },
      { title: 'Näyttölaitteiden värit', items: ['Keltainen', 'Punainen', 'Oranssi', 'Muita vaihtoehtoja'] },
    ],
    visual: 'led',
    tags: ['Etu- tai taustavalaistu', 'Liikkuva tieto'],
  },
  {
    id: 'neon',
    number: '03',
    title: 'Neonkirjaimet ja somisteneonit',
    short: 'Pintaputkiset ja taustavalaistut neonkirjaimet sekä tunnelmaa luovat somisteneonit.',
    lead: 'Pintaputkisen neonlaitteen näkyvyyttä ei voi korvata millään muulla tekniikalla.',
    body: [
      'Valikoimaamme kuuluvat muovi- ja pintaputkiset neonkirjaimet, taustavalaistut neonkirjaimet sekä eteen- ja taaksevalaisevat neonkirjaimet. Kirjaimet soveltuvat hyvin myös sisätiloihin.',
      'Somisteneonit ovat näyttävä keino luoda tunnelmallinen säväys niin sisä- kuin ulkotiloihin. Värivaihtoehtoja on useita, ja suunnittelemme neonit toiveidesi mukaan kaaria ja suoria linjoja yhdistellen – vain mielikuvitus on rajana.',
    ],
    groups: [
      { title: 'Neonkirjaimet', items: ['Pintaputkiset', 'Muovikirjaimet', 'Taustavalaistut', 'Eteen- ja taaksevalaisevat'] },
      { title: 'Somisteneonit', items: ['Sisä- ja ulkotiloihin', 'Useita värejä', 'Oma muotoilu'] },
    ],
    visual: 'neon',
    related: ['storaenso', 'pop-joensuu'],
    tags: ['Sisä- ja ulkotiloihin', 'Oma muotoilu'],
  },
  {
    id: 'opasteet',
    number: '04',
    title: 'Opasteet, kyltit ja mainostornit',
    short: 'Kyltit, opasteet ja korkeudellaan näkyvät valaistut mainostornit ja pyloonit.',
    lead: 'Valaistut mainostornit näkyvät korkeutensa ansiosta erityisen hyvin – ja hyvä opaste ohjaa asiakkaan perille.',
    body: [
      'Valmistamme kylttejä ja opasteita, jotka voidaan haluttaessa myös valaista. Materiaalin kyltteihin laadimme tarratulosteina, ja kauttamme on saatavilla myös suurkuvatulosteet koville pinnoille.',
      'Mainostorneissa ja pylooneissa voimme yhdistellä myös perinteisestä poikkeavia materiaaleja, kuten puuta. Suunnittelemme tornin omaan käyttötarkoitukseesi sopivaksi.',
    ],
    groups: [
      { title: 'Kyltit ja opasteet', items: ['Valaistut tai valaisemattomat', 'Tarratulosteet', 'Suurkuvatulosteet koville pinnoille'] },
      { title: 'Mainostornit', items: ['Valaistut tornit ja pyloonit', 'Myös puu-yhdistelmät'] },
    ],
    visual: 'pylon',
    related: ['karripojat'],
    tags: ['Valaistu tai valaisematon', 'Myös puuta'],
  },
  {
    id: 'teippaukset',
    number: '05',
    title: 'Auto- ja ikkunateippaukset',
    short: 'Teippaukset autoihin, ikkunoihin, kilpiin ja julkisivuihin – valmiista aineistosta tai suunnitellen.',
    lead: 'Teippaus tuo yrityksen näkyviin näyteikkunassa, julkisivussa ja liikenteessä.',
    body: [
      'Valmistamme vuosien kokemuksella kaikenkokoiset teippaukset myös autoihin – valmiin materiaalin tai suunnitelmiemme pohjalta.',
      'Asennamme ja tarvittaessa myös suunnittelemme pienet ja suuret teippaukset ikkunoihin, kilpiin, opasteisiin ja julkisivuihin.',
    ],
    groups: [
      { title: 'Kohteet', items: ['Autot', 'Ikkunat', 'Kilvet ja opasteet', 'Julkisivut'] },
    ],
    visual: 'film',
    related: ['teippaus-kukka', 'teippaus-fysio', 'teippaus-kirja'],
    tags: ['Suunnittelu ja asennus', 'Kaikki koot'],
  },
  {
    id: 'huolto',
    number: '06',
    title: 'Huolto ja korjaus',
    short: 'Valomainoskoteloiden, neonien ja LED-mainosten huolto – ja käyttötakuu tuotteillemme.',
    lead: 'Valomainos palvelee vuosia, kun se huolletaan ajallaan. Huollamme ja korjaamme valomainokset, neonit ja LED-mainokset.',
    body: [
      'Normaalissa valomainoskotelon huollossa vaihdetaan loisteputket ja sytyttimet – lamput kestävät noin 3–5 vuotta loisteputkista riippuen. Peruskorjauksessa vaihdamme myös kotelon kuristimet.',
      'Kaikille tuotteillemme annamme normaalin käyttötakuun, joka on tuotteesta riippuen 1–2 vuotta.',
    ],
    groups: [
      { title: 'Valomainoskotelot', items: ['Loisteputkien ja sytyttimien vaihto', 'Kuristimien vaihto peruskorjauksessa'] },
      { title: 'Neonit', items: ['Neonputken vaihto (kesto n. 5–10 v)', 'Neonmuuntajan korjaus (kesto n. 5–12 v)', 'Suurjännitejohdon vuotojen korjaus'] },
      { title: 'Somisteneonit', items: ['Neonputkien vaihto', 'Taajuusmuuntajan korjaus'] },
      { title: 'LED-valomainokset', items: ['Pimenneet LEDit', 'Hajonneet muuntajat', 'Kosteus johtojen liitoksissa'] },
    ],
    visual: 'tube',
    tags: ['Takuu 1–2 vuotta', 'Valomainokset, neonit, LED'],
  },
];

/** Core activities, valolux.net/yritys.htm: "Toimintaamme kuuluu valomainosten suunnittelu, valmistus, asennus, huolto" */
export const coreActivities = ['Suunnittelu', 'Valmistus', 'Asennus', 'Huolto'] as const;
