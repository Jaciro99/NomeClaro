export const CONSENT_STORAGE_KEY = "nomeclaro_cookie_consent";
export const CONSENT_EVENT = "nomeclaro-cookie-consent";

export function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);

  return () => window.removeEventListener(CONSENT_EVENT, callback);
}

export function getConsentSnapshot() {
  return localStorage.getItem(CONSENT_STORAGE_KEY) ?? "";
}

export function getServerConsentSnapshot() {
  return "";
}
