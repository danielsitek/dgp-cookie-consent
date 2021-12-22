import { createDivElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabsProps extends ComponentProps {
  tabs: HTMLElement[];
}

export const consentTabs = (props: ConsentTabsProps) => {
  const element = createDivElement();
  element.classList.add('consent-tabs');

  props.tabs.forEach((tabElement) => {
    element.appendChild(tabElement);
  });

  if (props.modifier) {
    props.modifier.split(' ').forEach((modifier) => {
      element.classList.add(modifier);
    });
  }

  return element;
};
