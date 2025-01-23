<h1>DGP Cookie Consent</h1>

![Size](https://img.shields.io/github/size/danielsitek/dgp-cookie-consent/dist/cookies.min.js)
[![Stable version](https://img.shields.io/github/v/release/danielsitek/dgp-cookie-consent)](https://github.com/danielsitek/dgp-cookie-consent/releases)
[![Monthly downloads](https://img.shields.io/jsdelivr/gh/hm/danielsitek/dgp-cookie-consent)](https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.6.3/dist/cookies.min.js)
[![CDN](https://img.shields.io/badge/CDN-orange?style=flat&logo=jsdelivr&logoColor=white)](https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.6.3/dist/cookies.min.js)
[![Maintainability](https://api.codeclimate.com/v1/badges/27b5b5b749d18039f303/maintainability)](https://codeclimate.com/github/danielsitek/dgp-cookie-consent/maintainability)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/65b56152a2a84981b10576ad7081411d)](https://www.codacy.com/gh/danielsitek/dgp-cookie-consent/dashboard)

Awesome one-of-a-kind Cookie Consent panel.

<h2>Table of Contents</h2>

- [Key features](#key-features)
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
- [GTM Implementation with custom rules](#gtm-implementation-with-custom-rules)
  - [1. Create Variables](#1-create-variables)
  - [2. Create Rules](#2-create-rules)
  - [3. Create tag](#3-create-tag)
- [Development](#development)
  - [Production build](#production-build)

## Key features

- Lightweight
- Zero dependency
- All-in-one - no aditional css needed
- GDPR Compliant
- Custom themes
- Custom translations

## How to install

1. Download the latest release or use CDN.

   ```
   https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.6.3/dist/cookies.min.js
   ```

1. Insert this code on the bottom of the page, or [inject it via GTM](#gtm-implementation).

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
      perex:
        'Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní základní funkce jako navigace stránky a přístup k zabezpečeným sekcím webové stránky. Webová stránka nemůže správně fungovat bez těchto cookies.',
    },
    preferences: {
      title: 'Preferenční',
      perex:
        'Preferenční cookies umožňují, aby si webová stránka zapamatovala informace, které mění, jak se webová stránka chová nebo jak vypadá. Je to například preferovaný jazyk nebo region, kde se nacházíte.',
    },
    statistics: {
      title: 'Statistické',
      perex:
        'Statistické cookies pomáhají majitelům webových stránek, aby porozuměli, jak návštěvníci používají webové stránky. Anonymně sbírají a sdělují informace.',
    },
    marketing: {
      title: 'Marketingové',
      perex:
        'Marketingové cookies jsou používány pro sledování návštěvníků na webových stránkách. Záměrem je zobrazit reklamu, která je relevantní a zajímavá pro jednotlivého uživatele a tímto hodnotnější pro vydavatele a inzerenty třetích stran.',
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
  badge: {
    label: 'Upravit nastavení cookies',
  },
  lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
};
```

> **Info**: Key `%date` in `window.CookieConsentTranslations.lastUpdated` will be replaced with locale date, based on `window.CookieConsentTranslations.locale`.

> **Info**: `perex` and `body` values are rendered as HTML content.

> **Since v1.6.2**
>
> Since version 1.6.2 you can insert anchor links to other tabs in `perex` and `body`. The script will look for anchor elements and if they have `#tab-agree|#tab-details|#tab-about|#allow-all|#reject-all` in href attribute, click on such element will switch to selected tab.
>
> Examples:
>
> ```
> <a href="#tab-agree">Go to tab Agree</a>
> <a href="#tab-details">Go to tab Details</a>
> <a href="#tab-about">Go to tab About</a>
> <a href="#allow-all">Allow all cookies</a>
> <a href="#reject-all">Reject all cookies</a>
> ```

## Theme Customisation

For theming purposes, these all the keys with it's default values.

```js
window.CookieConsentTheme = {
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
  badge__color: '#f8c132',
  badge__border: '0 none',
  'badge__border-radius': '10rem',
  'badge__box-shadow':
    '0 1px 6px rgba(5,27,44,.06),0 2px 32px rgba(5,27,44,.16)',
  badge__position: 'auto auto 1rem 1rem',

  'base-link__color': '#242424',
  'base-link__text-decoration': 'underline',
  'base-link--hover__color': '#efaf08',
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

    badge__color: '#008c95',
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

    badge__color: '#cfad69',
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

    badge__color: '#000000',
  };
  ```

  </details>

## Darkmode Theme Customisation

Same options like `window.CookieConsentTheme`. Darkmode theme is automatically applied by settings from the browser/OS.

```js
window.CookieConsentThemeDark = {
  ...
};
```

## Settings

You can set few settings options for Cookie Consent.

```js
window.CookieConsentSettings = {
  tabAgree: {
    showButtonRejectAll: true,
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
| `tabDetails.showButtonAllowAll` | `boolean` | Enable allow all button in details tab.     | `true`        |
| `tabAbout.showButtonRejectAll`  | `boolean` | Enable reject all button in last tab.       | `true`        |
| `enableDarkMode`                | `boolean` | Enable automatic switch to dark mode theme. | `false`       |
| `disableBadge`                  | `boolean` | Disable badge button.                       | `false`       |
| `disableCross`                  | `boolean` | Disable cross button in header.             | `false`       |
| `disableHeader`                 | `boolean` | Disable header.                             | `false`       |

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
<a
  href="javascript:if (window.CookieConsentModalOpen !== undefined) { window.CookieConsentModalOpen(); }"
>
  Cookies Settings
</a>
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

Returns a ISO string formated date and time, or empty string if consent has not yet been updated.

### `window.CookieConsent.id`

- Returns `<string>`.

Returns a unique ID of user given consent, or empty string if consent has not yet been given.

### `window.CookieConsent.type`

- Returns `<string>`.

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

Fires every time the modal consent window is closed by ESC key or by clicking on cross.

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

## GTM Implementation with custom rules

### 1. Create Variables

- **CookieConsent.marketing**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.marketing.toString(); }
  ```

- **CookieConsent.preferences**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.preferences.toString(); }
  ```

- **CookieConsent.statistics**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.statistics.toString(); }
  ```

- CookieConsent Version (optional)

  This variable is only for simplified version changes.

  **Type**: Constant

  **Value**:

  ```md
  1.3.0
  ```

### 2. Create Rules

- **CookieConsent - Marketing**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:

  - `CookieConsent.marketing`
  - contains
  - `true`

- **CookieConsent - Preference**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:

  - `CookieConsent.preferences`
  - contains
  - `true`

- **CookieConsent - Statistics**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:

  - `CookieConsent.statistics`
  - contains
  - `true`

### 3. Create tag

- **CookieConsent**

  **Type of tag**: Custom HTML

  **HTML**

  ```html
  <script type="text/javascript" id="cookie-consent-init">
    // Optional: add own translations
    // window.CookieConsentTranslations = {};

    // Optional: add own theme
    // window.CookieConsentTheme = {};

    // Optional: add own theme for darkmode
    // window.CookieConsentThemeDark = {};

    // Optional: add own theme
    // window.CookieConsentSettings = {};

    window.addEventListener(
      'consent-updated',
      function consentUpdatedListener() {
        dataLayer.push({
          event: 'cookieconsent_updated',
        });
      },
    );

    window.addEventListener('consent-ready', function () {
      dataLayer.push({
        event: 'cookieconsent_ready',
      });
    });

    (function cookiesInit() {
      var scriptEl = document.createElement('script');
      scriptEl.src =
        'https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.6.3/dist/cookies.min.js';
      scriptEl.type = 'text/javascript';
      scriptEl.id = 'cookie-consent';

      document.body.appendChild(scriptEl);
    })();
  </script>
  ```

  > **Note**: You can replace version number with previously defined "CookieConsent Version" variable.

  **Startup**:

  **Startup rules**: All Pages

---

## Development

You just need node >= 12 and run these commands:

```
npm i
npm run dev
```

Then open the localhost url from terminal in browser and navigate to `http://localhost:3000/public/`.

### Production build

```
npm ci
npm run build:prod
```
