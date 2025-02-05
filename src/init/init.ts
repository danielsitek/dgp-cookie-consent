import '@/elements/consent-dialog/consent-dialog';
import '@/elements/consent-badge/consent-badge';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME, EVENT_BADGE_CLICK, EVENT_CONSENT_HIDE, EVENT_CONSENT_SHOW } from '@/config';
import { createVElement } from '@/utils/elements';
import { settingsService } from '@/services/settings-service';

interface BadgeElement extends HTMLElement {
  hideBadge: () => void;
}

const settings = settingsService();

const handleBadgeClick = (): void => {
  initConsentModal();

  window.removeEventListener(EVENT_BADGE_CLICK, handleBadgeClick);
};

const handleConsentHide = (): void => {
  initConsentBadge();

  window.removeEventListener(EVENT_CONSENT_HIDE, handleConsentHide);
};

const handleConsentShow = (): void => {
  document.querySelectorAll<BadgeElement>(BADGE_ELEMENT_NAME).forEach((badge) => {
    badge.hideBadge();
  });

  window.removeEventListener(EVENT_CONSENT_SHOW, handleConsentShow);
};

export const initConsentModal = (): void => {
  if (document.querySelectorAll(DIALOG_ELEMENT_NAME).length) {
    return;
  }

  document.body.append(createVElement(DIALOG_ELEMENT_NAME));

  window.addEventListener(EVENT_CONSENT_HIDE, handleConsentHide);

  window.addEventListener(EVENT_CONSENT_SHOW, handleConsentShow);
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
