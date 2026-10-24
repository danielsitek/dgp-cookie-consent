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

export type ConsentType = 'full' | 'advanced' | 'rejected' | '';

const defaultConsent: ConsentOptions = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
  id: '',
  type: '',
};

const consentTypes: ConsentType[] = ['full', 'advanced', 'rejected', ''];

// Keep only known keys with expected types, anything else falls back to defaults.
function normalizeConsentData(data: unknown): ConsentOptions {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { ...defaultConsent };
  }

  const { necessary, preferences, statistics, marketing, updated, id, type } = data as Record<string, unknown>;

  return {
    necessary: typeof necessary === 'boolean' ? necessary : defaultConsent.necessary,
    preferences: typeof preferences === 'boolean' ? preferences : defaultConsent.preferences,
    statistics: typeof statistics === 'boolean' ? statistics : defaultConsent.statistics,
    marketing: typeof marketing === 'boolean' ? marketing : defaultConsent.marketing,
    updated: typeof updated === 'string' ? updated : defaultConsent.updated,
    id: typeof id === 'string' ? id : defaultConsent.id,
    type: consentTypes.includes(type as ConsentType) ? (type as ConsentType) : defaultConsent.type,
  };
}

function encodeConsentData(data: ConsentOptions): string {
  return encodeURIComponent(JSON.stringify(data));
}

export function decodeConsentData(encodedData: string): ConsentOptions {
  try {
    // Try to parse the data as is.
    return normalizeConsentData(JSON.parse(decodeURIComponent(encodedData)));
  } catch (e) {
    try {
      // Fallback for base64 encoded data.
      return normalizeConsentData(JSON.parse(decodeURIComponent(atob(encodedData))));
    } catch (e) {
      // If both fail, return default consent. It might happened if CookieConsent is set by different provider.
      return { ...defaultConsent };
    }
  }
}

// Fallback for the page lifetime when the cookie cannot be written (blocked cookies, insecure context).
let memoryConsent: ConsentOptions | undefined;

function saveConsent(data: ConsentOptions): void {
  const encodedData = encodeConsentData(data);

  setCookie(COOKIE_NAME, encodedData, COOKIE_EXPIRATION);

  // Verify the write, otherwise keep the consent in memory.
  memoryConsent = getCookieByName(COOKIE_NAME) === encodedData ? undefined : data;
}

function createConsent(data: ConsentOptions): ConsentOptions {
  saveConsent({
    ...data,
    id: randomClientId(CONSENT_ID_LENGTH),
  });

  return getConsent();
}

export function getConsent(): ConsentOptions {
  if (memoryConsent) {
    return { ...memoryConsent };
  }

  const cookieDataString = getCookieByName(COOKIE_NAME);

  if (!cookieDataString) {
    return createConsent(defaultConsent);
  }

  const cookieData = decodeConsentData(cookieDataString);

  // Check if ID exists, otherwise set a new ID.
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

  saveConsent(consentData);

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

  saveConsent(consentData);

  const consent = getConsent();

  if (cb && typeof cb === 'function') {
    cb.call(null, consent);
  }

  return consent;
}
