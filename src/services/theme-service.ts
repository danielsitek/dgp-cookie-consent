import { themeDefault, themeDefaultDark } from '../themes/default';

export interface CookieConsentTheme {
  'base-color'?: string;
  'base-font-size'?: string;
  'base-line'?: string;
  'base-font-family'?: string;
  'border-radius'?: string;
  'button-border-radius'?: string;

  'color-grey'?: string;
  'color-primary'?: string;
  'color-text-light'?: string;
  'color-text'?: string;
  'color-white'?: string;

  'button-default__bg-color'?: string;
  'button-default__color'?: string;
  'button-default__text-transform'?: string;
  'button-default__border'?: string;
  'button-default__box-shadow'?: string;

  'button-default--hover__bg-color'?: string;
  'button-default--hover__color'?: string;
  'button-default--hover__border'?: string;
  'button-default--hover__box-shadow'?: string;

  'button-primary__bg-color'?: string;
  'button-primary__color'?: string;
  'button-primary__text-transform'?: string;
  'button-primary__border'?: string;
  'button-primary__box-shadow'?: string;

  'button-primary--hover__bg-color'?: string;
  'button-primary--hover__color'?: string;
  'button-primary--hover__border'?: string;
  'button-primary--hover__box-shadow'?: string;

  [key: string]: string | undefined;
}

export interface ThemeServiceInterface {
  themeTextContent: string;
}

export const themeService = (): ThemeServiceInterface => {
  const composedBaseTheme: CookieConsentTheme = {
    ...themeDefault,
    ...window?.CookieConsentTheme,
  };

  const composedDarkTheme: CookieConsentTheme = {
    ...themeDefaultDark,
    ...window?.CookieConsentThemeDark,
  };

  const baseThemeVars = Object.keys(composedBaseTheme).map((key) => {
    return `--${key}: ${composedBaseTheme[key]};`;
  });

  const darkThemeVars = Object.keys(composedDarkTheme).map((key) => {
    return `--${key}: ${composedDarkTheme[key]};`;
  });

  return {
    themeTextContent: `.t { ${baseThemeVars.join(' ')} } @media (prefers-color-scheme: dark) { .t { ${darkThemeVars.join(' ')} }}`,
  };
};
