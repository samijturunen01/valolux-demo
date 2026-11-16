# Future integrations: Google Apps Script and reCAPTCHA

**Status: neither is implemented or active.** The demo form validates input and shows its states, but it sends nothing, stores nothing and loads no third-party scripts. This document describes what to build when the project moves to production.

## How the form is wired today

```
ContactForm.tsx ──► services/contact/index.ts  submitContact(data)
                       ├─ builds ContactPayload (trimmed fields, timestamp, page, honeypot)
                       ├─ getRecaptchaToken('contact')   → recaptcha.ts   (returns undefined)
                       └─ contactAdapter.submit(payload) → mockAdapter.ts (waits 1.2 s, returns { status: 'demo' })
```

- `types.ts` defines `ContactPayload`, `SubmissionResult` (`demo` | `success` | `error`) and the `ContactSubmissionAdapter` interface.
- `validation.ts` contains the client-side rules. These are for usability only, not security.
- The UI already has every state: field errors with an error summary, loading, error, **demo** (states clearly that nothing was sent), and **success** (the production thank-you view, which the demo only shows as a labelled preview).
- A hidden honeypot field (`website`) is already part of the payload.

## Google Apps Script: production checklist

1. Create an Apps Script project and deploy it as a **web app** ("Execute as: me", "Who has access: anyone"). The `/exec` URL becomes `VITE_CONTACT_ENDPOINT`.
2. In `doPost(e)`, in this order:
   1. Parse the body (send it as `text/plain` or form-encoded from the browser to avoid a CORS preflight, which Apps Script can't answer).
   2. **Verify reCAPTCHA** (see below). Reject the request if verification fails.
   3. Reject the request if the honeypot `website` field is non-empty, returning `ok: true` so bots learn nothing.
   4. Re-validate every field server-side: required fields, email format, length limits (message ≤ 2000).
   5. Rate-limit, for example with `CacheService` keyed by a hash of the email.
   6. Deliver the message with `MailApp.sendEmail` to Valolux, and optionally append it to a Google Sheet.
   7. Return JSON `{ ok: true }` or `{ ok: false, error }`.
3. Implement `createAppsScriptAdapter(endpoint)` in `src/services/contact/appsScriptAdapter.ts` using that contract. Map the response to `SubmissionResult` and handle network failures by returning `status: 'error'`.
4. In `src/services/contact/index.ts`, swap `mockAdapter` for `createAppsScriptAdapter(import.meta.env.VITE_CONTACT_ENDPOINT)`.
5. Remove the demo notices: the `isDemoMode` banner in `ContactForm.tsx`, the `DemoBadge`, and the footer note.
6. Update the privacy policy (`src/pages/PrivacyPage.tsx`) with the actual processing: Google as processor, retention, and transfers.

## Google reCAPTCHA: production checklist

1. Register the site in the reCAPTCHA admin console. v3 (score-based, invisible) suits this form. Record the **site key** (public) and the **secret key** (private).
2. Frontend, in `src/services/contact/recaptcha.ts`:
   - Load `https://www.google.com/recaptcha/api.js?render=<SITE_KEY>` lazily, only when the visitor starts filling the form.
   - `getRecaptchaToken(action)` → `grecaptcha.execute(SITE_KEY, { action })`.
   - The site key comes from `VITE_RECAPTCHA_SITE_KEY`.
3. Server (Apps Script):
   - `UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', { method: 'post', payload: { secret, response: token } })`.
   - Accept only if `success === true`, `action === 'contact'` and `score` is above a chosen threshold (for example 0.5).
   - Store the **secret key in Script Properties**. Never put it in this repository, in `.env` files that are committed, or in any frontend bundle.
4. A client-side token on its own proves nothing. The endpoint is only protected because of the server-side verification in step 3.
5. If the reCAPTCHA badge is hidden, the form must show Google's required notice text. The privacy policy must mention reCAPTCHA, and cookie consent may need to cover it.
