import { createDivElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabsProps extends ComponentProps {
  tabs: HTMLElement[];
}

export const consentTabs = (props: ConsentTabsProps): HTMLDivElement => {
  const element = createDivElement();
  element.classList.add('consent-tabs');

  props.tabs.forEach((tabElement) => {
    element.appendChild(tabElement);
  });

  if (props.modifier) {
    element.classList.add(...props.modifier.split(' '));
  }

  return element;
};
