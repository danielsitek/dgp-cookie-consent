import { componentClassList, ComponentProps } from '../../utils/component-helpers';
import { createDivElement } from '../../utils/elements';

interface ConsentTabsProps extends ComponentProps {
  tabs: HTMLElement[];
}

export const consentTabs = (props: ConsentTabsProps): HTMLDivElement => {
  const element = createDivElement(componentClassList(
    [
      'c-ts'
    ],
    props.modifier
  ));

  props.tabs.forEach((tabElement) => {
    element.appendChild(tabElement);
  });

  return element;
};
