
export const createElement = (tagName: string, classes?: Array<string|null>) => {
  const el = document.createElement(tagName);

  if (classes) {
    el.classList.add(...classes.filter(i => i) as string[]);
  }

  return el;
}

export const createDivElement = (classes?: string[]): HTMLDivElement => createElement('div', classes) as HTMLDivElement;;
