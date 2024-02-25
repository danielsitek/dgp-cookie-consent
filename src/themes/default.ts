import type { CookieConsentTheme } from '@/services/theme-service';

/**
 * All available theme properties:
 *
 * ```
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'base-shadow': '0 1px 6px rgba(5,27,44,.06),0 2px 32px rgba(5,27,44,.16)',
  'border-radius': '6px',
  'button-border-radius': '6px',

  'color-grey': '#d6d6d6',
  'color-primary': '#f8c132',
  'color-text-light': '#757575',
  'color-text': '#242424',
  'color-white': '#ffffff',

  'button-default__bg-color': '#f4f4f4',
  'button-default__color': '#242424',
  'button-default__text-transform': 'none',
  'button-default__border': '1px solid #f4f4f4',
  'button-default__box-shadow': 'none',

  'button-default--hover__bg-color': '#ffffff',
  'button-default--hover__color': '#242424',
  'button-default--hover__border': '1px solid #d1d1d1',
  'button-default--hover__box-shadow': '0 0 17px 0 rgba(0,0,0,.1)',

  'button-primary__bg-color': '#f8c132',
  'button-primary__color': '#242424',
  'button-primary__text-transform': 'uppercase',
  'button-primary__border': '0 none',
  'button-primary__box-shadow': 'none',

  'button-primary--hover__bg-color': '#efaf08',
  'button-primary--hover__color': '#242424',
  'button-primary--hover__border': '0 none',
  'button-primary--hover__box-shadow': 'none',

  'badge__bg-color': '#ffffff',
  'badge__color': '#f8c132',
  'badge__border': '0 none',
  'badge__border-radius': '10rem',
  'badge__box-shadow': '0 1px 6px rgba(5,27,44,.06),0 2px 32px rgba(5,27,44,.16)',
  'badge__position': 'auto auto 1rem 1rem',

  'base-link__color': '#242424',
  'base-link__text-decoration': 'underline',
  'base-link--hover__color': '#000000',
  'base-link--hover__text-decoration': 'underline',
 * ```
 */

export const themeDefault: CookieConsentTheme = {};

export const themeDefaultDark: CookieConsentTheme = {
  // 'base-color': '#959ea8',
  // 'base-line': '1px solid #3e454d',
  // 'base-shadow': '0 1px 6px rgba(0,0,0,.2)',
  // 'color-white': '#2b2e31',
  // 'color-grey': '#44484c',
  // 'color-text': '#dee5ec',
  // 'color-text-light': '#8b939d',
};
