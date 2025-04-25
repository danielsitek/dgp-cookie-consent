import {
  DENIED,
  EVENT_BADGE_CLICK,
  EVENT_BADGE_HIDE,
  EVENT_BADGE_SHOW,
  EVENT_CONSENT_CLOSE,
  EVENT_CONSENT_HIDE,
  EVENT_CONSENT_READY,
  EVENT_CONSENT_SHOW,
  EVENT_CONSENT_UPDATED,
  GRANTED,
} from '@/config';
import { dataLayerPush } from '@/utils/data-layer-push';
import { getDefaultConsent } from '@/utils/read-consent';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

// SET DEFAULT CONSENT
// ===
const defaultConsent = getDefaultConsent();

dataLayerPush('consent', 'default', {
  ad_storage: defaultConsent.marketing ? GRANTED : DENIED,
  ad_user_data: defaultConsent.marketing ? GRANTED : DENIED,
  ad_personalization: defaultConsent.marketing ? GRANTED : DENIED,
  analytics_storage: defaultConsent.statistics ? GRANTED : DENIED,
  personalization_storage: defaultConsent.preferences ? GRANTED : DENIED,
  functionality_storage: GRANTED,
  security_storage: GRANTED,
});

// window.dataLayer.push({
dataLayerPush({
  event: 'cookie_consent_default',
});

// Send event to dataLayer when dgp-cookie-consent is loaded and initializedocument.
window.addEventListener(EVENT_CONSENT_READY, function () {
  // window.dataLayer.push({
  dataLayerPush({
    event: 'cookie_consent_ready',
  });
});

// Send updated consent with actual consent options.
window.addEventListener(EVENT_CONSENT_UPDATED, function () {
  // GTM consent
  dataLayerPush('consent', 'update', {
    ad_storage: window.CookieConsent.marketing ? GRANTED : DENIED,
    ad_user_data: window.CookieConsent.marketing ? GRANTED : DENIED,
    ad_personalization: window.CookieConsent.marketing ? GRANTED : DENIED,
    analytics_storage: window.CookieConsent.statistics ? GRANTED : DENIED,
    personalization_storage: window.CookieConsent.preferences ? GRANTED : DENIED,
    functionality_storage: GRANTED,
    security_storage: GRANTED,
  });

  // Custom consent from document
  dataLayerPush({
    event: 'cookie_consent_update',
    type: window.CookieConsent.type,
    personalization_storage: window.CookieConsent.preferences ? GRANTED : DENIED,
    ad_storage: window.CookieConsent.marketing ? GRANTED : DENIED,
    ad_user_data: window.CookieConsent.marketing ? GRANTED : DENIED,
    ad_personalization: window.CookieConsent.marketing ? GRANTED : DENIED,
    analytics_storage: window.CookieConsent.statistics ? GRANTED : DENIED,
  });
});

// Send event to dataLayer on consent window open
window.addEventListener(EVENT_CONSENT_SHOW, function () {
  dataLayerPush({
    event: 'cookie_consent_bar_show',
  });
});

// Send event to dataLayer on consent window close.
window.addEventListener(EVENT_CONSENT_HIDE, function () {
  dataLayerPush({
    event: 'cookie_consent_bar_hide',
  });
});

// Send event to dataLayer on consent window close by cross/ESC.
window.addEventListener(EVENT_CONSENT_CLOSE, function () {
  dataLayerPush({
    event: 'cookie_consent_bar_close',
  });
});

// Send event to dataLayer on consent badge show.
window.addEventListener(EVENT_BADGE_SHOW, function () {
  dataLayerPush({
    event: 'cookie_consent_badge_show',
  });
});

// Send event to dataLayer on consent badge hide.
window.addEventListener(EVENT_BADGE_HIDE, function () {
  dataLayerPush({
    event: 'cookie_consent_badge_hide',
  });
});

// Send event to dataLayer on consent badge click.
window.addEventListener(EVENT_BADGE_CLICK, function () {
  dataLayerPush({
    event: 'cookie_consent_badge_click',
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

  badge__color: '#000000',

  'base-link__color': '#000000',
  'base-link__text-decoration': 'underline',
  'base-link--hover__color': '#3c3c3c',
  'base-link--hover__text-decoration': 'underline',
  ...window.CookieConsentTheme,
};

// Darkmode theme
window.CookieConsentThemeDark = window.CookieConsentThemeDark || {};

// Translation
window.CookieConsentTranslations = window.CookieConsentTranslations || {};

// Settings
window.CookieConsentSettings = {
  ...window.CookieConsentSettings,
  tabDetails: {
    showButtonAllowAll: false,
    ...(window.CookieConsentSettings.tabDetails || {}),
  },
};

// COOKIE CONSENT PANEL INITIALIZATION
// ===
const scriptEl = document.createElement('script');
scriptEl.src = 'https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@latest/dist/cookies.min.js';
scriptEl.type = 'text/javascript';
scriptEl.id = 'cookie-consent';
scriptEl.defer = true;

document.body.appendChild(scriptEl);

// Handle click on the button with class "js-consent-open" to open the consent modal.
document.body.addEventListener('click', function (event) {
  const target = event.target as HTMLElement;

  if (target && target.classList.contains('js-consent-open')) {
    if (window.CookieConsentModalOpen) {
      event.preventDefault();
      window.CookieConsentModalOpen();
    }
  }
});
