import { componentClassList, ComponentProps } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentTabProps extends ComponentProps {
  buttons: Array<HTMLButtonElement | boolean>;
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: componentClassList(['c-d__f'], props.modifier).join(' '),
    },
    ...props.buttons,
  );
};
