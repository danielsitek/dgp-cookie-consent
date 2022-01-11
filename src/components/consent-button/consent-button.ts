import { createElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'd' | 'p';
}

export const BUTTON_DEFAULT = 'd';
export const BUTTON_PRIMARY = 'p';

export const consentButton = (props: ConsentButtonProps): HTMLButtonElement => {
  const element = createElement('button') as HTMLButtonElement;

  element.innerHTML = `<span class="c-b__i">${props.label}</span>`;

  element.classList.add('c-b');

  if (props.variant) {
    element.classList.add(`c-b--${props.variant}`);
  }

  if (props.modifier) {
    element.classList.add(...props.modifier.split(' '));
  }

  return element;
};
