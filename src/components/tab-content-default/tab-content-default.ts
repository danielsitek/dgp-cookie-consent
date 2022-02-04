import { createDivElement } from '../../utils/elements';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  body?: string;
  buttonEdit?: HTMLButtonElement;
  buttonAllowAll?: HTMLButtonElement;
  buttons?: Array<HTMLButtonElement | boolean>;
}

export const tabContentDefault = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement(['c-t-c']);
  const body = createDivElement(['c-d__b']);

  body.innerHTML = props.body || 'props.body';
  content.setAttribute('role', 'tabpanel');

  content.appendChild(body);
  content.appendChild(
    consentDialogFooter({
      buttons: props.buttons || [],
    }),
  );

  return content;
};
