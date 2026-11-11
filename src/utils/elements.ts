// Parses trusted HTML (e.g. `tabAgree.body`, section `perex`, inline SVG icons) into a fragment.
// Never pass untrusted input: scripts in event handler attributes would run.
export function htmlContent(htmlString: string): DocumentFragment {
  const template = document.createElement('template');
  template.innerHTML = htmlString.trim();
  return template.content;
}

// Create Virtual DOM Elements. String children are rendered as text; wrap trusted HTML in htmlContent().
export function createVElement<T extends HTMLElement>(tagName: string, attributes?: { [key: string]: string | boolean | undefined }, ...children: Array<string | Node | undefined | boolean | null>): T {
  const element = document.createElement(tagName);

  // Set attributes
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      if (key === 'disabled' || key === 'checked') {
        (element as HTMLInputElement)[key] = value as boolean;
      } else if (value === undefined) {
        // Do not render undefined attributes.
      } else {
        element.setAttribute(key, `${value}`);
      }
    }
  }

  // Add children
  children.forEach((child) => {
    if (child === undefined || child === null || typeof child === 'boolean') {
      // Just ignore.
    } else {
      element.append(child);
    }
  });

  return element as T;
}
