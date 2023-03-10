import { DENIED, EVENT_CONSENT_HIDE, EVENT_CONSENT_READY, EVENT_CONSENT_SHOW, EVENT_CONSENT_UPDATED, GRANTED } from './config';
import { dataLayerPush } from './utils/data-layer-push';
import { readConsent } from './utils/read-consent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// DataLayer init.
window.dataLayer = window.dataLayer || [];

// SET DEFAULT CONSENT
// ===
const defaultConsent = readConsent();

dataLayerPush('consent', 'default', {
  ad_storage: defaultConsent.marketing ? GRANTED : DENIED,
  analytics_storage: defaultConsent.statistics ? GRANTED : DENIED,
  personalization_storage: defaultConsent.preferences ? GRANTED : DENIED,
  functionality_storage: GRANTED,
  security_storage: GRANTED,
});

window.dataLayer.push({
  event: 'cookie_consent_default',
});

// Send event to dataLayer when dgp-cookie-consent is loaded and initializedocument.
window.addEventListener(EVENT_CONSENT_READY, function () {
  window.dataLayer.push({
    event: 'cookie_consent_ready',
  });
});

// Send updated consent with actual consent options.
window.addEventListener(EVENT_CONSENT_UPDATED, function () {
  // GTM consent
  dataLayerPush('consent', 'update', {
    ad_storage: window.CookieConsent.marketing ? GRANTED : DENIED,
    analytics_storage: window.CookieConsent.statistics ? GRANTED : DENIED,
    personalization_storage: window.CookieConsent.preferences ? GRANTED : DENIED,
    functionality_storage: GRANTED,
    security_storage: GRANTED,
  });

  // Custom consent from document
  window.dataLayer.push({
    event: 'cookie_consent_update',
    type: window.CookieConsent.type,
    personalization_storage: window.CookieConsent.preferences ? GRANTED : DENIED,
    ad_storage: window.CookieConsent.marketing ? GRANTED : DENIED,
    analytics_storage: window.CookieConsent.statistics ? GRANTED : DENIED,
  });
});

// Send event to dataLayer on consent window open
window.addEventListener(EVENT_CONSENT_SHOW, function () {
  window.dataLayer.push({
    event: 'cookie_consent_bar_show',
  });
});

// Send event to dataLayer on consent window close.
window.addEventListener(EVENT_CONSENT_HIDE, function () {
  window.dataLayer.push({
    event: 'cookie_consent_bar_hide',
  });
});

// Theme
window.CookieConsentTheme = {
  'base-color': '#3c3c3c',
  'border-radius': '0',

  'color-primary': '#000000',

  'button-default__bg-color': '#f3f3f2',
  'button-default__color': '#676767',
  'button-default__border': '0 none',

  'button-default--hover__bg-color': '#f3f3f2',
  'button-default--hover__color': '#676767',
  'button-default--hover__border': '0 none',
  'button-default--hover__box-shadow': 'none',

  'button-primary__bg-color': '#000000',
  'button-primary__color': '#fff',

  'button-primary--hover__bg-color': '#f3f3f2',
  'button-primary--hover__color': '#000',
  ...window.CookieConsentTheme,
};

// Translation
window.CookieConsentTranslations = window.CookieConsentTranslations || {};

// Settings
window.CookieConsentSettings = window.CookieConsentSettings || {};

// COOKIE CONSENT PANEL INITIALIZATION
// ===
const scriptEl = document.createElement('script');
scriptEl.src = 'https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.4.0/dist/cookies.min.js';
scriptEl.type = 'text/javascript';
scriptEl.id = 'cookie-consent';

document.body.appendChild(scriptEl);
