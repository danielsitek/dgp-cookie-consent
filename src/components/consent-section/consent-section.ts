import { createDivElement } from '../../utils/elements';

export interface ConsentSectionProps {
  title: string;
  perex: string;
  switch: HTMLElement;
}

export const consentSection = (props: ConsentSectionProps): HTMLDivElement => {
  const content = createDivElement();
  const inner = createDivElement();
  const header = createDivElement();
  const perex = createDivElement();
  const switchContainer = createDivElement();

  content.classList.add('c-s');
  inner.classList.add('c-s__i');
  header.classList.add('c-s__a-h');
  header.innerHTML = `<strong>${props.title}</strong>`;

  perex.classList.add('c-s__a-p');
  perex.innerHTML = props.perex;

  switchContainer.classList.add('c-s__a-s');
  switchContainer.appendChild(props.switch);

  inner.appendChild(header);
  inner.appendChild(perex);
  inner.appendChild(switchContainer);

  content.appendChild(inner);

  return content;
};
