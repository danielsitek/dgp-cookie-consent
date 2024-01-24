import { createVElement } from '@/utils/elements';
import { handleAnchorClicks } from '@/utils/handleBodyAnchorClicks';

export interface ConsentSectionProps {
  title: string;
  perex: string;
  switch: HTMLElement;
  onAnchorClick?: (event: Event) => void;
}

export const consentSection = (props: ConsentSectionProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-s',
    },
    createVElement<HTMLDivElement>(
      'div',
      {
        class: 'c-s__i',
      },
      createVElement<HTMLDivElement>(
        'div',
        {
          class: 'c-s__a-h',
        },
        createVElement('strong', {}, props.title),
      ),
      handleAnchorClicks(
        createVElement<HTMLDivElement>(
          'div',
          {
            class: 'c-s__a-p',
          },
          props.perex,
        ),
        props,
      ),
      createVElement<HTMLDivElement>(
        'div',
        {
          class: 'c-s__a-s',
        },
        props.switch,
      ),
    ),
  );
};
