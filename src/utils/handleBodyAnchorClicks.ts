import { EVENT_CLICK } from '@/config';

interface TextAnchorClickProps {
  onAnchorClick?: (el: HTMLAnchorElement) => void;
}

const handleBodyClicks = (onAnchorClick: (el: HTMLAnchorElement) => void) => {
  return (event: Event): void => {
    if (event.target === null || !(event.target as Element).matches('a[href^="#"], a[href^="#"] *')) {
      return;
    }

    const el = (event.target as HTMLAnchorElement).closest('a');

    if (el === null) {
      return;
    }

    event.preventDefault();
    onAnchorClick(el);
  };
};

export const handleAnchorClicks = <T extends TextAnchorClickProps, E extends HTMLElement>(
  bodyEl: E,
  { onAnchorClick }: T,
): E => {
  if (onAnchorClick === undefined || typeof onAnchorClick !== 'function') {
    return bodyEl;
  }

  bodyEl.addEventListener(EVENT_CLICK, handleBodyClicks(onAnchorClick));

  return bodyEl;
};
