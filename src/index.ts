import { ConsentService } from '@/services/consent-service';
import type { CookieConsentTranslations } from '@/services/translation-service';
import type { CookieConsentTheme } from '@/services/theme-service';
import type { CookieConsentSettings } from '@/services/settings-service';
import { initConsentModal, initConsentBadge } from '@/init/init';

type WindowCookieConsent = ConsentService;

declare global {
  interface Window {
    CookieConsent: WindowCookieConsent;
    CookieConsentTranslations: CookieConsentTranslations;
    CookieConsentTheme: CookieConsentTheme;
    CookieConsentThemeDark: CookieConsentTheme;
    CookieConsentSettings: CookieConsentSettings;
    CookieConsentModalOpen: () => void;
  }
}

const windowCookieConsent = (): WindowCookieConsent => {
  const consent = new ConsentService();

  if (!consent.updated.length || !consent.type.length) {
    initConsentModal();
  } else {
    initConsentBadge();
  }

  return consent;
};

// Skip re-initialization when the script is loaded twice. CookieConsentModalOpen is set last,
// so it marks a completed init (window.CookieConsent may belong to another consent tool).
if (typeof window.CookieConsentModalOpen !== 'function') {
  window.CookieConsent = windowCookieConsent();

  window.CookieConsentModalOpen = () => {
    initConsentModal();
  };
}
