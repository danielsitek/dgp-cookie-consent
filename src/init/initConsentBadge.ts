import '../components/consent-badge/consent-badge';
import { BADGE_ELEMENT_NAME, EVENT_BADGE_CLICK } from '../config';

const handleBadgeClick = () => {
  window.CookieConsentModalOpen();

  window.removeEventListener(EVENT_BADGE_CLICK, handleBadgeClick);
};

export const initConsentBadge = () => {
  if (document.querySelectorAll(BADGE_ELEMENT_NAME).length) {
    return;
  }

  window.addEventListener(EVENT_BADGE_CLICK, handleBadgeClick);

  const badge = document.createElement(BADGE_ELEMENT_NAME);
  document.body.appendChild(badge);
};
