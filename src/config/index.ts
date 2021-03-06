import { ConsentType } from '../utils/consent';

export const COOKIE_NAME = 'CookieConsent';
export const COOKIE_EXPIRATION = 365;

export const EVENT_CONSENT_UPDATED = 'consent-updated';
export const EVENT_CONSENT_SHOW = 'consent-show';
export const EVENT_CONSENT_HIDE = 'consent-hide';
export const EVENT_CONSENT_READY = 'consent-ready';
export const EVENT_DEBOUNCE = 300;
export const EVENT_DEBOUNCE_FAST = 50;
export const EVENT_CLICK = 'click';
export const EVENT_CHANGE = 'change';

export const INLINE_STYLES_MAIN = `__INLINE_STYLES__`;

export const DIALOG_FADE_IN_DURATION = 300;
export const DIALOG_FADE_OUT_DURATION = 300;

export const DIALOG_ELEMENT_NAME = 'consent-dialog';

export const CONSENT_ID_LENGTH = 10;
export const CONSENT_ID_TIMESTAMP_LENGTH = 10;

export const CONSENT_TYPE_FULL: ConsentType = 'full';
export const CONSENT_TYPE_ADVANCED: ConsentType = 'advanced';
export const CONSENT_TYPE_REJECTED: ConsentType = 'rejected';
