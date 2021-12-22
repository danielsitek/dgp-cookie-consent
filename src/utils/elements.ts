
export const createElement = (tagName: string) => document.createElement(tagName);

export const createDivElement = (): HTMLDivElement => createElement('div') as HTMLDivElement;
