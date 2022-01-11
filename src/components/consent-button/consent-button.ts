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
  let classes = [
    'c-b',
    props.variant ? `c-b--${props.variant}` : null,
  ];

  if (props.modifier) {
    classes = [
      ...classes,
      ...props.modifier.split(' '),
    ];
  }

  const element = createElement('button', classes) as HTMLButtonElement;

  element.innerHTML = `<span class="c-b__i">${props.label}</span>`;

  return element;
};
