import type { CookieConsentTranslations } from '@/services/translation-service';

const cs: CookieConsentTranslations = {
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
  buttonClose: {
    label: 'Odložit rozhodnutí na později',
  },
  badge: {
    label: 'Upravit nastavení cookies',
  },
  lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
};

export default cs;
