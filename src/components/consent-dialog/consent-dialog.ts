import { DIALOG_ELEMENT_NAME, DIALOG_FADE_IN_DURATION, DIALOG_FADE_OUT_DURATION, INLINE_STYLES_MAIN } from '../../config';
import { themeService } from '../../services/theme-service';
import { translationService } from '../../services/translation-service';
import { fadeIn, fadeOut } from '../../utils/animation';
import { createElement, createDivElement } from '../../utils/elements';
import { consentButton, BUTTON_DEFAULT, BUTTON_PRIMARY } from '../consent-button/consent-button';
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

    this.componentStyle = createElement('style') as HTMLStyleElement;
    this.componentThemeStyle = createElement('style') as HTMLStyleElement;
    this.mainElement = createDivElement();
    this.innerElement = createDivElement();

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

  initStyles(): void {
    this.componentStyle.textContent = INLINE_STYLES_MAIN;
    this.componentThemeStyle.textContent = themeService().themeTextContent;

    const tabButtonAgree = this.tabButtonAgree.render();
    const tabButtonDetails = this.tabButtonDetails.render();
    const tabButtonAbout = this.tabButtonAbout.render();

    this.mainElement.classList.add(...['c-d', 't']);
    this.mainElement.style.display = 'none';

    this.mainElement.appendChild(
      consentTabs({
        tabs: [tabButtonAgree, tabButtonDetails, tabButtonAbout],
        modifier: 'c-d__h',
      }),
    );

    this.mainElement.appendChild(this.innerElement);

    this.innerElement.classList.add('c-d__i');

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

  setTabContent(tabContent: HTMLDivElement): void {
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(tabContent);
  }

  setTabContentAgree(): void {
    // console.log('Souhlas je aktivní');
    this.setTabContent(this.tabContentAgree());
    this.tabButtonAgree.active = true;
  }

  setTabContentDetails(): void {
    // console.log('Detaily je aktivní');
    this.setTabContent(this.tabContentDetails());
    this.tabButtonDetails.active = true;
  }

  setTabContentAbout(): void {
    // console.log('O aplikaci je aktivní');
    this.setTabContent(this.tabContentAbout());
    this.tabButtonAbout.active = true;
  }

  tabContentAgree(): HTMLDivElement {
    return tabContentDefault({
      body: i18n.tabAgree.body,
      buttonEdit: this.createButtonEdit(),
      buttonAllowAll: this.createButtonAllowAll(),
    });
  }

  tabContentDetails(): HTMLDivElement {
    this.switchButtonPreferences.setChecked(window.CookieConsent.preferences);
    this.switchButtonStatistics.setChecked(window.CookieConsent.statistics);
    this.switchButtonMarketing.setChecked(window.CookieConsent.marketing);

    return tabContentDetails({
      buttonRejectAll: this.createButtonRejectAll(),
      buttonConfirm: this.createButtonConfirm(),
      lastUpdated: i18n.lastUpdated,
      sections: {
        necessary: {
          ...i18n.tabDetail.necessary,
          switch: this.switchButtonNecessary,
        },
        preferences: {
          ...i18n.tabDetail.preferences,
          switch: this.switchButtonPreferences,
        },
        statistics: {
          ...i18n.tabDetail.statistics,
          switch: this.switchButtonStatistics,
        },
        marketing: {
          ...i18n.tabDetail.marketing,
          switch: this.switchButtonMarketing,
        },
      },
    });
  }

  tabContentAbout(): HTMLDivElement {
    const body = i18n.tabAbout.body;

    return tabContentDefault({
      body,
      buttonEdit: this.createButtonEdit(),
      buttonAllowAll: this.createButtonAllowAll(),
    });
  }

  createButtonEdit(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonEdit.label,
      variant: BUTTON_DEFAULT,
    });

    button.addEventListener('click', () => {
      this.setTabContentDetails();
    });

    return button;
  }

  createButtonAllowAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonAllowAll.label,
      variant: BUTTON_PRIMARY,
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
      variant: BUTTON_DEFAULT,
    });

    button.addEventListener('click', () => {
      // console.log('Odmítnout vše');

      this.switchButtonPreferences.setChecked(false);
      this.switchButtonStatistics.setChecked(false);
      this.switchButtonMarketing.setChecked(false);

      window.CookieConsent.preferences = false;
      window.CookieConsent.statistics = false;
      window.CookieConsent.marketing = false;

      this.closeModal();
    });

    return button;
  }

  createButtonConfirm(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonConfirm.label,
      variant: BUTTON_PRIMARY,
    });

    button.addEventListener('click', () => {
      window.CookieConsent.preferences = this.switchButtonPreferences.isChecked();
      window.CookieConsent.statistics = this.switchButtonStatistics.isChecked();
      window.CookieConsent.marketing = this.switchButtonMarketing.isChecked();

      this.closeModal();
    });

    return button;
  }

  createSwitchNecessary(): HTMLSwitchButtonElement {
    return switchButton({
      checked: true,
      disabled: true,
    });
  }

  createSwitchStatistics(): HTMLSwitchButtonElement {
    return switchButton();
  }

  createSwitchMarketing(): HTMLSwitchButtonElement {
    return switchButton();
  }

  createSwitchPreferences(): HTMLSwitchButtonElement {
    return switchButton();
  }

  appendCode(): void {
    this.shadow.appendChild(this.componentStyle);
    this.shadow.appendChild(this.componentThemeStyle);
    this.shadow.appendChild(this.mainElement);
  }

  closeModal(): void {
    setTimeout(async () => {
      await fadeOut(this.mainElement, DIALOG_FADE_OUT_DURATION);
      const consentModal = document.querySelector(DIALOG_ELEMENT_NAME);
      consentModal?.remove();
    }, 500);
  }

  main(): void {
    this.initStyles();
    this.appendCode();
    this.setTabContentAgree();

    fadeIn(this.mainElement, DIALOG_FADE_IN_DURATION);
  }
}

customElements.define(DIALOG_ELEMENT_NAME, ConsentDialog);
