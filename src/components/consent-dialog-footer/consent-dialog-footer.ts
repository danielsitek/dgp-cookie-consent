import { createDivElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabProps extends ComponentProps {
  buttons: HTMLButtonElement[];
}

export const consentDialogFooter = (props: ConsentTabProps): HTMLDivElement => {
  let classes = [
    'c-d__f',
  ];

  if (props.modifier) {
    classes = [
      ...classes,
      ...props.modifier.split(' '),
    ];
  }

  const element = createDivElement(classes);

  props.buttons.forEach((buttonElement) => {
    element.appendChild(buttonElement);
  });

  return element;
};
