import type { ContactSubmissionAdapter } from './types';

/**
 * GOOGLE APPS SCRIPT ADAPTER – INTENTIONALLY NOT IMPLEMENTED IN THIS DEMO.
 *
 * Planned contract (see docs/INTEGRATIONS.md for the full checklist):
 *
 *   POST  <VITE_CONTACT_ENDPOINT>   (Apps Script web app "/exec" URL)
 *   Body: ContactPayload as JSON (or form-encoded to avoid a CORS preflight)
 *   200 → { ok: true, reference?: string }   → { status: 'success' }
 *   4xx → { ok: false, error: string }       → { status: 'error' }
 *
 * The Apps Script side must, before doing anything else:
 *   1. verify `recaptchaToken` with Google's siteverify API using the SECRET key
 *      stored in Script Properties (never in this codebase),
 *   2. drop submissions whose honeypot field `website` is non-empty,
 *   3. re-validate every field and enforce length limits,
 *   4. rate-limit, then e-mail / store the message.
 *
 * The client-side checks in this project are for usability only and provide no
 * security on their own.
 */
export function createAppsScriptAdapter(endpoint: string): ContactSubmissionAdapter {
  void endpoint;
  throw new Error('Google Apps Script -integraatiota ei ole vielä toteutettu (demo).');
}
