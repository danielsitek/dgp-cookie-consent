import { CookieConsentTranslations } from '../services/translation-service';

const cs: CookieConsentTranslations = {
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

export default cs;
