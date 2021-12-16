import { ConsentService } from './services/consent-service';

interface WindowCookieConsent extends ConsentService {}

const windowCookieConsent = (): WindowCookieConsent => {

  console.log('Hello from windowCookieConsent');

  const consent = new ConsentService();

  return consent;
}

declare global {
  interface Window { CookieConsent: WindowCookieConsent; }
}

window.CookieConsent = windowCookieConsent();
