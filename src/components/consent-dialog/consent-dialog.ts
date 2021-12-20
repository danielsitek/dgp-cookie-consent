import { INLINE_STYLES_MAIN } from '../../config';
import { themeService } from '../../services/theme-service';
import { translationService } from '../../services/translation-service';
import { consentButton } from '../consent-button/consent-button';
import { ConsentTab } from '../consent-tab/consent-tab';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { HTMLSwitchButtonElement, switchButton } from '../switch-button/switch-button';
import { tabContentDefault } from '../tab-content-default/tab-content-default';
import { tabContentDetails } from '../tab-content-details/tab-content-details';

const i18n = translationService();

export class ConsentDialog extends HTMLElement {
  private componentStyle: HTMLStyleElement;
  private componentThemeStyle: HTMLStyleElement;

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
    this.componentThemeStyle = document.createElement('style');
    this.mainElement = document.createElement('div');
    this.innerElement = document.createElement('div');

    this.tabButtonAgree = new ConsentTab(
      {
        label: i18n.tabAgree.title,
        active: true,
      },
    );

    this.tabButtonDetails = new ConsentTab(
      {
        label: i18n.tabDetail.title,
      },
    );

    this.tabButtonAbout = new ConsentTab(
      {
        label: i18n.tabAbout.title,
      },
    );

    this.switchButtonNecessary = this.createSwitchNecessary();
    this.switchButtonPreferences = this.createSwitchPreferences();
    this.switchButtonStatistics = this.createSwitchStatistics();
    this.switchButtonMarketing = this.createSwitchMarketing();

    this.main();
  }

  initStyles() {
    this.componentStyle.textContent = INLINE_STYLES_MAIN;
    this.componentThemeStyle.textContent = themeService().themeTextContent;

    const tabButtonAgree = this.tabButtonAgree.render();
    const tabButtonDetails = this.tabButtonDetails.render();
    const tabButtonAbout = this.tabButtonAbout.render();

    this.mainElement.classList.add('consent-dialog');
    this.mainElement.classList.add('consent-dialog-root');
    this.mainElement.appendChild(
      consentTabs({
        tabs: [tabButtonAgree, tabButtonDetails, tabButtonAbout],
      }),
    );

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
    // console.log('Souhlas je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentAgree());
    this.tabButtonAgree.active = true;
  }

  setTabContentDetails() {
    // console.log('Detaily je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentDetails());
    this.tabButtonDetails.active = true;
  }

  setTabContentAbout() {
    // console.log('O aplikaci je aktivní');
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(this.tabContentAbout());
    this.tabButtonAbout.active = true;
  }

  tabContentAgree() {
    const body = i18n.tabAgree.body;

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
      lastUpdated: i18n.lastUpdated,
      sections: {
        necessary: {
          title: i18n.tabDetail.necessary.title,
          perex: i18n.tabDetail.necessary.perex,
          switch: this.switchButtonNecessary,
        },
        preferences: {
          title: i18n.tabDetail.preferences.title,
          perex: i18n.tabDetail.preferences.perex,
          switch: this.switchButtonPreferences,
        },
        statistics: {
          title: i18n.tabDetail.statistics.title,
          perex: i18n.tabDetail.statistics.perex,
          switch: this.switchButtonStatistics,
        },
        marketing: {
          title: i18n.tabDetail.marketing.title,
          perex: i18n.tabDetail.marketing.perex,
          switch: this.switchButtonMarketing,
        },
      },
    });

    return content;
  }

  tabContentAbout(): HTMLElement {
    const body = i18n.tabAbout.body;

    const content = tabContentDefault({
      body,
      buttonEdit: this.createButtonEdit(),
      buttonAllowAll: this.createButtonAllowAll(),
    });

    return content;
  }

  createButtonEdit(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonEdit.label,
      variant: 'default',
    });

    button.addEventListener('click', () => {
      this.setTabContentDetails();
    });

    return button;
  }

  createButtonAllowAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonAllowAll.label,
      variant: 'primary',
    });

    button.addEventListener('click', () => {
      // console.log('Povolit vše');

      window.CookieConsent.preferences = true;
      window.CookieConsent.statistics = true;
      window.CookieConsent.marketing = true;

      this.closeModal();
    });

    return button;
  }

  createButtonRejectAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonRejectAll.label,
      variant: 'default',
    });

    button.addEventListener('click', () => {
      // console.log('Odmítnout vše');

      this.switchButtonPreferences.setChecked(false);
      this.switchButtonStatistics.setChecked(false);
      this.switchButtonMarketing.setChecked(false);

      // window.CookieConsent.preferences = false;
      // window.CookieConsent.statistics = false;
      // window.CookieConsent.marketing = false;
    });

    return button;
  }

  createButtonConfirm(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonConfirm.label,
      variant: 'primary',
    });

    button.addEventListener('click', () => {
      // console.log(
      //   'Potvrdit',
      //   this.switchButtonNecessary.isChecked(),
      //   this.switchButtonPreferences.isChecked(),
      //   this.switchButtonStatistics.isChecked(),
      //   this.switchButtonMarketing.isChecked()
      // );

      window.CookieConsent.preferences = this.switchButtonPreferences.isChecked();
      window.CookieConsent.statistics = this.switchButtonStatistics.isChecked();
      window.CookieConsent.marketing = this.switchButtonMarketing.isChecked();

      this.closeModal();
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
    this.shadow.appendChild(this.componentThemeStyle);
    this.shadow.appendChild(this.mainElement);
  }

  closeModal() {
    setTimeout(() => {
      const consentModal = document.querySelector('consent-dialog');
      consentModal?.remove();
    }, 500);
  }

  main() {
    this.initStyles();
    this.appendCode();
    this.setTabContentAgree();
  }
}

customElements.define('consent-dialog', ConsentDialog);
