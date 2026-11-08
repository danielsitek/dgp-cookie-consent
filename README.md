<h1>DGP Cookie Consent</h1>

![Size](https://img.shields.io/github/size/danielsitek/dgp-cookie-consent/dist/cookies.min.js)
[![Stable version](https://img.shields.io/github/v/release/danielsitek/dgp-cookie-consent)](https://github.com/danielsitek/dgp-cookie-consent/releases)
[![Monthly downloads](https://img.shields.io/jsdelivr/gh/hm/danielsitek/dgp-cookie-consent)](https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.10.0/dist/cookies.min.js)
[![CDN](https://img.shields.io/badge/CDN-orange?style=flat&logo=jsdelivr&logoColor=white)](https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.10.0/dist/cookies.min.js)
[![Maintainability](https://qlty.sh/gh/danielsitek/projects/dgp-cookie-consent/maintainability.svg)](https://qlty.sh/gh/danielsitek/projects/dgp-cookie-consent)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/65b56152a2a84981b10576ad7081411d)](https://www.codacy.com/gh/danielsitek/dgp-cookie-consent/dashboard)

Awesome one-of-a-kind Cookie Consent panel.

<h2>Table of Contents</h2>

- [Key features](#key-features)
- [Browser support](#browser-support)
- [How to install](#how-to-install)
- [Translations](#translations)
- [Theme Customisation](#theme-customisation)
  - [Predefined themes](#predefined-themes)
- [Darkmode Theme Customisation](#darkmode-theme-customisation)
- [Settings](#settings)
- [API Methods](#api-methods)
  - [`window.CookieConsentTheme`](#windowcookieconsenttheme)
  - [`window.CookieConsentThemeDark`](#windowcookieconsentthemedark)
  - [`window.CookieConsentTranslations`](#windowcookieconsenttranslations)
  - [`window.CookieConsentSettings`](#windowcookieconsentsettings)
  - [`window.CookieConsentModalOpen()`](#windowcookieconsentmodalopen)
  - [`window.CookieConsent.marketing`](#windowcookieconsentmarketing)
  - [`window.CookieConsent.preferences`](#windowcookieconsentpreferences)
  - [`window.CookieConsent.statistics`](#windowcookieconsentstatistics)
  - [`window.CookieConsent.necessary`](#windowcookieconsentnecessary)
  - [`window.CookieConsent.updated`](#windowcookieconsentupdated)
  - [`window.CookieConsent.id`](#windowcookieconsentid)
  - [`window.CookieConsent.type`](#windowcookieconsenttype)
  - [Event `consent-updated`](#event-consent-updated)
  - [Event `consent-show`](#event-consent-show)
  - [Event `consent-hide`](#event-consent-hide)
  - [Event `consent-ready`](#event-consent-ready)
  - [Event `consent-close`](#event-consent-close)
  - [Event `consent-badge-show`](#event-consent-badge-show)
  - [Event `consent-badge-hide`](#event-consent-badge-hide)
  - [Event `consent-badge-click`](#event-consent-badge-click)
- [GTM loader](#gtm-loader)
- [Development](#development)
  - [Tests](#tests)
  - [Production build](#production-build)
  - [Size budgets](#size-budgets)
  - [Updating browser targets](#updating-browser-targets)

## Key features

- Lightweight
- Zero dependency
- All-in-one - no additional CSS needed
- GDPR Compliant
- Custom themes
- Custom translations
- Customizable options
- GTM loader support

## Browser support

Policy: [Baseline Widely available](https://web.dev/baseline), resolved on 2026-11-08.

| Browser | Minimum version |
| --- | --- |
| Chrome, Edge | 124 |
| Firefox | 125 |
| Safari, Safari on iOS | 17.4 |
| Chrome and Firefox for Android | current |

Internet Explorer is not supported. Browser support does not depend on the Node.js version used for the build.

## How to install

1. Download the latest release or use CDN.

   ```
   https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.10.0/dist/cookies.min.js
   ```

1. Insert this code on the bottom of the page, or [use the GTM loader](#gtm-loader).

   ```html
   <script type="text/javascript" src="<path-to-your>cookies.min.js"></script>
   ```

1. Customize and run.

   ```html
   <script type="text/javascript">
     window.CookieConsentTranslations = {};
     window.CookieConsentTheme = {};
   </script>
   <script type="text/javascript" src="<path-to-your>cookies.min.js"></script>
   ```

> Consent is stored in the `CookieConsent` cookie (`Secure` flag is set on `https` only). If the cookie cannot be written (e.g. cookies are blocked), consent is kept in memory for the current page only. Invalid values fall back to defaults per field (optional categories denied); if no valid choice remains, the consent dialog is shown again. A foreign `CookieConsent` cookie (e.g. set by another consent tool) is overwritten.

## Translations

You can use your own translation for every text in DGP Cookie Consent.

```js
window.CookieConsentTranslations = {
  locale: 'cs-CZ',
  tabAgree: {
    title: 'Souhlas',
    body: `
      <p><strong>Tato webová stránka používá cookies</strong></p>
      <p>K personalizaci obsahu a reklam, poskytování funkcí sociálních médií a analýze naší návštěvnosti využíváme soubory cookie. Informace o tom, jak náš web používáte, sdílíme se svými partnery pro sociální média, inzerci a analýzy. Partneři tyto údaje mohou zkombinovat s dalšími informacemi, které jste jim poskytli nebo které získali v důsledku toho, že používáte jejich služby.</p>
    `,
  },
  tabAbout: {
    title: 'O aplikaci',
    body: `
      <p>Cookies jsou malé textové soubory, které mohou být používány webovými stránkami, aby učinily uživatelský zážitek více efektivní.</p>
      <p>Zákon uvádí, že můžeme ukládat cookies na vašem zařízení, pokud jsou nezbytně nutné pro provoz této stránky. Pro všechny ostatní typy cookies potřebujeme vaše povolení.</p>
      <p>Tato stránka používá různé typy cookies. Některé cookies jsou umístěny službami třetích stran, které se objevují na našich stránkách.</p>
      <p>Kdykoliv můžete změnit nebo zrušit svůj souhlas prostřednictvím Vyjádření o souborech cookie na našich webových stránkách.</p>
    `,
  },
  tabDetail: {
    title: 'Detail',
    necessary: {
      title: 'Nutné',
      perex: 'Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní základní funkce jako navigace stránky a přístup k zabezpečeným sekcím webové stránky. Webová stránka nemůže správně fungovat bez těchto cookies.',
    },
    preferences: {
      title: 'Preferenční',
      perex: 'Preferenční cookies umožňují, aby si webová stránka zapamatovala informace, které mění, jak se webová stránka chová nebo jak vypadá. Je to například preferovaný jazyk nebo region, kde se nacházíte.',
    },
    statistics: {
      title: 'Statistické',
      perex: 'Statistické cookies pomáhají majitelům webových stránek, aby porozuměli, jak návštěvníci používají webové stránky. Anonymně sbírají a sdělují informace.',
    },
    marketing: {
      title: 'Marketingové',
      perex: 'Marketingové cookies jsou používány pro sledování návštěvníků na webových stránkách. Záměrem je zobrazit reklamu, která je relevantní a zajímavá pro jednotlivého uživatele a tímto hodnotnější pro vydavatele a inzerenty třetích stran.',
    },
  },
  buttonEdit: {
    label: 'Nastavit',
  },
  buttonAllowAll: {
    label: 'Povolit vše',
  },
  buttonRejectAll: {
    label: 'Odmítnout vše',
  },
  buttonConfirm: {
    label: 'Potvrdit',
  },
  buttonClose: {
    label: 'Odložit rozhodnutí na později',
  },
  badge: {
    label: 'Upravit nastavení cookies',
  },
  dialog: {
    label: 'Vaše nastavení cookies',
  },
  lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
};
```

> **Info**: Key `%date` in `window.CookieConsentTranslations.lastUpdated` will be replaced with locale date, based on `window.CookieConsentTranslations.locale`.

> **Info**: `perex` and `body` values are rendered as HTML content. Anchors in them with `#tab-agree`, `#tab-details` or `#tab-about` in `href` switch to that tab, `#allow-all` and `#reject-all` act like the matching buttons:
>
> ```html
> <a href="#tab-details">Go to tab Details</a>
> <a href="#reject-all">Reject all cookies</a>
> ```

> **Info**: `dialog.label` sets the accessible name (`aria-label`) of the `role="dialog"` element.

> **Info**: Every key is optional, including keys in nested sections. A text is used only when it is a string (an empty string included, e.g. an empty `lastUpdated` hides the line); missing keys, `undefined`, `null` and other values fall back to the default (Czech) translation. An empty `locale` also falls back. In TypeScript, use the `CookieConsentTranslationsPartial` type:
>
> ```ts
> import type { CookieConsentTranslationsPartial } from '@danielsitek/dgp-cookie-consent';
>
> window.CookieConsentTranslations = {
>   tabAgree: {
>     title: 'Hello',
>   },
> } satisfies CookieConsentTranslationsPartial;
> ```

## Theme Customisation

For theming purposes, here are all keys with their default values.

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'inherit',
  'base-shadow': '0 1px 6px rgba(5,27,44,.06),0 2px 32px rgba(5,27,44,.16)',
  'border-radius': '6px',
  'button-border-radius': '6px',
  'button-font-weight': '600',

  'color-grey': '#d6d6d6',
  'color-primary': '#f8c132',
  'color-text-light': '#757575',
  'color-text': '#242424',
  'color-white': '#fff',

  'button-default__bg-color': '#f4f4f4',
  'button-default__color': '#242424',
  'button-default__text-transform': 'none',
  'button-default__border': '1px solid #f4f4f4',
  'button-default__box-shadow': 'none',

  'button-default--hover__bg-color': '#fff',
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
};
```

### Predefined themes

- <details>
  <summary>ZOOT / Default theme</summary>

  ```js
  window.CookieConsentTheme = {
    /* ZOOT theme is same as default theme */
  };
  ```

  </details>

- <details>
  <summary>Different</summary>

  ```js
  window.CookieConsentTheme = {
    'color-primary': '#008c95',

    'button-default__bg-color': '#fff',
    'button-default__color': '#676767',
    'button-default__border': '2px solid #676767',

    'button-default--hover__color': '#676767',
    'button-default--hover__border': '2px solid #676767',

    'button-primary__bg-color': '#008c95',
    'button-primary__color': '#fff',

    'button-primary--hover__bg-color': '#007379',
    'button-primary--hover__color': '#fff',

    'badge__color': '#008c95',
  };
  ```

  </details>

- <details>
  <summary>UrbanStore</summary>

  ```js
  window.CookieConsentTheme = {
    'border-radius': '0',
    'button-border-radius': '0',

    'color-primary': '#cfad69',

    'button-default__bg-color': '#f3f3f2',
    'button-default__color': '#676767',
    'button-default__text-transform': 'uppercase',
    'button-default__border': '0 none',
    'button-default__box-shadow': 'none',

    'button-default--hover__bg-color': '#f3f3f2',
    'button-default--hover__color': '#676767',
    'button-default--hover__border': '0 none',
    'button-default--hover__box-shadow': 'none',

    'button-primary__bg-color': '#cfad69',
    'button-primary__color': '#fff',

    'button-primary--hover__bg-color': '#cfad69',
    'button-primary--hover__color': '#fff',

    'badge__color': '#cfad69',
  };
  ```

  </details>

- <details>
  <summary>Bibloo</summary>

  ```js
  window.CookieConsentTheme = {
    'base-color': '#3c3c3c',
    'border-radius': '0',
    'button-border-radius': '0',

    'color-primary': '#000000',

    'button-default__bg-color': '#f3f3f2',
    'button-default__color': '#676767',
    'button-default__text-transform': 'uppercase',
    'button-default__border': '0 none',

    'button-default--hover__bg-color': '#f3f3f2',
    'button-default--hover__color': '#676767',
    'button-default--hover__border': '0 none',
    'button-default--hover__box-shadow': 'none',

    'button-primary__bg-color': '#000000',
    'button-primary__color': '#fff',

    'button-primary--hover__bg-color': '#f3f3f2',
    'button-primary--hover__color': '#000',

    'badge__color': '#000000',
  };
  ```

  </details>

## Darkmode Theme Customisation

Same options as `window.CookieConsentTheme`. There is no built-in dark theme: with `enableDarkMode: true` in [settings](#settings), these values are applied when the browser/OS prefers a dark color scheme.

```js
window.CookieConsentThemeDark = {
  ...
};
```

## Settings

You can set a few options for Cookie Consent.

```js
window.CookieConsentSettings = {
  tabAgree: {
    showButtonRejectAll: true,
  },
  tabDetails: {
    showButtonAllowAll: false,
  },
  tabAbout: {
    showButtonRejectAll: true,
  },
  enableDarkMode: true,
  disableBadge: false,
  disableCross: false,
  disableHeader: false,
};
```

Here is the complete list of setting options:

| Property                        | Value     | Description                                 | Default value |
| ------------------------------- | --------- | ------------------------------------------- | ------------- |
| `tabAgree.showButtonRejectAll`  | `boolean` | Enable reject all button in first tab.      | `true`        |
| `tabDetails.showButtonAllowAll` | `boolean` | Enable allow all button in details tab.     | `false`       |
| `tabAbout.showButtonRejectAll`  | `boolean` | Enable reject all button in last tab.       | `true`        |
| `enableDarkMode`                | `boolean` | Enable automatic switch to dark mode theme. | `false`       |
| `disableBadge`                  | `boolean` | Disable badge button.                       | `false`       |
| `disableCross`                  | `boolean` | Disable cross button in header.             | `false`       |
| `disableHeader`                 | `boolean` | Disable header.                             | `false`       |

> **Info**: The Escape key closes the dialog only when the cross button is shown, so `disableCross` or `disableHeader` also disables it.

## API Methods

### `window.CookieConsentTheme`

Object to pass theme configuration to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentThemeDark`

Object to pass theme configuration for darkmode. This needs to be placed before the consent script src tag.

### `window.CookieConsentTranslations`

Object to pass translation to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentSettings`

Object to pass settings to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentModalOpen()`

- Returns `<void>`.

Open the consent modal window and hide the badge button.

**Example 01**:

```html
<button type="button" class="js-consent-open">Open Modal</button>

<script>
  document.querySelectorAll('.js-consent-open').forEach((element) => {
    element.addEventListener('click', () => {
      window.CookieConsentModalOpen();
    });
  });
</script>
```

**Example 02**:

```html
<a href="javascript:if (window.CookieConsentModalOpen !== undefined) { window.CookieConsentModalOpen(); }"> Cookies Settings </a>
```

### `window.CookieConsent.marketing`

- Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.preferences`

- Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.statistics`

- Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.necessary`

- Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.updated`

- Returns `<string>`.
- Example: `"2026-05-25T20:52:09.158Z"`

Returns an ISO-formatted date-time string, or an empty string if consent has not yet been updated.

### `window.CookieConsent.id`

- Returns `<string>`.
- Example: `"7249335781.1779742326"`

Returns a unique consent ID. It is generated and stored on the first page view, before the user makes a choice.

### `window.CookieConsent.type`

- Returns `"full" | "advanced" | "rejected" | ""`.

Returns a consent type of user given consent, or empty string if consent has not yet been given.

### Event `consent-updated`

Fires every time the consent is updated.

**Example**:

```js
window.addEventListener('consent-updated', () => {
  console.log('Consent has been updated.', window.CookieConsent);
});
```

### Event `consent-show`

Fires every time the modal consent window is being shown.

**Example**:

```js
window.addEventListener('consent-show', () => {
  console.log('Consent window is being shown.');
});
```

### Event `consent-hide`

Fires every time the modal consent window closes.

**Example**:

```js
window.addEventListener('consent-hide', () => {
  console.log('Consent window closes.');
});
```

### Event `consent-ready`

Fires one time when consent script is loaded on page and ready.

**Example**:

```js
window.addEventListener('consent-ready', () => {
  console.log('Consent is ready.');
});
```

### Event `consent-close`

Fires every time the modal consent window is closed by the Escape key or by clicking on the cross, without a consent choice.

**Example**:

```js
window.addEventListener('consent-close', () => {
  console.log('Consent is closed.');
});
```

### Event `consent-badge-show`

Fires every time the consent badge is shown.

**Example**:

```js
window.addEventListener('consent-badge-show', () => {
  console.log('Consent badge is shown.');
});
```

### Event `consent-badge-hide`

Fires every time the consent badge hides.

**Example**:

```js
window.addEventListener('consent-badge-hide', () => {
  console.log('Consent badge hides.');
});
```

### Event `consent-badge-click`

Fires every time the consent badge is clicked.

**Example**:

```js
window.addEventListener('consent-badge-click', () => {
  console.log('Consent badge is clicked.');
});
```

## GTM loader

`dist/cookies-gtm.min.js` is a small loader for Google Tag Manager. It connects the consent to [Google Consent Mode](https://developers.google.com/tag-platform/security/guides/consent) and loads the panel itself.

Create a **Custom HTML** tag with the **Consent Initialization - All Pages** trigger:

```html
<script>
  // Optional, must be set before the loader runs.
  // window.CookieConsentTranslations = {};
  // window.CookieConsentTheme = {};
  // window.CookieConsentThemeDark = {};
  // window.CookieConsentSettings = {};
</script>
<script src="https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.10.0/dist/cookies-gtm.min.js"></script>
```

The loader:

- Pushes `consent` `default` with the stored consent, then the `cookie_consent_default` event.
- Pushes `consent` `update` and the `cookie_consent_update` event on every consent change.
- Maps the categories: `marketing` → `ad_storage`, `ad_user_data`, `ad_personalization`; `statistics` → `analytics_storage`; `preferences` → `personalization_storage`. `functionality_storage` and `security_storage` are always `granted`.
- Loads the panel from `@latest`, so sites get new panel releases without editing the tag.
- Opens the panel on click on an element with the `js-consent-open` class. The class must be on the clicked element itself, a click on a nested icon or `<span>` is ignored ([#43](https://github.com/danielsitek/dgp-cookie-consent/issues/43)).
- Uses its own base theme (your `window.CookieConsentTheme` keys win).
- Always sets `disableCross: true`, even when your settings say `false` ([#43](https://github.com/danielsitek/dgp-cookie-consent/issues/43)). The dialog has no cross and Escape does not close it.

Other panel events are pushed to `dataLayer` as `cookie_consent_ready`, `cookie_consent_bar_show`, `cookie_consent_bar_hide`, `cookie_consent_badge_show`, `cookie_consent_badge_hide` and `cookie_consent_badge_click`. Use them as **Custom Event** triggers.

---

## Development

You need Node.js 24 or 26 and run these commands:

```
npm i
npm run dev
```

Then open `http://localhost:3000/public/`.

> **TIP**: Sometimes it is useful to comment out `.pipe(stripDebug())` in `tasks/helpers/rollupPipe.js` to enable console logs and other debug functions.

### Tests

Unit tests ([Vitest](https://vitest.dev/) with happy-dom) live next to the source as `*.spec.ts`.

```
npm test
npm run test:watch
npm run typecheck
npm run lint:css
```

### Production build

```
npm ci
npm run build:prod
```

### Size budgets

After `npm run build:prod`, check the minified bundles against the reviewed limits in `size-budget.json`:

```
npm run size:check
```

It reports raw, gzip (level 9) and Brotli (quality 11) bytes per bundle, deltas against the baseline and the combined transfer size, and exits nonzero when a limit is exceeded. CI runs it on Node 26 only. The script never updates `size-budget.json`, raise a limit or the baseline only after review.

### Updating browser targets

The minimum versions in `package.json` → `browserslist` drive Autoprefixer and cssnano. They are pinned, so the build output only changes when someone updates them on purpose. They were resolved from `baseline widely available on 2026-11-08` with browserslist 4.29.5 and baseline-browser-mapping 2.11.35. The project's own browserslist (4.19.1) does not support Baseline queries yet.

TypeScript compiles to ES2019 because `gulp-strip-debug` cannot parse newer syntax. `lib` is ES2021, so ES2021 runtime APIs such as `String.prototype.replaceAll` stay allowed. The minimum browsers support both.

To move the policy to a new date:

1. Resolve the new minimum versions outside the project, for example `npx browserslist@latest "baseline widely available on <date>"`.
2. Update `browserslist` in `package.json` and the [Browser support](#browser-support) table in one commit.
3. Run `npm run build:prod` and `npm run size:check`, and record the size change in the PR.
4. Smoke-test the built panel in the oldest versions. Current browser engines alone do not prove minimum-version support. Chrome and Firefox can run headless from `npx @puppeteer/browsers install chrome-headless-shell@<version>` and `firefox@stable_<version>`. Safari cannot be installed in an old version on current macOS, so check it on a device or simulator with that iOS/Safari version, or on a cloud browser service.
