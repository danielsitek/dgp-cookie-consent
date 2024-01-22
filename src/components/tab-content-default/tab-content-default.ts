import { createDivElement } from '../../utils/elements';
import { handleBodyAnchorClicks } from '../../utils/handleBodyAnchorClicks';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  body?: string;
  buttonEdit?: HTMLButtonElement;
  buttonAllowAll?: HTMLButtonElement;
  buttons?: Array<HTMLButtonElement | boolean>;
  onAnchorClick?: (event: Event) => void;
}

export const tabContentDefault = (props: TabContentDefaultProps): HTMLDivElement => {
  const content = createDivElement(['c-t-c']);
  const body = createDivElement(['c-d__b']);
  const inner = createDivElement(['c-d__b-i']);

  inner.innerHTML = props.body || 'props.body';
  content.setAttribute('role', 'tabpanel');

  handleBodyAnchorClicks(inner, props);

  body.appendChild(inner);
  content.appendChild(body);
  content.appendChild(
    consentDialogFooter({
      buttons: props.buttons || [],
    }),
  );

  return content;
};
