export const createElement = (tagName: string, classes?: Array<string | null>): HTMLElement => {
  const el = document.createElement(tagName);

  if (tagName === 'button') {
    el.setAttribute('type', tagName);
  }

  if (classes) {
    el.classList.add(...(classes.filter((i) => i) as string[]));
  }

  return el;
};

export const createDivElement = (classes?: string[]): HTMLDivElement => createElement('div', classes) as HTMLDivElement;

function createHtmlElementsFromString(htmlString: string): NodeListOf<ChildNode> {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.childNodes;
}

export function createVElement(
  tagName: string,
  attributes?: { [key: string]: string },
  ...children: Array<string | HTMLElement>
) {
  const element = document.createElement(tagName);

  // Nastavení atributů
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element.setAttribute(key, value);
    }
  }

  // Přidání potomků
  children.forEach((child) => {
    if (typeof child === 'string') {
      const childNodes = createHtmlElementsFromString(child);
      childNodes.forEach((node) => element.append(node));
    } else {
      element.append(child);
    }
  });

  return element;
}
