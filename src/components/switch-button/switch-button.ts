import { EVENT_CHANGE } from '@/config';
import { createVElement } from '@/utils/elements';

interface SwitchButtonProps {
  checked?: boolean;
  disabled?: boolean;
  labeledBy?: string;
}

export interface HTMLSwitchButtonElement extends HTMLDivElement {
  isChecked: () => boolean;
  setChecked: (value: boolean) => void;
}

const backgroundElement = (): HTMLDivElement => {
  return createVElement<HTMLDivElement>('div', { class: 's-b__b' }, createVElement('div', { class: 's-b__p' }));
};

const labelElement = (): HTMLLabelElement => {
  return createVElement<HTMLLabelElement>(
    'label',
    {
      class: 's-b',
    },
    backgroundElement(),
  );
};

const inputElement = (props?: SwitchButtonProps): HTMLInputElement => {
  return createVElement<HTMLInputElement>('input', {
    class: 's-b__i',
    type: 'checkbox',
    role: 'switch',
    checked: !!props?.checked,
    disabled: !!props?.disabled,
    'aria-labelledby': props?.labeledBy,
  });
};

export const switchButton = (props?: SwitchButtonProps): HTMLSwitchButtonElement => {
  const content: HTMLSwitchButtonElement = createVElement<HTMLSwitchButtonElement>('div');
  const labelEl = labelElement();
  const input = inputElement(props);

  input.addEventListener(EVENT_CHANGE, (event): void => {
    event.preventDefault();
    content.dispatchEvent(new Event(EVENT_CHANGE));
  });

  labelEl.prepend(input);

  content.append(labelEl);

  content.isChecked = () => {
    return input.checked;
  };

  content.setChecked = (value) => {
    input.checked = value;
  };

  return content;
};
