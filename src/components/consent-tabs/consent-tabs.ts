import { componentClassList, ComponentProps } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentTabsProps extends ComponentProps {
  tabs: HTMLElement[];
}

export const consentTabs = (props: ConsentTabsProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: componentClassList(['c-ts'], props.modifier).join(' '),
      role: 'tablist',
    },
    ...props.tabs,
  );
};
