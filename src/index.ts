import { ConsentService } from './services/consent-service';
import './components/consent-dialog/consent-dialog';

const initUI = () => {
  const ui = document.createElement('consent-dialog');
  document.body.appendChild(ui);
}

interface WindowCookieConsent extends ConsentService {}

const windowCookieConsent = (): WindowCookieConsent => {

  console.log('Hello from windowCookieConsent');

  const consent = new ConsentService();

  initUI();

  return consent;
}

declare global {
  interface Window { CookieConsent: WindowCookieConsent; }
}

window.CookieConsent = windowCookieConsent();
