import { COOKIE_NAME, COOKIE_EXPIRATION, CONSENT_ID_LENGTH } from '../config';
import { getCookieByName, setCookie } from './cookies';
import { getDateString } from './datetime';
import { randomClientId } from './random-client-id';

export interface ConsentOptions {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  updated: string;
  id: string;
}

const defaultConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
  id: '',
};

function encodeConsentData(data: ConsentOptions): string {
  return encodeURIComponent(JSON.stringify(data));
}

function decodeConsentData(encodedData: string): ConsentOptions {
  try {
    return JSON.parse(decodeURIComponent(encodedData));
  } catch (e) {
    return JSON.parse(decodeURIComponent(atob(encodedData)));
  }
}

export function getConsent(): ConsentOptions {
  let cookieData: ConsentOptions = defaultConsent;

  if (!getCookieByName(COOKIE_NAME)) {
    setCookie(COOKIE_NAME, encodeConsentData(defaultConsent), COOKIE_EXPIRATION);
  }

  const cookieDataString = getCookieByName(COOKIE_NAME);

  if (cookieDataString) {
    cookieData = decodeConsentData(cookieDataString);
  }

  return cookieData;
}

// Backup for adding consent ID to existing consents.
export function createConsentId(): ConsentOptions {
  const consentData = getConsent();

  if (!consentData.id || !consentData.id.length) {
    consentData.id = randomClientId(CONSENT_ID_LENGTH);
  }

  setCookie(COOKIE_NAME, encodeConsentData(consentData), COOKIE_EXPIRATION);

  return getConsent();
}

export function updateConsent(data: ConsentOptions, cb?: (consent: ConsentOptions) => void): ConsentOptions {
  let { id } = getConsent();

  if (!id || !id.length) {
    id = randomClientId(CONSENT_ID_LENGTH);
  }

  const consentData = {
    ...defaultConsent,
    ...data,
    updated: getDateString(),
    id,
  };

  setCookie(COOKIE_NAME, encodeConsentData(consentData), COOKIE_EXPIRATION);

  const consent = getConsent();

  if (cb && typeof cb === 'function') {
    cb.call(null, consent);
  }

  return consent;
}
