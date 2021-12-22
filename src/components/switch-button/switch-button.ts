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
  const labelEl = createElement('label') as HTMLLabelElement;
  const input = createElement('input') as HTMLInputElement;
  const background = createDivElement();

  labelEl.classList.add('switch-button');

  input.classList.add('switch-button__input');
  input.type = 'checkbox';
  input.checked = !!props?.checked;
  input.disabled = !!props?.disabled;

  background.classList.add('switch-button__background');
  background.innerHTML = '<div class="switch-button__point"></div>';

  input.addEventListener('change', (event) => {
    event.preventDefault();
    content.dispatchEvent(new Event('change'));
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
