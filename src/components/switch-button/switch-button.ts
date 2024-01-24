import { EVENT_CHANGE } from '@/config';
import { createVElement } from '@/utils/elements';

interface SwitchButtonProps {
  checked?: boolean;
  disabled?: boolean;
}

export interface HTMLSwitchButtonElement extends HTMLDivElement {
  isChecked: () => boolean;
  setChecked: (value: boolean) => void;
}

const backgroundElement = (): HTMLDivElement => {
  return createVElement<HTMLDivElement>('div', { class: 's-b__b' }, createVElement('div', { class: 's-b__p' }));
};

const labelElement = (props?: SwitchButtonProps): HTMLLabelElement => {
  return createVElement<HTMLLabelElement>(
    'label',
    {
      class: 's-b',
      role: 'switch',
      'aria-checked': !!props?.checked,
    },
    backgroundElement(),
  );
};

const inputElement = (props?: SwitchButtonProps): HTMLInputElement => {
  return createVElement<HTMLInputElement>('input', {
    class: 's-b__i',
    type: 'checkbox',
    checked: !!props?.checked,
    disabled: !!props?.disabled,
  });
};

export const switchButton = (props?: SwitchButtonProps): HTMLSwitchButtonElement => {
  const content: HTMLSwitchButtonElement = createVElement<HTMLSwitchButtonElement>('div');
  const labelEl = labelElement(props);
  const input = inputElement(props);

  input.addEventListener(EVENT_CHANGE, (event): void => {
    event.preventDefault();
    labelEl.setAttribute('aria-checked', `${(event.target as HTMLInputElement).checked}`);
    content.dispatchEvent(new Event(EVENT_CHANGE));
  });

  labelEl.prepend(input);

  content.append(labelEl);

  content.isChecked = () => {
    return input.checked;
  };

  content.setChecked = (value) => {
    input.checked = value;
    labelEl.setAttribute('aria-checked', `${value}`);
  };

  return content;
};
