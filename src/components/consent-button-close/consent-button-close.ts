import { DIALOG_ELEMENT_NAME, EVENT_CLICK, EVENT_KEYDOWN } from '../../config';
import { translationService } from '../../services/translation-service';
import { createVElement } from '../../utils/elements';
import { dispatchEventConsentClose } from '../../utils/events';

interface ConsentModalElement extends HTMLElement {
  closeModal: () => void;
}

const i18n = translationService();

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 6 18 18M18 6 6 18"/></svg>`;

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    dispatchEventConsentClose();

    document.querySelectorAll<ConsentModalElement>(DIALOG_ELEMENT_NAME).forEach((el) => {
      el?.closeModal();
    });

    window.removeEventListener(EVENT_KEYDOWN, handleEscKey);
  }
};

export const consentButtonClose = (): HTMLButtonElement => {
  const el = createVElement<HTMLButtonElement>(
    'button',
    {
      type: 'button',
      'aria-label': i18n.buttonClose.label,
      title: i18n.buttonClose.label,
      class: 'c-b-c',
    },
    createVElement<HTMLElement>('span', { class: 'c-b-c__i' }, svgIcon),
  );

  el.addEventListener(EVENT_CLICK, () => {
    dispatchEventConsentClose();

    document.querySelectorAll<ConsentModalElement>(DIALOG_ELEMENT_NAME).forEach((el) => {
      el?.closeModal();
    });
  });

  window.addEventListener(EVENT_KEYDOWN, handleEscKey);

  return el;
};
