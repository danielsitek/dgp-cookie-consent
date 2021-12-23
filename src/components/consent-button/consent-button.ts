import { createElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'default' | 'primary';
}

export const consentButton = (props: ConsentButtonProps) => {
  const element = createElement('button') as HTMLButtonElement;

  element.innerHTML = `
    <span class="consent-button__inner">${props.label}</span>
  `;

  element.classList.add('consent-button');

  if (props.variant) {
    element.classList.add(`consent-button--${props.variant}`);
  }

  if (props.modifier) {
    props.modifier.split(' ').forEach((modifier) => {
      element.classList.add(modifier);
    });
  }

  return element;
};