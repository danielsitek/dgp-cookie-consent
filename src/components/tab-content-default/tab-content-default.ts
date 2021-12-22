import { createDivElement } from '../../utils/elements';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  body?: string;
  buttonEdit?: HTMLButtonElement;
  buttonAllowAll?: HTMLButtonElement;
}

export const tabContentDefault = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement();
  const body = createDivElement();

  content.classList.add('consent-tab-content');

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
  content.appendChild(
    consentDialogFooter({
      buttons,
    }),
  );

  return content;
};
