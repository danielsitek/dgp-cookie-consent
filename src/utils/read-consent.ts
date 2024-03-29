import { COOKIE_NAME } from '@/config';
import type { ConsentRules } from './consent';
import { getCookieByName } from './cookies';

// Simple CookieConsent reader with fallback to defaults.
export function readConsent(): ConsentRules {
  try {
    return JSON.parse(
      decodeURIComponent(
        document.cookie
          .split(';')
          .filter(function (i) {
            return i.trim().includes(`${COOKIE_NAME}=`);
          })[0]
          .replace(`${COOKIE_NAME}=`, '')
          .trim(),
      ),
    );
  } catch (e) {
    return {
      necessary: true,
      marketing: false,
      preferences: false,
      statistics: false,
    };
  }
}

export function getDefaultConsent(): ConsentRules {
  try {
    return JSON.parse(getCookieByName(COOKIE_NAME) || '');
  } catch (e) {
    return {
      necessary: true,
      marketing: false,
      preferences: false,
      statistics: false,
    };
  }
}
