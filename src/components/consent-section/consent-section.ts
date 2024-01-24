import { createVElement } from '@/utils/elements';
import { handleAnchorClicks } from '@/utils/handleBodyAnchorClicks';

export interface ConsentSectionProps {
  title: string;
  perex: string;
  switch: HTMLElement;
  onAnchorClick?: (el: HTMLAnchorElement) => void;
}

const headerEl = (props: ConsentSectionProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-s__a-h',
    },
    createVElement('strong', {}, props.title),
  );
};

const perexEl = (props: ConsentSectionProps): HTMLDivElement => {
  return handleAnchorClicks(
    createVElement<HTMLDivElement>(
      'div',
      {
        class: 'c-s__a-p',
      },
      props.perex,
    ),
    props,
  );
};

const switchEl = (props: ConsentSectionProps): HTMLDivElement => {
  return createVElement<HTMLDivElement>(
    'div',
    {
      class: 'c-s__a-s',
    },
    props.switch,
  );
};

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
      headerEl(props),
      perexEl(props),
      switchEl(props),
    ),
  );
};
