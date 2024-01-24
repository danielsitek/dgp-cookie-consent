import '@/elements/consent-badge/consent-badge';
import { BADGE_ELEMENT_NAME, EVENT_BADGE_CLICK } from '@/config';
import { settingsService } from '@/services/settings-service';
import { initConsentModal } from './initConsentModal';
import { createVElement } from '@/utils/elements';

const settings = settingsService();

const handleBadgeClick = (): void => {
  initConsentModal();

  window.removeEventListener(EVENT_BADGE_CLICK, handleBadgeClick);
};

export const initConsentBadge = (): void => {
  if (settings.disableBadge === true) {
    return;
  }

  if (document.querySelectorAll(BADGE_ELEMENT_NAME).length) {
    return;
  }

  window.addEventListener(EVENT_BADGE_CLICK, handleBadgeClick);

  document.body.append(createVElement(BADGE_ELEMENT_NAME));
};
