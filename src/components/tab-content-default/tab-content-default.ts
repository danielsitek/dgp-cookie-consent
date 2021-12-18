import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  body?: string;
  buttonEdit?: HTMLButtonElement;
  buttonAllowAll?: HTMLButtonElement;
}

export const tabContentDefault = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = document.createElement('div');
    const body = document.createElement('div');
    body.classList.add('consent-dialog__body');
    body.innerHTML = props.body || 'props.body';

    const buttons = [];

    if (props.buttonEdit) {
      buttons.push(props.buttonEdit);
    }

    if (props.buttonAllowAll) {
      buttons.push(props.buttonAllowAll);
    }

    content.appendChild(body);
    content.appendChild(consentDialogFooter({
      buttons,
    }));

    return content;
}
