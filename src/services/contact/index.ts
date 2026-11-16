import { mockAdapter } from './mockAdapter';
import { getRecaptchaToken } from './recaptcha';
import type { ContactFormData, ContactPayload, ContactSubmissionAdapter, ServiceValue, SubmissionResult } from './types';

/**
 * The single place that decides how the form is delivered. The demo always uses
 * the mock adapter. For production, swap in createAppsScriptAdapter(endpoint)
 * once the Apps Script web app and reCAPTCHA verification exist.
 */
export const contactAdapter: ContactSubmissionAdapter = mockAdapter;
export const isDemoMode = contactAdapter.mode === 'demo';

export async function submitContact(data: ContactFormData): Promise<SubmissionResult> {
  const payload: ContactPayload = {
    name: data.name.trim(),
    company: data.company.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    service: data.service as ServiceValue,
    dimensions: data.dimensions.trim(),
    message: data.message.trim(),
    consent: true,
    website: data.website,
    submittedAt: new Date().toISOString(),
    page: window.location.pathname,
    recaptchaToken: await getRecaptchaToken('contact'),
  };
  try {
    return await contactAdapter.submit(payload);
  } catch {
    return { status: 'error', message: 'Lähetys epäonnistui. Yritä hetken päästä uudelleen tai soita meille.' };
  }
}

export * from './types';
