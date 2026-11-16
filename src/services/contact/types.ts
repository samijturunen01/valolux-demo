export const SERVICE_OPTIONS = [
  { value: 'valomainos', label: 'Valomainos' },
  { value: 'led', label: 'LED-mainos tai LED-näyttö' },
  { value: 'neon', label: 'Neonkirjaimet tai somisteneon' },
  { value: 'opasteet', label: 'Opasteet, kyltit tai mainostorni' },
  { value: 'teippaus', label: 'Auto- tai ikkunateippaus' },
  { value: 'huolto', label: 'Huolto tai korjaus' },
  { value: 'muu', label: 'Muu / en ole varma' },
] as const;

export type ServiceValue = (typeof SERVICE_OPTIONS)[number]['value'];

export type ContactFormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: ServiceValue | '';
  dimensions: string;
  message: string;
  consent: boolean;
  /** Honeypot – real visitors never see or fill this field */
  website: string;
};

export type ContactField = keyof ContactFormData;

/** What a production backend (Google Apps Script) will receive. */
export type ContactPayload = Omit<ContactFormData, 'website' | 'consent' | 'service'> & {
  service: ServiceValue;
  consent: true;
  /** Honeypot value, passed through so the server can discard bot submissions */
  website: string;
  submittedAt: string;
  page: string;
  /** Google reCAPTCHA token – MUST be verified server-side. Absent in the demo. */
  recaptchaToken?: string;
};

export type SubmissionResult =
  /** Demo mode: nothing was sent or stored. Never present this as a delivered message. */
  | { status: 'demo' }
  | { status: 'success'; reference?: string }
  | { status: 'error'; message: string };

export interface ContactSubmissionAdapter {
  readonly mode: 'demo' | 'apps-script';
  submit(payload: ContactPayload): Promise<SubmissionResult>;
}
