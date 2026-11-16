import type { ContactField, ContactFormData } from './types';

export type FieldErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{6,20}$/;

export const MESSAGE_MAX = 2000;

/** Client-side checks for usability only. The production endpoint must validate again. */
export function validateField(field: ContactField, data: ContactFormData): string | undefined {
  const v = typeof data[field] === 'string' ? (data[field] as string).trim() : data[field];
  switch (field) {
    case 'name':
      return v ? undefined : 'Kirjoita nimesi.';
    case 'email':
      if (!v) return 'Kirjoita sähköpostiosoitteesi.';
      return EMAIL.test(v as string) ? undefined : 'Tarkista sähköpostiosoite – esimerkiksi nimi@yritys.fi.';
    case 'phone':
      return !v || PHONE.test(v as string)
        ? undefined
        : 'Tarkista puhelinnumero. Käytä numeroita, välilyöntejä sekä merkkejä + ja -.';
    case 'service':
      return v ? undefined : 'Valitse palvelu, josta olet kiinnostunut.';
    case 'message':
      if (!v) return 'Kirjoita viesti.';
      if ((v as string).length < 10) return 'Kirjoita viestiin vähintään 10 merkkiä.';
      return (v as string).length > MESSAGE_MAX ? `Viesti voi olla enintään ${MESSAGE_MAX} merkkiä.` : undefined;
    case 'consent':
      return v ? undefined : 'Hyväksy tietojen käsittely, jotta voimme vastata yhteydenottoosi.';
    default:
      return undefined;
  }
}

export const VALIDATED_FIELDS: ContactField[] = ['name', 'email', 'phone', 'service', 'message', 'consent'];

export function validate(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  for (const f of VALIDATED_FIELDS) {
    const e = validateField(f, data);
    if (e) errors[f] = e;
  }
  return errors;
}
