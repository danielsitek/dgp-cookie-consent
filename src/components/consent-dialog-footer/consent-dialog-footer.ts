import { createDivElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabProps extends ComponentProps {
  buttons: HTMLButtonElement[];
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  const element = createDivElement();
  element.classList.add('consent-dialog__footer');

  props.buttons.forEach((buttonElement) => {
    element.appendChild(buttonElement);
  });

  if (props.modifier) {
    element.classList.add(...props.modifier.split(' '));
  }

  return element;
};
