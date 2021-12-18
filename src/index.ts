import { ConsentService } from './services/consent-service';
import './components/consent-dialog/consent-dialog';
import { CookieConsentTranslations } from './services/translation-service';

const cookieConsentModal = () => {
  const ui = document.createElement('consent-dialog');
  document.body.appendChild(ui);
}

interface WindowCookieConsent extends ConsentService {}

const windowCookieConsent = (): WindowCookieConsent => {

  console.log('Hello from windowCookieConsent');

  const consent = new ConsentService();

  if (!consent.updated.length) {
    cookieConsentModal();
  }

  return consent;
}

declare global {
  interface Window {
    CookieConsent: WindowCookieConsent;
    CookieConsentTranslations: CookieConsentTranslations;
    CookieConsentTheme: any;
    CookieConsentModalOpen: () => void;
  }
}

window.CookieConsent = windowCookieConsent();

window.CookieConsentModalOpen = () => {
  cookieConsentModal();
}
