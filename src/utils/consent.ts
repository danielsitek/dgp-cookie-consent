import { COOKIE_NAME, COOKIE_EXPIRATION } from '../config';
import { getCookieByName, setCookie } from './cookies';
import { getDateString } from './datetime';

export interface ConsentOptions {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  updated: string;
}

const defaultConsent = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
};

function encodeConsentData(data: ConsentOptions): string {
  return btoa(encodeURIComponent(JSON.stringify(data)));
}

function decodeConsentData(encodedData: string): ConsentOptions {
  return JSON.parse(decodeURIComponent(atob(encodedData)));
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

export function updateConsent(data: ConsentOptions, cb?: (consent: ConsentOptions) => void): ConsentOptions {
  const consentData = {
    ...defaultConsent,
    ...data,
    updated: getDateString(),
  };

  setCookie(COOKIE_NAME, encodeConsentData(consentData), COOKIE_EXPIRATION);

  const consent = getConsent();

  if (cb && typeof cb === 'function') {
    cb.call(null, consent);
  }

  return consent;
}
