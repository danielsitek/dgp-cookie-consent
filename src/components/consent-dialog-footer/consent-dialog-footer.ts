import { componentClassList, ComponentProps } from '../../utils/component-helpers';
import { createDivElement } from '../../utils/elements';

interface ConsentTabProps extends ComponentProps {
  buttons: Array<HTMLButtonElement | boolean>;
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  const element = createDivElement(componentClassList(
    [
      'c-d__f',
    ],
    props.modifier
  ));

  props.buttons.filter(e => e).forEach((buttonElement) => {
    if (typeof buttonElement === 'boolean') {
      return;
    }

    element.appendChild(buttonElement);
  });

  return element;
};
