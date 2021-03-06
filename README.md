<h1>DGP Cookie Consent</h1>

![Size](https://img.shields.io/github/size/danielsitek/dgp-cookie-consent/dist/cookies.min.js)
[![Stable version](https://img.shields.io/github/v/release/danielsitek/dgp-cookie-consent)](https://github.com/danielsitek/dgp-cookie-consent/releases)
[![CDN](https://img.shields.io/badge/CDN-orange?style=flat&logo=jsdelivr&logoColor=white)](https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.4.0/dist/cookies.min.js)
[![Maintainability](https://api.codeclimate.com/v1/badges/27b5b5b749d18039f303/maintainability)](https://codeclimate.com/github/danielsitek/dgp-cookie-consent/maintainability)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/65b56152a2a84981b10576ad7081411d)](https://www.codacy.com/gh/danielsitek/dgp-cookie-consent/dashboard)

Awesome one-of-a-kind Cookie Consent panel.

<h2>Table of Contents</h2>

- [Key features](#key-features)
- [How to install](#how-to-install)
- [Translations](#translations)
- [Theme Customisation](#theme-customisation)
  - [Predefined themes](#predefined-themes)
- [Settings](#settings)
- [API Methods](#api-methods)
  - [`window.CookieConsentTheme`](#windowcookieconsenttheme)
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
- [GTM Implementation with custom rules](#gtm-implementation-with-custom-rules)
  - [1. Create Variables](#1-create-variables)
  - [2. Create Rules](#2-create-rules)
  - [3. Create tag](#3-create-tag)
- [Development](#development)
  - [Production build](#production-build)

## Key features

* Lightweight
* Zero dependency
* All-in-one - no aditional css needed
* GDPR Compliant
* Custom themes
* Custom translations

## How to install

1. Download the latest release or use CDN.

    ```
    https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.4.0/dist/cookies.min.js
    ```

1. Insert this code on the bottom of the page, or [inject it via GTM](#gtm-implementation).

    ```html
    <script type="text/javascript" src="<path-to-your>cookies.min.js"></script>
    ```

2. Customize and run.

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
     <p><strong>Tato webov?? str??nka pou????v?? cookies</strong></p>
     <p>K personalizaci obsahu a reklam, poskytov??n?? funkc?? soci??ln??ch m??di?? a anal??ze na???? n??v??t??vnosti vyu????v??me soubory cookie. Informace o tom, jak n???? web pou????v??te, sd??l??me se sv??mi partnery pro soci??ln?? m??dia, inzerci a anal??zy. Partne??i tyto ??daje mohou zkombinovat s dal????mi informacemi, kter?? jste jim poskytli nebo kter?? z??skali v d??sledku toho, ??e pou????v??te jejich slu??by.</p>
    `,
  },
  tabAbout: {
    title: 'O aplikaci',
    body: `
      <p>Cookies jsou mal?? textov?? soubory, kter?? mohou b??t pou????v??ny webov??mi str??nkami, aby u??inily u??ivatelsk?? z????itek v??ce efektivn??.</p>
      <p>Z??kon uv??d??, ??e m????eme ukl??dat cookies na va??em za????zen??, pokud jsou nezbytn?? nutn?? pro provoz t??to str??nky. Pro v??echny ostatn?? typy cookies pot??ebujeme va??e povolen??.</p>
      <p>Tato str??nka pou????v?? r??zn?? typy cookies. N??kter?? cookies jsou um??st??ny slu??bami t??et??ch stran, kter?? se objevuj?? na na??ich str??nk??ch.</p>
      <p>Kdykoliv m????ete zm??nit nebo zru??it sv??j souhlas prost??ednictv??m Vyj??d??en?? o souborech cookie na na??ich webov??ch str??nk??ch.</p>
    `,
  },
  tabDetail: {
    title: 'Detail',
    necessary: {
      title: 'Nutn??',
      perex: 'Nutn?? cookies pom??haj??, aby byla webov?? str??nka pou??iteln?? tak, ??e umo??n?? z??kladn?? funkce jako navigace str??nky a p????stup k zabezpe??en??m sekc??m webov?? str??nky. Webov?? str??nka nem????e spr??vn?? fungovat bez t??chto cookies.',
    },
    preferences: {
      title: 'Preferen??n??',
      perex: 'Preferen??n?? cookies umo????uj??, aby si webov?? str??nka zapamatovala informace, kter?? m??n??, jak se webov?? str??nka chov?? nebo jak vypad??. Je to nap????klad preferovan?? jazyk nebo region, kde se nach??z??te.',
    },
    statistics: {
      title: 'Statistick??',
      perex: 'Statistick?? cookies pom??haj?? majitel??m webov??ch str??nek, aby porozum??li, jak n??v??t??vn??ci pou????vaj?? webov?? str??nky. Anonymn?? sb??raj?? a sd??luj?? informace.',
    },
    marketing: {
      title: 'Marketingov??',
      perex: 'Marketingov?? cookies jsou pou????v??ny pro sledov??n?? n??v??t??vn??k?? na webov??ch str??nk??ch. Z??m??rem je zobrazit reklamu, kter?? je relevantn?? a zaj??mav?? pro jednotliv??ho u??ivatele a t??mto hodnotn??j???? pro vydavatele a inzerenty t??et??ch stran.',
    },
  },
  buttonEdit: {
    label: 'Nastavit',
  },
  buttonAllowAll: {
    label: 'Povolit v??e',
  },
  buttonRejectAll: {
    label: 'Odm??tnout v??e',
  },
  buttonConfirm: {
    label: 'Potvrdit',
  },
  lastUpdated: 'Prohl????en?? o cookies bylo naposledy aktualizov??no %date.',
};
```

> **Info**: Key `%date` in `window.CookieConsentTranslations.lastUpdated` will be replaced with locale date, based on `window.CookieConsentTranslations.locale`.

## Theme Customisation

For theming purposes, these all the keys with it's default values.

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
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
};
```

### Predefined themes

* <details>
  <summary>ZOOT / Default theme</summary>

  ```js
  window.CookieConsentTheme = {
    /* ZOOT theme is same as default theme */
  };
  ```
  </details>

* <details>
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
  };
  ```
  </details>

* <details>
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
  };
  ```
  </details>

* <details>
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
  };
  ```
  </details>

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
};
```

Here is the complete list of setting options:


| Property | Value | description |
| --- | --- | --- |
| `tabAgree.showButtonRejectAll` | `boolean` | Enable reject all button in first tab. Default value is `false`. |
| `tabAbout.showButtonRejectAll` | `boolean` | Enable reject all button in last tab. Default value is `false`. |


## API Methods

### `window.CookieConsentTheme`

Object to pass theme configuration to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentTranslations`

Object to pass translation to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentSettings`

Object to pass settings to consent modal window. This needs to be placed before the consent script src tag.

### `window.CookieConsentModalOpen()`

* Returns `<void>`.

Open the consent modal window.

**Example**:

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

### `window.CookieConsent.marketing`

* Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.preferences`

* Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.statistics`

* Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.necessary`

* Returns `<boolean>`.

Returns a boolean value of consent category.

### `window.CookieConsent.updated`

* Returns `<string>`.

Returns a ISO string formated date and time, or empty string if consent has not yet been updated.

### `window.CookieConsent.id`

* Returns `<string>`.

Returns a unique ID of user given consent, or empty string if consent has not yet been given.

### `window.CookieConsent.type`

* Returns `<string>`.

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

## GTM Implementation with custom rules

### 1. Create Variables

* **CookieConsent.marketing**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.marketing.toString(); }
  ```

* **CookieConsent.preferences**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.preferences.toString(); }
  ```

* **CookieConsent.statistics**

  **Type**: JavaScript Code

  **JavaScript Code**:

  ```js
  function () { return CookieConsent.statistics.toString(); }
  ```

* CookieConsent Version (optional)

  This variable is only for simplified version changes.

  **Type**: Constant

  **Value**:

  ```md
  1.3.0
  ```

### 2. Create Rules

* **CookieConsent - Marketing**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:
    * `CookieConsent.marketing`
    * contains
    * `true`

* **CookieConsent - Preference**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:
    * `CookieConsent.preferences`
    * contains
    * `true`


* **CookieConsent - Statistics**

  **Rule type**: Custom event

  **Event name**:

  ```md
  cookieconsent_updated
  ```

  **This rule run on**: Some custom events

  **Run this rule when...**:
    * `CookieConsent.statistics`
    * contains
    * `true`

### 3. Create tag

* **CookieConsent**

  **Type of tag**: Custom HTML

  **HTML**

  ```html
  <script type="text/javascript" id="cookie-consent-init">

    // Optional: add own translations
    // window.CookieConsentTranslations = {};

    // Optional: add own theme
    // window.CookieConsentTheme = {};

    // Optional: add own theme
    // window.CookieConsentSettings = {};

    window.addEventListener('consent-updated', function consentUpdatedListener() {
      dataLayer.push({
        'event': 'cookieconsent_updated',
      });
    });

    window.addEventListener('consent-ready', function () {
      dataLayer.push({
        'event': 'cookieconsent_ready',
      });
    });

    (function cookiesInit() {
      var scriptEl = document.createElement('script');
      scriptEl.src = 'https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.4.0/dist/cookies.min.js';
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

Then open the localhost url from terminal in browser and navigate to `/public/`.

### Production build

```
npm ci
npm run build:prod
```
