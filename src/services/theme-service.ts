import { themeDefault, themeDefaultDark } from '@/themes/default';
import { settingsService } from './settings-service';

export type CookieConsentThemeKeys =
  | 'base-color'
  | 'base-font-size'
  | 'base-line'
  | 'base-font-family'
  | 'base-shadow'
  | 'border-radius'
  | 'button-border-radius'
  | 'color-grey'
  | 'color-primary'
  | 'color-text-light'
  | 'color-text'
  | 'color-white'
  | 'button-default__bg-color'
  | 'button-default__color'
  | 'button-default__text-transform'
  | 'button-default__border'
  | 'button-default__box-shadow'
  | 'button-default--hover__bg-color'
  | 'button-default--hover__color'
  | 'button-default--hover__border'
  | 'button-default--hover__box-shadow'
  | 'button-primary__bg-color'
  | 'button-primary__color'
  | 'button-primary__text-transform'
  | 'button-primary__border'
  | 'button-primary__box-shadow'
  | 'button-primary--hover__bg-color'
  | 'button-primary--hover__color'
  | 'button-primary--hover__border'
  | 'button-primary--hover__box-shadow'
  | 'badge__bg-color'
  | 'badge__color'
  | 'badge__border'
  | 'badge__border-radius'
  | 'badge__box-shadow'
  | 'badge__position'
  | 'base-link__color'
  | 'base-link__text-decoration'
  | 'base-link--hover__color'
  | 'base-link--hover__text-decoration';

export type CookieConsentTheme = Partial<Record<CookieConsentThemeKeys, string>>;

export interface ThemeServiceInterface {
  themeTextContent: string;
}

const settings = settingsService();

const themeString = (theme: CookieConsentTheme): string => {
  return Object.keys(theme)
    .map((key) => {
      return `--${key}:${theme[key as CookieConsentThemeKeys]};`;
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
