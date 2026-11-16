/**
 * GOOGLE reCAPTCHA – PREPARED, NOT ACTIVE.
 *
 * In production this will load the reCAPTCHA script with the PUBLIC site key
 * (VITE_RECAPTCHA_SITE_KEY) and return a token for the given action. The token
 * proves nothing by itself: the Apps Script endpoint must verify it with the
 * SECRET key, which never appears in frontend code.
 *
 * In the demo no script is loaded, no request is made, and no token exists.
 */
export async function getRecaptchaToken(action: string): Promise<string | undefined> {
  void action;
  return undefined;
}

export const recaptchaEnabled = false;
