import { componentClassList, ComponentProps } from '../../utils/component-helpers';
import { createDivElement } from '../../utils/elements';

interface ConsentTabProps extends ComponentProps {
  buttons: HTMLButtonElement[];
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  const element = createDivElement(componentClassList(
    [
      'c-d__f',
    ],
    props.modifier
  ));

  props.buttons.forEach((buttonElement) => {
    element.appendChild(buttonElement);
  });

  return element;
};
