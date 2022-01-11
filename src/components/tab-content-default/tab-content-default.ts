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

  content.classList.add('c-t-c');

  body.classList.add('c-d__b');
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
