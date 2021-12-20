import { ConsentService } from './services/consent-service';
import './components/consent-dialog/consent-dialog';
import { CookieConsentTranslations } from './services/translation-service';
import { CookieConsentTheme } from './services/theme-service';

const cookieConsentModal = () => {
  const ui = document.createElement('consent-dialog');
  document.body.appendChild(ui);
};

type WindowCookieConsent = ConsentService;

const windowCookieConsent = (): WindowCookieConsent => {
  console.log('Hello from windowCookieConsent');

  const consent = new ConsentService();

  if (!consent.updated.length) {
    cookieConsentModal();
  }

  return consent;
};

declare global {
  interface Window {
    CookieConsent: WindowCookieConsent;
    CookieConsentTranslations: CookieConsentTranslations;
    CookieConsentTheme: CookieConsentTheme;
    CookieConsentModalOpen: () => void;
  }
}

window.CookieConsent = windowCookieConsent();

window.CookieConsentModalOpen = () => {
  cookieConsentModal();
};
