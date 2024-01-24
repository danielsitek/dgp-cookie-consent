import { EVENT_CLICK } from '@/config';

interface TextAnchorClickProps {
  onAnchorClick?: (event: Event) => void;
}

export const handleAnchorClicks = <T extends TextAnchorClickProps, E extends HTMLElement>(
  bodyEl: E,
  { onAnchorClick }: T,
): E => {
  if (onAnchorClick === undefined || typeof onAnchorClick !== 'function') {
    return bodyEl;
  }

  bodyEl.addEventListener(EVENT_CLICK, (event): void => {
    if (event.target === null) {
      return;
    }

    if ((event.target as Element).matches('a[href^="#"], a[href^="#"] *')) {
      event.preventDefault();
      onAnchorClick(event);
    }
  });

  return bodyEl;
};
