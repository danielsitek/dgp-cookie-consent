import { COOKIE_NAME, COOKIE_EXPIRATION, CONSENT_ID_LENGTH } from '@/config';
import { getCookieByName, setCookie } from './cookies';
import { getDateString } from './date-time';
import { randomClientId } from './random-client-id';

export interface ConsentRules {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

export interface ConsentOptions extends ConsentRules {
  updated: string;
  id: string;
  type: ConsentType;
}

export type ConsentOptionsKeys = keyof ConsentOptions;

export type ConsentType = 'full' | 'advanced' | 'rejected' | string;

const defaultConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
  id: '',
  type: '',
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

function createConsent(data: ConsentOptions): ConsentOptions {
  setCookie(
    COOKIE_NAME,
    encodeConsentData({
      ...data,
      id: randomClientId(CONSENT_ID_LENGTH),
    }),
    COOKIE_EXPIRATION,
  );

  return getConsent();
}

export function getConsent(): ConsentOptions {
  if (!getCookieByName(COOKIE_NAME)) {
    return createConsent(defaultConsent);
  }

  const cookieDataString = getCookieByName(COOKIE_NAME);
  let cookieData: ConsentOptions = defaultConsent;

  if (cookieDataString) {
    cookieData = decodeConsentData(cookieDataString);
  }

  // Check if ID exsits, otherwise set a new ID.
  if (!cookieData.id || !cookieData.id.length) {
    return createConsent(cookieData);
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
  const { id } = getConsent();

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
