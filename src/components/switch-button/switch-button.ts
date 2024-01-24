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

export const switchButton = (props?: SwitchButtonProps): HTMLSwitchButtonElement => {
  const content: HTMLSwitchButtonElement = createVElement<HTMLSwitchButtonElement>('div');

  const labelEl = createVElement<HTMLLabelElement>('label', {
    class: 's-b',
    role: 'switch',
    'aria-checked': !!props?.checked,
  });

  const input = createVElement<HTMLInputElement>('input', {
    class: 's-b__i',
    type: 'checkbox',
    checked: !!props?.checked,
    disabled: !!props?.disabled,
  });

  const background = createVElement<HTMLDivElement>(
    'div',
    { class: 's-b__b' },
    createVElement('div', { class: 's-b__p' }),
  );

  input.addEventListener(EVENT_CHANGE, (event): void => {
    event.preventDefault();
    labelEl.setAttribute('aria-checked', `${(event.target as HTMLInputElement).checked}`);
    content.dispatchEvent(new Event(EVENT_CHANGE));
  });

  labelEl.append(input);
  labelEl.append(background);

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
