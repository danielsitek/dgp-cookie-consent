import { EVENT_CLICK } from '@/config';
import { componentClassList, ComponentProps } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentButtonProps extends ComponentProps {
  label: string;
  variant?: 'd' | 'p';
  onClick?: () => void;
}

export const BUTTON_DEFAULT = 'd';
export const BUTTON_PRIMARY = 'p';

export const consentButton = (props: ConsentButtonProps): HTMLButtonElement => {
  const element = createVElement<HTMLButtonElement>(
    'button',
    {
      class: componentClassList(
        ['c-b', props.variant ? `c-b--${props.variant}` : `c-b--${BUTTON_DEFAULT}`],
        props.modifier,
      ).join(' '),
    },
    createVElement(
      'span',
      {
        class: 'c-b__i',
      },
      props.label,
    ),
  );

  element.addEventListener(EVENT_CLICK, () => {
    if (props.onClick !== undefined && typeof props.onClick === 'function') {
      props.onClick();
    }
  });

  return element;
};

export const consentButtonPrimary = (props: ConsentButtonProps): HTMLButtonElement => {
  return consentButton({
    ...props,
    variant: BUTTON_PRIMARY,
  });
};
