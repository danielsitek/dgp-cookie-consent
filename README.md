# ZOOT Cookie Consent

Awesome one-of-a-kind Cookie Consent panel.

## How to install

Insert this code on the bottom of the page, or inject it via GTM.

```html
<script>
  window.CookieConsentTheme = {
    'button-default__bg-color': 'pink',
  };

  window.CookieConsentTranslations = {};
</script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/danielsitek/dgp-cookie-consent@1.0.0/dist/cookies.min.js"></script>
```

## How to use with GTM

Send event to GTM when consent get updated and one of the options is allowed (true).

```js
window.addEventListener('consent-updated', () => {
  if (window.CookieConsent.necessary) {
    dataLayer.push({
      'event': 'cookieconsent_necessary',
    });
  }

  if (window.CookieConsent.preferences) {
    dataLayer.push({
      'event': 'cookieconsent_preferences',
    });
  }

  if (window.CookieConsent.statistics) {
    dataLayer.push({
      'event': 'cookieconsent_statistics',
    });
  }

  if (window.CookieConsent.marketing) {
    dataLayer.push({
      'event': 'cookieconsent_marketing',
    });
  }
});
```

Or, change GTM custom variables when consent get updated.

```js
window.addEventListener('consent-updated', () => {
  dataLayer.push({
    'cookieconsent_necessary': window.CookieConsent.necessary,
    'cookieconsent_preferences': window.CookieConsent.preferences,
    'cookieconsent_statistics': window.CookieConsent.statistics,
    'cookieconsent_marketing': window.CookieConsent.marketing,
  });
});
```

## Translations

You can use your own translation for every text in ZOOT Cookie Consent.

```js
window.CookieConsentTranslations = {
  locale: 'cs-CZ',
  tabAgree: {
    title: 'Souhlas',
    body: `
      <p><strong>Sbíráme sušenky, abychom tě našli</strong></p>

      <p>Chceš se na internetu dívat na reklamy, které tě pobaví a neštvou? Nebudeme ti nabízet hrnce ani krém na revma. Díky infomracím "cookies", na které nám dáš palec nahoru, ti můžeme naservírovat obsah na míru a vylepšovat naše služby.</p>
    `,
  },
  tabAbout: {
    title: 'O aplikaci',
    body: `
      <p>Cookies jsou malé textové soubory, které mobou být používány webovými stránkami, aby učinily uživatelský zážitek více efektivní.</p>
      <p>Zákon uvádí, že můžeme uklákadt cookies na vašem zařízení, pokud jsou nezbytně nutné pro provoz této stránky. Pro všechny ostatní typy cookies potřebujeme vaše povolení.</p>
      <p>Tato stránka používá různé typy cookies. Některé cookies jsou umístěny službami třetích stran, které se objevují na našich stránkách.</p>
      <p>Kdykoliv můžete změnit nebo zrušit svůj souhlas prostřednictvím vyjádření o souborech cookies na našich webových stránkách.</p>
    `,
  },
  tabDetail: {
    title: 'Detail',
    necessary: {
      title: 'Nutné',
      perex: 'Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní základní funkce jako navigace stránky a přístup k zabezpečeným sekcím webové stránky.',
    },
    preferences: {
      title: 'Preferences',
      perex: 'Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.',
    },
    statistics: {
      title: 'Statistické',
      perex: 'Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.',
    },
    marketing: {
      title: 'Marketingové',
      perex: 'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
    },
  },
  buttonEdit: {
    label: 'Upravit',
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
  lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
};
```

## Theming

For theming purposes, these all the keys with it's default values.

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'border-radius': '6px',

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

## Available themes:

### ZOOT / Default theme

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'border-radius': '6px',

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

### Different

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'border-radius': '6px',

  'color-grey': '#d6d6d6',
  'color-primary': '#008c95',
  'color-text-light': '#757575',
  'color-text': '#242424',
  'color-white': '#fff',

  'button-default__bg-color': '#fff',
  'button-default__color': '#676767',
  'button-default__text-transform': 'none',
  'button-default__border': '2px solid #676767',
  'button-default__box-shadow': 'none',

  'button-default--hover__bg-color': '#d8e0e6',
  'button-default--hover__color': '#676767',
  'button-default--hover__border': '2px solid #676767',
  'button-default--hover__box-shadow': '0 0 17px 0 rgba(0,0,0,.1)',

  'button-primary__bg-color': '#008c95',
  'button-primary__color': '#fff',
  'button-primary__text-transform': 'uppercase',
  'button-primary__border': '0 none',
  'button-primary__box-shadow': 'none',

  'button-primary--hover__bg-color': '#007379',
  'button-primary--hover__color': '#fff',
  'button-primary--hover__border': '0 none',
  'button-primary--hover__box-shadow': 'none',
};
```

### UrbanStore

```js
window.CookieConsentTheme = {
  'base-color': '#393939',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'border-radius': '0',

  'color-grey': '#d6d6d6',
  'color-primary': '#cfad69',
  'color-text-light': '#757575',
  'color-text': '#242424',
  'color-white': '#fff',

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
  'button-primary__text-transform': 'uppercase',
  'button-primary__border': '0 none',
  'button-primary__box-shadow': 'none',

  'button-primary--hover__bg-color': '#cfad69',
  'button-primary--hover__color': '#fff',
  'button-primary--hover__border': '0 none',
  'button-primary--hover__box-shadow': 'none',
};
```

### Bibloo

```js
window.CookieConsentTheme = {
  'base-color': '#3c3c3c',
  'base-font-size': '15px',
  'base-line': '1px solid #d0d0d0',
  'base-font-family': 'sans-serif',
  'border-radius': '0',

  'color-grey': '#d6d6d6',
  'color-primary': '#000000',
  'color-text-light': '#757575',
  'color-text': '#242424',
  'color-white': '#fff',

  'button-default__bg-color': '#f3f3f2',
  'button-default__color': '#676767',
  'button-default__text-transform': 'uppercase',
  'button-default__border': '0 none',
  'button-default__box-shadow': 'none',

  'button-default--hover__bg-color': '#f3f3f2',
  'button-default--hover__color': '#676767',
  'button-default--hover__border': '0 none',
  'button-default--hover__box-shadow': 'nonoe',

  'button-primary__bg-color': '#000000',
  'button-primary__color': '#fff',
  'button-primary__text-transform': 'uppercase',
  'button-primary__border': '0 none',
  'button-primary__box-shadow': 'none',

  'button-primary--hover__bg-color': '#f3f3f2',
  'button-primary--hover__color': '#000',
  'button-primary--hover__border': '0 none',
  'button-primary--hover__box-shadow': 'none',
};
```

---

## Develop

You just need node >= 12 and run these commands:

```
npm i
npm run dev
```

Then open the localhost url from terminal in browser and navigate to `/public/`.

## Production build

```
npm ci
npm run build:prod
```
