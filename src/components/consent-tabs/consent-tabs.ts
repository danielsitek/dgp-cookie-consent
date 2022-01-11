import { createDivElement } from '../../utils/elements';

interface ComponentProps {
  modifier?: string;
}

interface ConsentTabsProps extends ComponentProps {
  tabs: HTMLElement[];
}

export const consentTabs = (props: ConsentTabsProps): HTMLDivElement => {
  let classes = [
    'c-ts',
  ];

  if (props.modifier) {
    classes = [
      ...classes,
      ...props.modifier.split(' '),
    ];
  }

  const element = createDivElement(classes);

  props.tabs.forEach((tabElement) => {
    element.appendChild(tabElement);
  });

  return element;
};
