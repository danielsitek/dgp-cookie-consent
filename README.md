# ZOOT Cookie Consent

Awesome one-of-a-kind Cookie Consent panel.

## How to install

Insert this code on the bottom of the page.

```html
<script type="text/javascript" src="/dist/cookies.js"></script>
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
