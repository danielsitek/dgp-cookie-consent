export interface ConsentSectionProps {
  title: string;
  perex: string;
  switch: HTMLElement;
}

export const consentSection = (props: ConsentSectionProps): HTMLDivElement => {
  const content = document.createElement('div');
  const inner = document.createElement('div');
  const header = document.createElement('div');
  const perex = document.createElement('div');
  const switchContainer = document.createElement('div');

  content.classList.add('consent-section');
  inner.classList.add('consent-section__inner');
  header.classList.add('consent-section__area-header');
  header.innerHTML = `<strong>${props.title}</strong>`;

  perex.classList.add('consent-section__area-perex');
  perex.innerHTML = props.perex;

  switchContainer.classList.add('consent-section__area-switch');
  switchContainer.appendChild(props.switch);

  inner.appendChild(header);
  inner.appendChild(perex);
  inner.appendChild(switchContainer);

  content.appendChild(inner);

  return content;
};
