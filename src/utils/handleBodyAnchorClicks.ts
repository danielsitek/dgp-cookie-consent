import { EVENT_CLICK } from '../config';

interface TextAnchorClickProps {
  onAnchorClick?: (event: Event) => void;
}

export const handleAnchorClicks = <T extends TextAnchorClickProps>(bodyEl: HTMLElement, { onAnchorClick }: T): void => {
  if (onAnchorClick === undefined || typeof onAnchorClick !== 'function') {
    return;
  }

  bodyEl.addEventListener(EVENT_CLICK, (event): void => {
    if (event.target === null) {
      return;
    }

    if ((event.target as Element).matches('a[href^="#"], a[href^="#"] *')) {
      onAnchorClick(event);
    }
  });
};
