import { createDivElement } from '../../utils/elements';
import { handleAnchorClicks } from '../../utils/handleBodyAnchorClicks';

export interface ConsentSectionProps {
  title: string;
  perex: string;
  switch: HTMLElement;
  onAnchorClick?: (event: Event) => void;
}

export const consentSection = (props: ConsentSectionProps): HTMLDivElement => {
  const content = createDivElement(['c-s']);
  const inner = createDivElement(['c-s__i']);
  const header = createDivElement(['c-s__a-h']);
  const perex = createDivElement(['c-s__a-p']);
  const switchContainer = createDivElement(['c-s__a-s']);

  header.innerHTML = `<strong>${props.title}</strong>`;

  perex.innerHTML = props.perex;

  handleAnchorClicks(perex, props);

  switchContainer.appendChild(props.switch);

  inner.appendChild(header);
  inner.appendChild(perex);
  inner.appendChild(switchContainer);

  content.appendChild(inner);

  return content;
};
