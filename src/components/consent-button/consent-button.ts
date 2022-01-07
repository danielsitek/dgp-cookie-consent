import { createElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'default' | 'primary';
}

export const consentButton = (props: ConsentButtonProps): HTMLButtonElement => {
  const element = createElement('button') as HTMLButtonElement;

  element.innerHTML = `<span class="consent-button__inner">${props.label}</span>`;

  element.classList.add('consent-button');

  if (props.variant) {
    element.classList.add(`consent-button--${props.variant}`);
  }

  if (props.modifier) {
    element.classList.add(...props.modifier.split(' '));
  }

  return element;
};
