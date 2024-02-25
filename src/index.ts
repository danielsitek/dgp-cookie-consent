import { ConsentService } from '@/services/consent-service';
import type { CookieConsentTranslations } from '@/services/translation-service';
import type { CookieConsentTheme } from '@/services/theme-service';
import type { CookieConsentSettings } from '@/services/settings-service';
import { initConsentModal } from '@/init/initConsentModal';
import { initConsentBadge } from '@/init/initConsentBadge';

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

window.CookieConsent = windowCookieConsent();

window.CookieConsentModalOpen = () => {
  initConsentModal();
};
