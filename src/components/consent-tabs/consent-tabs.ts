import { componentClassList, type ComponentProps } from '@/utils/component-helpers';
import { createVElement } from '@/utils/elements';

interface ConsentTabsProps extends ComponentProps {
  tabs: (HTMLElement | null)[];
}

export const consentTabs = (props: ConsentTabsProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: componentClassList('c-ts', props.modifier),
      role: 'tablist',
    },
    ...props.tabs,
  );
};
