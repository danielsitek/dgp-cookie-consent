import { consentButton } from '../consent-button/consent-button';
import { consentDialogFooter } from '../consent-dialog-footer/consent-dialog-footer';
import { ConsentTab } from '../consent-tab/consent-tab';
import { consentTabs } from '../consent-tabs/consent-tabs';
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
      <p><strong>Sbídáme sušenky, abychom tě našli</strong></p>

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
    const content = tabContentDetails({
      buttonRejectAll: this.createButtonRejectAll(),
      buttonConfirm: this.createButtonConfirm(),
      lastUpdated: 'Prohlášení o cookies bylo naposledy aktualizováno %date.',
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
    });

    return button;
  }

  createButtonConfirm(): HTMLButtonElement {
    const button = consentButton({
      label: 'Potvrdit',
      variant: 'primary',
    });

    button.addEventListener('click', () => {
      console.log('Potvrdit');
    });

    return button;
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
