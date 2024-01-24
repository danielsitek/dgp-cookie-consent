import { ComponentProps, componentClassList } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { tabButtonAboutEl, tabButtonAgreeEl, tabButtonDetailsEl } from '../consent-tab/consent-tab-instances';
import { consentButtonClose } from '../consent-button-close/consent-button-close';
import { consentDialogInnerInstance } from '../consent-dialog-inner/consent-dialog-inner-instances';

interface ConsentDialogProps extends ComponentProps {
  [key: string]: unknown;
}

export const consentDialog = (props?: ConsentDialogProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: componentClassList(['c-d', 't'], props?.modifier).join(' '),
      role: 'dialog',
      'aria-modal': 'true',
      'aria-hidden': 'false',
      style: 'display: block;',
    },
    consentTabs({
      tabs: [tabButtonAgreeEl, tabButtonDetailsEl, tabButtonAboutEl, consentButtonClose()],
      modifier: 'c-d__h',
    }),
    consentDialogInnerInstance,
  );
};
