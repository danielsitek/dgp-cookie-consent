import '../components/consent-badge/consent-badge';
import { BADGE_ELEMENT_NAME, EVENT_BADGE_CLICK } from '../config';
import { settingsService } from '../services/settings-service';
import { initConsentModal } from './initConsentModal';

const settings = settingsService();

const handleBadgeClick = () => {
  initConsentModal();

  window.removeEventListener(EVENT_BADGE_CLICK, handleBadgeClick);
};

export const initConsentBadge = () => {
  if (settings.disableBadge === true) {
    return;
  }

  if (document.querySelectorAll(BADGE_ELEMENT_NAME).length) {
    return;
  }

  window.addEventListener(EVENT_BADGE_CLICK, handleBadgeClick);

  const badge = document.createElement(BADGE_ELEMENT_NAME);
  document.body.appendChild(badge);
};
