import '@/elements/consent-dialog/consent-dialog';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME, EVENT_CONSENT_HIDE, EVENT_CONSENT_SHOW } from '@/config';
import { initConsentBadge } from './initConsentBadge';
import { createVElement } from '@/utils/elements';

interface BadgeElement extends HTMLElement {
  hideBadge: () => void;
}

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
