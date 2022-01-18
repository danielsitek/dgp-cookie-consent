
export interface ComponentProps {
  modifier?: string;
}

export const componentClassList = (main: string[], modifiers?: string): string[] => {
  if (modifiers) {
    return [
      ...main,
      ...modifiers.split(' '),
    ]
  }

  return main;
};
