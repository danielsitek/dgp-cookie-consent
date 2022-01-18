import { ConsentService } from './services/consent-service';
import './components/consent-dialog/consent-dialog';
import { CookieConsentTranslations } from './services/translation-service';
import { CookieConsentTheme } from './services/theme-service';
import { createElement } from './utils/elements';
import { DIALOG_ELEMENT_NAME } from './config';

const cookieConsentModal = () => {
  const ui = createElement(DIALOG_ELEMENT_NAME);
  document.body.appendChild(ui);
};

type WindowCookieConsent = ConsentService;

const windowCookieConsent = (): WindowCookieConsent => {
  console.log('Hello from windowCookieConsent');

  const consent = new ConsentService();

  if (!consent.updated.length || !consent.type.length) {
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
