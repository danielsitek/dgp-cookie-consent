function parseStringToHtmlElements(htmlString: string): NodeListOf<ChildNode> {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content.childNodes;
}

// Create Virtual DOM Elements.
export function createVElement<T extends HTMLElement>(
  tagName: string,
  attributes?: { [key: string]: string | boolean },
  ...children: Array<string | HTMLElement | undefined | boolean | null>
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
      Array.from(childNodes).forEach((node) => element.append(node));
    } else if (child === undefined || child === null || typeof child === 'boolean') {
      // Just ignore.
    } else {
      element.append(child);
    }
  });

  return element as T;
}
