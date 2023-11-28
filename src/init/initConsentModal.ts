import '../components/consent-dialog/consent-dialog';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME, EVENT_CONSENT_HIDE, EVENT_CONSENT_SHOW } from '../config';

interface BadgeElement extends HTMLElement {
  hideBadge: () => void;
}

const handleConsentHide = () => {
  window.CookieConsentBadgeOpen();

  window.removeEventListener(EVENT_CONSENT_HIDE, handleConsentHide);
};

const handleConsentShow = () => {
  (document.querySelectorAll(BADGE_ELEMENT_NAME) as NodeListOf<BadgeElement>).forEach((badge: BadgeElement) => {
    badge.hideBadge();
  });

  window.removeEventListener(EVENT_CONSENT_SHOW, handleConsentShow);
};

export const initConsentModal = () => {
  if (document.querySelectorAll(DIALOG_ELEMENT_NAME).length) {
    return;
  }

  const ui = document.createElement(DIALOG_ELEMENT_NAME);
  document.body.appendChild(ui);

  window.addEventListener(EVENT_CONSENT_HIDE, handleConsentHide);

  window.addEventListener(EVENT_CONSENT_SHOW, handleConsentShow);
};
