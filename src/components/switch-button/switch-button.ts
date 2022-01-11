import { EVENT_CHANGE } from '../../config';
import { createElement, createDivElement } from '../../utils/elements';

interface SwitchButtonProps {
  checked?: boolean;
  disabled?: boolean;
}

export interface HTMLSwitchButtonElement extends HTMLDivElement {
  isChecked: () => boolean;
  setChecked: (value: boolean) => void;
}

export const switchButton = (props?: SwitchButtonProps): HTMLSwitchButtonElement => {
  const content: HTMLSwitchButtonElement = createDivElement() as HTMLSwitchButtonElement;
  const labelEl = createElement('label', ['s-b']) as HTMLLabelElement;
  const input = createElement('input', ['s-b__i']) as HTMLInputElement;
  const background = createDivElement(['s-b__b']);

  input.type = 'checkbox';
  input.checked = !!props?.checked;
  input.disabled = !!props?.disabled;

  background.innerHTML = '<div class="s-b__p"></div>';

  input.addEventListener(EVENT_CHANGE, (event) => {
    event.preventDefault();
    content.dispatchEvent(new Event(EVENT_CHANGE));
  });

  labelEl.appendChild(input);
  labelEl.appendChild(background);

  content.appendChild(labelEl);

  content.isChecked = () => {
    return input.checked;
  };

  content.setChecked = (value) => {
    input.checked = value;
  };

  return content;
};
