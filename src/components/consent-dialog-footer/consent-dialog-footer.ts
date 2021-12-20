interface ComponentProps {
  modifier?: string;
}

interface ConsentTabProps extends ComponentProps {
  buttons: HTMLButtonElement[];
}

export const consentDialogFooter = (props: ConsentTabProps) => {
  const element = document.createElement('div');
  element.classList.add('consent-dialog__footer');

  props.buttons.forEach((buttonElement) => {
    element.appendChild(buttonElement);
  });

  if (props.modifier) {
    props.modifier.split(' ').forEach((modifier) => {
      element.classList.add(modifier);
    });
  }

  return element;
};
