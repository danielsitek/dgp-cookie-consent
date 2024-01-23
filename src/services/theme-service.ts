import { themeDefault, themeDefaultDark } from '../themes/default';
import { settingsService } from './settings-service';

export interface CookieConsentTheme {
  'base-color'?: string;
  'base-font-size'?: string;
  'base-line'?: string;
  'base-font-family'?: string;
  'base-shadow'?: string;
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

  'badge__bg-color'?: string;
  badge__color?: string;
  badge__border?: string;
  'badge__border-radius'?: string;
  'badge__box-shadow'?: string;
  badge__position?: string;

  'base-link__color'?: string;
  'base-link__text-decoration'?: string;
  'base-link--hover__color'?: string;
  'base-link--hover__text-decoration'?: string;

  [key: string]: string | undefined;
}

export interface ThemeServiceInterface {
  themeTextContent: string;
}

const settings = settingsService();

const themeString = (theme: CookieConsentTheme): string => {
  return Object.keys(theme)
    .map((key) => {
      return `--${key}:${theme[key]};`;
    })
    .join('');
};

export const themeService = (): ThemeServiceInterface => {
  const composedBaseTheme: CookieConsentTheme = {
    ...themeDefault,
    ...window?.CookieConsentTheme,
  };

  const composedDarkTheme: CookieConsentTheme = {
    ...themeDefaultDark,
    ...window?.CookieConsentThemeDark,
  };

  const baseThemeVars = themeString(composedBaseTheme);

  const darkThemeVars = themeString(composedDarkTheme);

  if (settings.enableDarkMode) {
    return {
      themeTextContent: `.t{${baseThemeVars}}@media(prefers-color-scheme: dark){.t{${darkThemeVars}}}`,
    };
  }

  return {
    themeTextContent: `.t{${baseThemeVars}}`,
  };
};
