import { EVENT_CLICK } from '../config';

interface TextAnchorClickProps {
  onAnchorClick?: (event: Event) => void;
}

export const handleBodyAnchorClicks = <T extends TextAnchorClickProps>(bodyEl: HTMLElement, { onAnchorClick }: T) => {
  if (onAnchorClick === undefined || typeof onAnchorClick !== 'function') {
    return;
  }

  bodyEl.addEventListener(EVENT_CLICK, (event) => {
    if (event.target === null) {
      return;
    }

    if ((event.target as Element).matches('a, a *')) {
      onAnchorClick(event);
    }
  });
};
