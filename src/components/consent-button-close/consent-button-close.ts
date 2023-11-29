import { DIALOG_ELEMENT_NAME, EVENT_CLICK } from '../../config';
import { translationService } from '../../services/translation-service';
import { createVElement } from '../../utils/elements';
import { dispatchEventConsentClose } from '../../utils/events';

interface ConsentModalElement extends HTMLElement {
  closeModal: () => void;
}

const i18n = translationService();

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32">
<path fill="currentColor" d="M6.808 6.808a1 1 0 0 0 0 1.414L14.586 16l-7.778 7.778a1 1 0 1 0 1.414 1.414L16 17.414l7.778 7.778a1 1 0 0 0 1.414-1.414L17.414 16l7.778-7.778a1 1 0 0 0-1.414-1.414L16 14.586 8.222 6.808a1 1 0 0 0-1.414 0Z"/>
</svg>`;

const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    dispatchEventConsentClose();

    document.querySelectorAll<ConsentModalElement>(DIALOG_ELEMENT_NAME).forEach((el) => {
      el?.closeModal();
    });

    window.removeEventListener('keydown', handleEscKey);
  }
};

export const consentButtonClose = () => {
  const el = createVElement(
    'button',
    {
      type: 'button',
      'aria-label': i18n.buttonClose.label,
      title: i18n.buttonClose.label,
      class: 'c-b-c',
    },
    createVElement('span', { class: 'c-b-c__i' }, svgIcon),
  );

  el.addEventListener(EVENT_CLICK, () => {
    dispatchEventConsentClose();

    document.querySelectorAll<ConsentModalElement>(DIALOG_ELEMENT_NAME).forEach((el) => {
      el?.closeModal();
    });
  });

  window.addEventListener('keydown', handleEscKey);

  return el;
};
