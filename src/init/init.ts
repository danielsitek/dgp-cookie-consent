import '@/elements/consent-dialog/consent-dialog';
import '@/elements/consent-badge/consent-badge';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME, EVENT_BADGE_CLICK, EVENT_CONSENT_HIDE, EVENT_CONSENT_SHOW } from '@/config';
import { createVElement } from '@/utils/elements';
import { onBodyReady } from '@/utils/body-ready';
import { settingsService } from '@/services/settings-service';
import type { ConsentDialog } from '@/elements/consent-dialog/consent-dialog';

interface BadgeElement extends HTMLElement {
  hideBadge: () => void;
}

const settings = settingsService();

const handleBadgeClick = (): void => {
  initConsentModal();

  window.removeEventListener(EVENT_BADGE_CLICK, handleBadgeClick);
};

const handleConsentHide = (): void => {
  // The dialog was reopened right after closing, keep waiting for it to close.
  if (document.querySelector(DIALOG_ELEMENT_NAME)) {
    return;
  }

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
  onBodyReady(() => {
    const dialog = document.querySelector<ConsentDialog>(DIALOG_ELEMENT_NAME);

    // Opened during the close animation: reopen once the closing dialog is removed.
    if (dialog?.isClosing) {
      dialog.whenClosed().then(initConsentModal);
      return;
    }

    // Checked when inserting, so repeated calls before <body> exists add a single dialog.
    if (dialog) {
      return;
    }

    document.body.append(createVElement(DIALOG_ELEMENT_NAME));

    window.addEventListener(EVENT_CONSENT_HIDE, handleConsentHide);

    window.addEventListener(EVENT_CONSENT_SHOW, handleConsentShow);
  });
};

export const initConsentBadge = (): void => {
  if (settings.disableBadge === true) {
    return;
  }

  onBodyReady(() => {
    if (document.querySelectorAll(BADGE_ELEMENT_NAME).length) {
      return;
    }

    window.addEventListener(EVENT_BADGE_CLICK, handleBadgeClick);

    document.body.append(createVElement(BADGE_ELEMENT_NAME));
  });
};
