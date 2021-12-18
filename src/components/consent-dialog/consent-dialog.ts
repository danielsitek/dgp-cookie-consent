import { consentButton } from '../consent-button/consent-button';
import { ConsentTab } from '../consent-tab/consent-tab';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { HTMLSwitchButtonElement, switchButton } from '../switch-button/switch-button';
import { tabContentDefault } from '../tab-content-default/tab-content-default';
import { tabContentDetails } from '../tab-content-details/tab-content-details';
import { consentDialogStyles } from './consent-dialog-styles';

export class ConsentDialog extends HTMLElement {

  private componentStyle: HTMLStyleElement;

  private mainElement: HTMLDivElement;

  private innerElement: HTMLDivElement;

  private tabButtonAgree: ConsentTab;
  private tabButtonDetails: ConsentTab;
  private tabButtonAbout: ConsentTab;

  private switchButtonNecessary: HTMLSwitchButtonElement;
  private switchButtonPreferences: HTMLSwitchButtonElement;
  private switchButtonStatistics: HTMLSwitchButtonElement;
  private switchButtonMarketing: HTMLSwitchButtonElement;

  private shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.componentStyle = document.createElement('style');
    this.mainElement = document.createElement('div');
    this.innerElement = document.createElement('div');

    this.tabButtonAgree = new ConsentTab({
      label: 'Souhlas',
      active: true,
    }, () => {
      // this.setTabContentAgree();
    });

    this.tabButtonDetails = new ConsentTab({
      label: 'Detaily',
    }, () => {
      // this.setTabContentDetails();
    });

    this.tabButtonAbout = new ConsentTab({
      label: 'O aplikaci',
    }, () => {
      // this.setTabContentAbout();
    });

    this.switchButtonNecessary = this.createSwitchNecessary();
    this.switchButtonPreferences = this.createSwitchPreferences();
    this.switchButtonStatistics = this.createSwitchStatistics();
    this.switchButtonMarketing = this.createSwitchMarketing();

    this.main();
  }

  initStyles() {
    this.componentStyle.textContent = consentDialogStyles;

    const tabButtonAgree = this.tabButtonAgree.render();
    const tabButtonDetails = this.tabButtonDetails.render();
    const tabButtonAbout = this.tabButtonAbout.render();

    this.mainElement.classList.add('consent-dialog');
    this.mainElement.classList.add('consent-dialog-root');
    this.mainElement.appendChild(consentTabs({
      tabs: [
        tabButtonAgree,
        tabButtonDetails,
        tabButtonAbout,
      ]
    }));

    this.mainElement.appendChild(this.innerElement);

    this.innerElement.classList.add('consent-dialog__inner');

    tabButtonAgree.addEventListener('click', () => {
      this.setTabContentAgree();
    });

    tabButtonDetails.addEventListener('click', () => {
      this.setTabContentDetails();
    });

    tabButtonAbout.addEventListener('click', () => {
      this.setTabContentAbout();
    });
  }

  setTabContentAgree() {
    console.log('Souhlas je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentAgree());
    this.tabButtonAgree.active = true;
  }

  setTabContentDetails() {
    console.log('Detaily je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentDetails());
    this.tabButtonDetails.active = true;
  }

  setTabContentAbout() {
    console.log('O aplikaci je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentAbout());
    this.tabButtonAbout.active = true;
  }

  tabContentAgree() {
    const body = `
      <p><strong>Sbíráme sušenky, abychom tě našli</strong></p>

      <p>Chceš se na internetu dívat na reklamy, které tě pobaví a neštvou? Nebudeme ti nabízet hrnce ani krém na revma. Díky infomracím "cookies", na které nám dáš palec nahoru, ti můžeme naservírovat obsah na míru a vylepšovat naše služby.</p>
    `;

    const content = tabContentDefault({
      body,
      buttonEdit: this.createButtonEdit(),
      buttonAllowAll: this.createButtonAllowAll(),
    });

    return content;
  }

  tabContentDetails() {

    this.switchButtonPreferences.setChecked(window.CookieConsent.preferences);
    this.switchButtonStatistics.setChecked(window.CookieConsent.statistics);
    this.switchButtonMarketing.setChecked(window.CookieConsent.marketing);

    const content = tabContentDetails({
      buttonRejectAll: this.createButtonRejectAll(),
      buttonConfirm: this.createButtonConfirm(),
      lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
      sections: {
        necessary: {
          title: 'Nutné',
          perex: 'Nutné cookies pomáhají, aby byla webová stránka použitelná tak, že umožní základní funkce jako navigace stránky a přístup k zabezpečeným sekcím webové stránky.',
          switch: this.switchButtonNecessary,
        },
        preferences: {
          title: 'Preferences',
          perex: 'Preference cookies enable a website to remember information that changes the way the website behaves or looks, like your preferred language or the region that you are in.',
          switch: this.switchButtonPreferences,
        },
        statistics: {
          title: 'Statistické',
          perex: 'Statistic cookies help website owners to understand how visitors interact with websites by collecting and reporting information anonymously.',
          switch: this.switchButtonStatistics,
        },
        marketing: {
          title: 'Marketing',
          perex: 'Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
          switch: this.switchButtonMarketing,
        }
      }
    });

    return content;
  }

  tabContentAbout(): HTMLElement {
    const body = `
      <p>Cookies jsou malé textové soubory, které mobou být používány webovými stránkami, aby učinily uživatelský zážitek více efektivní.</p>
      <p>Zákon uvádí, že můžeme uklákadt cookies na vašem zařízení, pokud jsou nezbytně nutné pro provoz této stránky. Pro všechny ostatní typy cookies potřebujeme vaše povolení.</p>
      <p>Tato stránka používá různé typy cookies. Některé cookies jsou umístěny službami třetích stran, které se objevují na našich stránkách.</p>
      <p>Kdykoliv můžete změnit nebo zrušit svůj souhlas prostřednictvím vyjádření o souborech cookies na našich webových stránkách.</p>
    `;

    const content = tabContentDefault({
      body,
      buttonEdit: this.createButtonEdit(),
      buttonAllowAll: this.createButtonAllowAll(),
    });

    return content;
  }

  createButtonEdit(): HTMLButtonElement {
    const button = consentButton({
      label: 'Upravit',
      variant: 'default',
    });

    button.addEventListener('click', () => {
      this.setTabContentDetails();
    });

    return button;
  }

  createButtonAllowAll(): HTMLButtonElement {
    const button = consentButton({
      label: 'Povolit vše',
      variant: 'primary',
    });

    button.addEventListener('click', () => {
      console.log('Povolit vše');

      window.CookieConsent.preferences = true;
      window.CookieConsent.statistics = true;
      window.CookieConsent.marketing = true;
    });

    return button;
  }

  createButtonRejectAll(): HTMLButtonElement {
    const button = consentButton({
      label: 'Odmítnout vše',
      variant: 'default',
    });

    button.addEventListener('click', () => {
      console.log('Odmítnout vše');

      this.switchButtonPreferences.setChecked(false);
      this.switchButtonStatistics.setChecked(false);
      this.switchButtonMarketing.setChecked(false);

      window.CookieConsent.preferences = false;
      window.CookieConsent.statistics = false;
      window.CookieConsent.marketing = false;
    });

    return button;
  }

  createButtonConfirm(): HTMLButtonElement {
    const button = consentButton({
      label: 'Potvrdit',
      variant: 'primary',
    });

    button.addEventListener('click', () => {
      console.log(
        'Potvrdit',
        this.switchButtonNecessary.isChecked(),
        this.switchButtonPreferences.isChecked(),
        this.switchButtonStatistics.isChecked(),
        this.switchButtonMarketing.isChecked()
      );

      window.CookieConsent.preferences = this.switchButtonPreferences.isChecked();
      window.CookieConsent.statistics = this.switchButtonStatistics.isChecked();
      window.CookieConsent.marketing = this.switchButtonMarketing.isChecked();
    });

    return button;
  }

  createSwitchNecessary(): HTMLSwitchButtonElement {
    const el = switchButton({
      checked: true,
      disabled: true,
    });

    return el;
  }

  createSwitchStatistics(): HTMLSwitchButtonElement {
    const el = switchButton();

    return el;
  }

  createSwitchMarketing(): HTMLSwitchButtonElement {
    const el = switchButton();

    return el;
  }

  createSwitchPreferences(): HTMLSwitchButtonElement {
    const el = switchButton();

    return el;
  }

  appendCode() {
    this.shadow.appendChild(this.componentStyle);
    this.shadow.appendChild(this.mainElement);
  }

  main() {
    this.initStyles();
    this.appendCode();
    this.setTabContentAgree();
  }
}

customElements.define('consent-dialog', ConsentDialog);
