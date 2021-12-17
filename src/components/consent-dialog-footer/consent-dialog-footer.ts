interface ComponentProps {
  modifier?: string
}

interface ConsentTabProps extends ComponentProps {
  buttons: HTMLButtonElement[]
}

export const consentDialogFooter = (props: ConsentTabProps) => {
  const element = document.createElement('div');
  element.classList.add('consent-dialog__footer');

  const spacer = document.createElement('div');
  spacer.classList.add('spacer');

  element.appendChild(spacer);

  props.buttons.forEach((buttonElement) => {
    element.appendChild(buttonElement);
  });

  if (props.modifier) {
    props.modifier.split(' ').forEach((modifier) => {
      element.classList.add(modifier);
    });
  }

  return element;
}
