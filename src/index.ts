import { ConsentService } from '@/services/consent-service';
import { CookieConsentTranslations } from '@/services/translation-service';
import { CookieConsentTheme } from '@/services/theme-service';
import { CookieConsentSettings } from '@/services/settings-service';
import { initConsentModal } from '@/init/initConsentModal';
import { initConsentBadge } from '@/init/initConsentBadge';

type WindowCookieConsent = ConsentService;

const windowCookieConsent = (): WindowCookieConsent => {
  const consent = new ConsentService();

  if (!consent.updated.length || !consent.type.length) {
    initConsentModal();
  } else {
    initConsentBadge();
  }

  return consent;
};

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

window.CookieConsent = windowCookieConsent();

window.CookieConsentModalOpen = () => {
  initConsentModal();
};
