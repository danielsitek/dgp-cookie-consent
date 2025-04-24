export interface ComponentProps {
  modifier?: string;
}

export const componentClassList = (...classNames: (string | undefined)[]): string => {
  return classNames
    .filter((val) => val)
    .join(' ')
    .trim();
};
