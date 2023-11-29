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

function parseStringToHtmlElements(htmlString: string): NodeListOf<ChildNode> {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.childNodes;
}

// Experimenal function for creating virtual DOM elements.
export function createVElement<T extends HTMLElement>(
  tagName: string,
  attributes?: { [key: string]: string | boolean },
  ...children: Array<string | HTMLElement>
): T {
  const element = document.createElement(tagName);

  // Set attributes
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'disabled' || key === 'checked') {
        (element as HTMLInputElement)[key] = value as boolean;
      } else {
        element.setAttribute(key, `${value}`);
      }
    }
  }

  // Add children
  children.forEach((child) => {
    if (typeof child === 'string') {
      const childNodes = parseStringToHtmlElements(child);
      childNodes.forEach((node) => element.append(node));
    } else {
      element.append(child);
    }
  });

  return element as T;
}
