import { CONSENT_TYPE_ADVANCED, CONSENT_TYPE_FULL, CONSENT_TYPE_REJECTED, DIALOG_ELEMENT_NAME, DIALOG_FADE_IN_DURATION, DIALOG_FADE_OUT_DURATION, EVENT_CLICK, INLINE_STYLES_MAIN } from '../../config';
import { themeService } from '../../services/theme-service';
import { translationService } from '../../services/translation-service';
import { fadeIn, fadeOut } from '../../utils/animation';
import { ConsentType } from '../../utils/consent';
import { createElement, createDivElement } from '../../utils/elements';
import { dispatchEventConsentHide, dispatchEventConsentShow } from '../../utils/events';
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
    this.mainElement = createDivElement(['c-d', 't']);
    this.innerElement = createDivElement(['c-d__i']);

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

    this.mainElement.style.display = 'none';

    this.mainElement.appendChild(
      consentTabs({
        tabs: [tabButtonAgree, tabButtonDetails, tabButtonAbout],
        modifier: 'c-d__h',
      }),
    );

    this.mainElement.appendChild(this.innerElement);

    tabButtonAgree.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAgree();
    });

    tabButtonDetails.addEventListener(EVENT_CLICK, () => {
      this.setTabContentDetails();
    });

    tabButtonAbout.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAbout();
    });
  }

  setTabContent(tabContent: HTMLDivElement): void {
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(tabContent);
  }

  setTabContentAgree(): void {
    this.setTabContent(this.tabContentAgree());
    this.tabButtonAgree.active = true;
  }

  setTabContentDetails(): void {
    this.setTabContent(this.tabContentDetails());
    this.tabButtonDetails.active = true;
  }

  setTabContentAbout(): void {
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

  updateConsentOnClick(preferences: boolean, statistics: boolean, marketing: boolean, type: ConsentType):void {
    // Consent Update type
    window.CookieConsent.type = type;

    window.CookieConsent.preferences = preferences;
    window.CookieConsent.statistics = statistics;
    window.CookieConsent.marketing = marketing;

    this.closeModal();
  }

  createButtonEdit(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonEdit.label,
      variant: BUTTON_DEFAULT,
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.setTabContentDetails();
    });

    return button;
  }

  createButtonAllowAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonAllowAll.label,
      variant: BUTTON_PRIMARY,
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.updateConsentOnClick(true, true, true, CONSENT_TYPE_FULL);
    });

    return button;
  }

  createButtonRejectAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonRejectAll.label,
      variant: BUTTON_DEFAULT,
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.switchButtonPreferences.setChecked(false);
      this.switchButtonStatistics.setChecked(false);
      this.switchButtonMarketing.setChecked(false);

      this.updateConsentOnClick(false, false, false, CONSENT_TYPE_REJECTED);
    });

    return button;
  }

  createButtonConfirm(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonConfirm.label,
      variant: BUTTON_PRIMARY,
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.updateConsentOnClick(
        this.switchButtonPreferences.isChecked(),
        this.switchButtonStatistics.isChecked(),
        this.switchButtonMarketing.isChecked(),
        CONSENT_TYPE_ADVANCED
      );
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

  async main(): Promise<void> {
    this.initStyles();
    this.appendCode();
    this.setTabContentAgree();

    await fadeIn(this.mainElement, DIALOG_FADE_IN_DURATION);
  }

  /**
   * Connected Lifecycle Callback
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
  connectedCallback() {
    dispatchEventConsentShow();
  }

  /**
   * Disconnected Lifecycle Callback.
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
   disconnectedCallback() {
    dispatchEventConsentHide();
  }
}

customElements.define(DIALOG_ELEMENT_NAME, ConsentDialog);
