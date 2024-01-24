import { EVENT_CLICK } from '@/config';
import { componentClassList, ComponentProps } from '../../utils/component-helpers';
import { createElement } from '../../utils/elements';

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'd' | 'p';
  onClick?: () => void;
}

export const BUTTON_DEFAULT = 'd';
export const BUTTON_PRIMARY = 'p';

export const consentButton = (props: ConsentButtonProps): HTMLButtonElement => {
  const element = createElement(
    'button',
    componentClassList(['c-b', props.variant ? `c-b--${props.variant}` : ''], props.modifier),
  ) as HTMLButtonElement;

  element.innerHTML = `<span class="c-b__i">${props.label}</span>`;

  element.addEventListener(EVENT_CLICK, () => {
    if (props.onClick !== undefined && typeof props.onClick === 'function') {
      props.onClick();
    }
  });

  return element;
};
