import { createVElement } from '@/utils/elements';
import { handleAnchorClicks } from '@/utils/handleBodyAnchorClicks';
import { consentDialogFooter } from '@/components/consent-dialog-footer/consent-dialog-footer';

interface TabContentDefaultProps {
  body?: string;
  buttonEdit?: HTMLButtonElement;
  buttonAllowAll?: HTMLButtonElement;
  buttons?: Array<HTMLButtonElement | boolean>;
  onAnchorClick?: (el: HTMLAnchorElement) => void;
}

const innerEl = (props: TabContentDefaultProps): HTMLDivElement => {
  return handleAnchorClicks(
    createVElement<HTMLDivElement>(
      'div',
      {
        class: 'c-d__b-i',
      },
      props.body || 'props.body',
    ),
    props,
  );
};

export const tabContentDefault = (props: TabContentDefaultProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-t-c',
      role: 'tabpanel',
    },
    createVElement<HTMLDivElement>(
      'div',
      {
        class: 'c-d__b',
      },
      innerEl(props),
    ),
    consentDialogFooter({
      buttons: props.buttons || [],
    }),
  );
};
