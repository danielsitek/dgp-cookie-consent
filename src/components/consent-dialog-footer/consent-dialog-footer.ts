import { componentClassList, ComponentProps } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentTabProps extends ComponentProps {
  buttons: Array<HTMLButtonElement | boolean>;
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  const element = createVElement<HTMLDivElement>('div', {
    class: componentClassList(['c-d__f'], props.modifier).join(' '),
  });

  props.buttons
    .filter((e) => e)
    .forEach((buttonElement) => {
      if (typeof buttonElement === 'boolean') {
        return;
      }

      element.append(buttonElement);
    });

  return element;
};
