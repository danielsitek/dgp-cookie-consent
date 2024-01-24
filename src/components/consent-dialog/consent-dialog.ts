import { ComponentProps, componentClassList } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentDialogProps extends ComponentProps {
  [key: string]: unknown;
}

export const consentDialog = (props?: ConsentDialogProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>('div', {
    class: componentClassList(['c-d', 't'], props?.modifier).join(' '),
    role: 'dialog',
    'aria-modal': 'true',
    'aria-hidden': 'false',
    style: 'display: block;',
  });
};
