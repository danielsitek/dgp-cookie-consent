import { themeDefault } from '../themes/default';

export interface CookieConsentTheme {
  [key: string]: string;
}

export interface ThemeServiceInterface {
  themeTextContent: string;
}

// More themes in src/themes.
const defaultTheme = themeDefault;

export const themeService = (): ThemeServiceInterface => {
  const composedTheme: CookieConsentTheme = {
    ...defaultTheme,
    ...window?.CookieConsentTheme,
  };

  const stringified = Object.keys(composedTheme).map((key) => {
    return `--${key}: ${composedTheme[key]};`;
  });

  return {
    themeTextContent: `.t { ${stringified.join(' ')} }`,
  };
};
