import { type ComponentProps, componentClassList } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { tabButtonAboutEl, tabButtonAgreeEl, tabButtonDetailsEl } from '../consent-tab/consent-tab-instances';
import { consentButtonClose } from '../consent-button-close/consent-button-close';
import { consentDialogInnerInstance } from '../consent-dialog-inner/consent-dialog-inner-instances';
import { settingsService } from '@/services/settings-service';

interface ConsentDialogProps extends ComponentProps {
  [key: string]: unknown;
}

const settings = settingsService();

export const consentDialog = (props?: ConsentDialogProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: componentClassList('c-d', 't', props?.modifier),
      role: 'dialog',
      'aria-modal': 'true',
      'aria-hidden': 'false',
      style: 'display: block;',
    },
    settings.disableHeader === true
      ? null
      : consentTabs({
          tabs: [tabButtonAgreeEl, tabButtonDetailsEl, tabButtonAboutEl, consentButtonClose()],
          modifier: 'c-d__h',
        }),
    consentDialogInnerInstance,
  );
};
