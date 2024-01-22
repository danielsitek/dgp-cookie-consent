import { ConsentType } from '../utils/consent';

export const COOKIE_NAME = 'CookieConsent';
export const COOKIE_EXPIRATION = 365;

export const EVENT_CONSENT_UPDATED = 'consent-updated';
export const EVENT_CONSENT_SHOW = 'consent-show';
export const EVENT_CONSENT_HIDE = 'consent-hide';
export const EVENT_CONSENT_READY = 'consent-ready';
export const EVENT_CONSENT_CLOSE = 'consent-close';
export const EVENT_BADGE_SHOW = 'consent-badge-show';
export const EVENT_BADGE_HIDE = 'consent-badge-hide';
export const EVENT_BADGE_CLICK = 'consent-badge-click';
export const EVENT_DEBOUNCE = 300;
export const EVENT_DEBOUNCE_FAST = 50;
export const EVENT_CLICK = 'click';
export const EVENT_CHANGE = 'change';
export const EVENT_KEYDOWN = 'keydown';

export const INLINE_STYLES_MAIN = `__INLINE_STYLES__`;
export const INLINE_STYLES_BADGE = `__INLINE_BADGE_STYLES__`;

export const DIALOG_FADE_IN_DURATION = 300;
export const DIALOG_FADE_OUT_DURATION = 300;

export const DIALOG_ELEMENT_NAME = 'consent-dialog';
export const BADGE_ELEMENT_NAME = 'consent-badge';

export const CONSENT_ID_LENGTH = 10;
export const CONSENT_ID_TIMESTAMP_LENGTH = 10;

export const CONSENT_TYPE_FULL: ConsentType = 'full';
export const CONSENT_TYPE_ADVANCED: ConsentType = 'advanced';
export const CONSENT_TYPE_REJECTED: ConsentType = 'rejected';

export const DENIED = 'denied';
export const GRANTED = 'granted';

export const BODY_ANCHOR_HREF_ABOUT = '#consent-about';
export const BODY_ANCHOR_HREF_DETAILS = '#consent-details';
export const BODY_ANCHOR_HREF_AGREE = '#consent-agree';
