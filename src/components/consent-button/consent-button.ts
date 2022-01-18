import { componentClassList, ComponentProps } from '../../utils/component-helpers';
import { createElement } from '../../utils/elements';

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'd' | 'p';
}

export const BUTTON_DEFAULT = 'd';
export const BUTTON_PRIMARY = 'p';

export const consentButton = (props: ConsentButtonProps): HTMLButtonElement => {
  const element = createElement('button', componentClassList(
    [
      'c-b',
      props.variant ? `c-b--${props.variant}` : '',
    ],
    props.modifier
  )) as HTMLButtonElement;

  element.innerHTML = `<span class="c-b__i">${props.label}</span>`;

  return element;
};
