import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  lastUpdated?: string;
  buttonRejectAll?: HTMLButtonElement;
  buttonConfirm?: HTMLButtonElement;
}

const getUpdatedDate = (): string => {
  if (!window.CookieConsent.updated.length) {
    return '';
  }

  const date = new Date(window.CookieConsent.updated);
  const localDate = new Intl.DateTimeFormat('cs-CZ').format(date);

  return localDate;
}

export const tabContentDetails = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = document.createElement('div');
  const body = document.createElement('div');
  const updated = document.createElement('div');

  content.classList.add('consent-tab-content');

  body.classList.add('consent-dialog__body');
  body.innerHTML = '<p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p><p>Body detaily.</p>';

  const buttons = [];

  if (props.buttonRejectAll) {
    buttons.push(props.buttonRejectAll);
  }

  if (props.buttonConfirm) {
    buttons.push(props.buttonConfirm);
  }

  content.appendChild(body);


  if (props.lastUpdated) {
    const updatedDate = getUpdatedDate();

    if (updatedDate.length) {
      updated.classList.add('consent-dialog__updated');
      updated.innerHTML = props.lastUpdated.replace('%date', updatedDate);
      content.appendChild(updated);
    }
  }

  content.appendChild(consentDialogFooter({
    buttons,
  }));

  return content;
}
