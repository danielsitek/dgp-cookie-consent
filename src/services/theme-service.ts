import { themeZoot } from '../themes/zoot';

export interface CookieConsentTheme {
  [key: string]: string;
}

export interface ThemeServiceInterface {
  themeTextContent: string;
}

const defaultTheme = themeZoot;

export const themeService = (): ThemeServiceInterface => {
  const composedTheme: CookieConsentTheme = {
    ...defaultTheme,
    ...window?.CookieConsentTheme,
  };

  const stringified = Object.keys(composedTheme).map((key) => {
    return `--${key}: ${composedTheme[key]};`;
  });

  return {
    themeTextContent: `.consent-dialog-root { ${stringified.join(' ')} }`,
  };
}
