import {
  BODY_ANCHOR_HREF_ACTION_AGREE_ALL,
  BODY_ANCHOR_HREF_ACTION_REJECT_ALL,
  BODY_ANCHOR_HREF_TAB_ABOUT,
  BODY_ANCHOR_HREF_TAB_AGREE,
  BODY_ANCHOR_HREF_TAB_DETAILS,
  CONSENT_TYPE_ADVANCED,
  CONSENT_TYPE_FULL,
  CONSENT_TYPE_REJECTED,
  DIALOG_ELEMENT_NAME,
  DIALOG_FADE_IN_DURATION,
  DIALOG_FADE_OUT_DURATION,
  EVENT_CLICK,
  INLINE_STYLES_MAIN,
} from '../../config';
import { settingsService } from '../../services/settings-service';
import { themeService } from '../../services/theme-service';
import { translationService } from '../../services/translation-service';
import { fadeIn, fadeOut } from '../../utils/animation';
import { ConsentType } from '../../utils/consent';
import { createDivElement, createVElement } from '../../utils/elements';
import { dispatchEventConsentHide, dispatchEventConsentShow } from '../../utils/events';
import { consentButtonClose } from '../consent-button-close/consent-button-close';
import { consentButton, BUTTON_DEFAULT, BUTTON_PRIMARY } from '../consent-button/consent-button';
import { ConsentTab } from '../consent-tab/consent-tab';
import { consentTabs } from '../consent-tabs/consent-tabs';
import { HTMLSwitchButtonElement, switchButton } from '../switch-button/switch-button';
import { tabContentDefault } from '../tab-content-default/tab-content-default';
import { tabContentDetails } from '../tab-content-details/tab-content-details';

const i18n = translationService();
const settings = settingsService();

export class ConsentDialog extends HTMLElement {
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

    this.mainElement = createDivElement(['c-d', 't']);
    this.mainElement.setAttribute('role', 'dialog');
    this.mainElement.setAttribute('aria-modal', 'true');
    this.mainElement.setAttribute('aria-hidden', 'false');

    this.innerElement = createDivElement(['c-d__i']);

    this.tabButtonAgree = new ConsentTab({
      label: i18n.tabAgree.title,
      active: true,
    });

    this.tabButtonDetails = new ConsentTab({
      label: i18n.tabDetail.title,
    });

    this.tabButtonAbout = new ConsentTab({
      label: i18n.tabAbout.title,
    });

    this.switchButtonNecessary = switchButton({
      checked: true,
      disabled: true,
    });
    this.switchButtonPreferences = switchButton();
    this.switchButtonStatistics = switchButton();
    this.switchButtonMarketing = switchButton();
  }

  initStyles(): void {
    // TODO: Add styles.
    this.mainElement.style.display = 'none';
  }

  initHeaderTabs(): void {
    if (settings.disableHeader) {
      return;
    }

    const tabButtonAgree = this.tabButtonAgree.render();
    const tabButtonDetails = this.tabButtonDetails.render();
    const tabButtonAbout = this.tabButtonAbout.render();
    const tabButtonClose = consentButtonClose();

    tabButtonAgree.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAgree();
    });

    tabButtonDetails.addEventListener(EVENT_CLICK, () => {
      this.setTabContentDetails();
    });

    tabButtonAbout.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAbout();
    });

    this.mainElement.appendChild(
      consentTabs({
        tabs: [tabButtonAgree, tabButtonDetails, tabButtonAbout, tabButtonClose],
        modifier: 'c-d__h',
      }),
    );
  }

  setTabContent(tabContent: HTMLDivElement): void {
    this.innerElement.innerHTML = '';
    this.innerElement.appendChild(tabContent);
  }

  setTabContentAgree(): void {
    this.setTabContent(
      tabContentDefault({
        body: i18n.tabAgree.body,
        buttons: [
          settings.tabAgree.showButtonRejectAll ? this.createButtonRejectAll() : false,
          this.createButtonEdit(),
          this.createButtonAllowAll(),
        ],
        onAnchorClick: (event) => {
          this.handleBodyAnchorsClick(event);
        },
      }),
    );

    this.tabButtonAgree.active = true;
  }

  setTabContentDetails(): void {
    this.setTabContent(this.tabContentDetails());
    this.tabButtonDetails.active = true;
  }

  setTabContentAbout(): void {
    this.setTabContent(
      tabContentDefault({
        body: i18n.tabAbout.body,
        buttons: [
          settings.tabAbout.showButtonRejectAll ? this.createButtonRejectAll() : false,
          this.createButtonEdit(),
          this.createButtonAllowAll(),
        ],
        onAnchorClick: (event) => {
          this.handleBodyAnchorsClick(event);
        },
      }),
    );

    this.tabButtonAbout.active = true;
  }

  handleBodyAnchorsClick(event: Event): void {
    if (event.target === null) {
      return;
    }

    const el = (event.target as HTMLAnchorElement).closest('a');

    if (el === null) {
      return;
    }

    if (el.href.includes(BODY_ANCHOR_HREF_TAB_AGREE)) {
      event.preventDefault();
      this.setTabContentAgree();
      return;
    }

    if (el.href.includes(BODY_ANCHOR_HREF_TAB_DETAILS)) {
      event.preventDefault();
      this.setTabContentDetails();
      return;
    }

    if (el.href.includes(BODY_ANCHOR_HREF_TAB_ABOUT)) {
      event.preventDefault();
      this.setTabContentAbout();
      return;
    }

    if (el.href.includes(BODY_ANCHOR_HREF_ACTION_AGREE_ALL)) {
      event.preventDefault();
      this.updateConsentOnClick(true, true, true, CONSENT_TYPE_FULL);
      return;
    }

    if (el.href.includes(BODY_ANCHOR_HREF_ACTION_REJECT_ALL)) {
      event.preventDefault();
      this.updateConsentOnClick(false, false, false, CONSENT_TYPE_REJECTED);
      return;
    }
  }

  tabContentDetails(): HTMLDivElement {
    this.switchButtonPreferences.setChecked(window.CookieConsent.preferences);
    this.switchButtonStatistics.setChecked(window.CookieConsent.statistics);
    this.switchButtonMarketing.setChecked(window.CookieConsent.marketing);

    return tabContentDetails({
      buttons: [
        this.createButtonRejectAll(),
        this.createButtonConfirm(),
        settings.tabDetails.showButtonAllowAll ? this.createButtonAllowAll() : false,
      ],
      lastUpdated: i18n.lastUpdated,
      sections: {
        necessary: {
          ...i18n.tabDetail.necessary,
          switch: this.switchButtonNecessary,
          onAnchorClick: (event) => {
            this.handleBodyAnchorsClick(event);
          },
        },
        preferences: {
          ...i18n.tabDetail.preferences,
          switch: this.switchButtonPreferences,
          onAnchorClick: (event) => {
            this.handleBodyAnchorsClick(event);
          },
        },
        statistics: {
          ...i18n.tabDetail.statistics,
          switch: this.switchButtonStatistics,
          onAnchorClick: (event) => {
            this.handleBodyAnchorsClick(event);
          },
        },
        marketing: {
          ...i18n.tabDetail.marketing,
          switch: this.switchButtonMarketing,
          onAnchorClick: (event) => {
            this.handleBodyAnchorsClick(event);
          },
        },
      },
    });
  }

  updateConsentOnClick(preferences: boolean, statistics: boolean, marketing: boolean, type: ConsentType): void {
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
      modifier: 'c-d__f-b',
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
      modifier: 'c-d__f-b',
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.updateConsentOnClick(true, true, true, CONSENT_TYPE_FULL);
    });

    return button;
  }

  createButtonRejectAll(): HTMLButtonElement {
    const button = consentButton({
      label: i18n.buttonRejectAll.label,
      variant: BUTTON_PRIMARY,
      modifier: 'c-d__f-b',
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
      modifier: 'c-d__f-b',
    });

    button.addEventListener(EVENT_CLICK, () => {
      this.updateConsentOnClick(
        this.switchButtonPreferences.isChecked(),
        this.switchButtonStatistics.isChecked(),
        this.switchButtonMarketing.isChecked(),
        CONSENT_TYPE_ADVANCED,
      );
    });

    return button;
  }

  appendCode(): void {
    this.shadow.appendChild(createVElement<HTMLStyleElement>('style', {}, INLINE_STYLES_MAIN));
    this.shadow.appendChild(createVElement<HTMLStyleElement>('style', {}, themeService().themeTextContent));
    this.shadow.appendChild(this.mainElement);

    this.mainElement.appendChild(this.innerElement);
  }

  closeModal(): void {
    setTimeout(async () => {
      await fadeOut(this.mainElement, DIALOG_FADE_OUT_DURATION);
      const consentModal = document.querySelector(DIALOG_ELEMENT_NAME);
      consentModal?.remove();
    }, 300);
  }

  /**
   * Connected Lifecycle Callback
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
  async connectedCallback(): Promise<void> {
    this.initStyles();
    this.initHeaderTabs();
    this.appendCode();
    this.setTabContentAgree();

    dispatchEventConsentShow();

    await fadeIn(this.mainElement, DIALOG_FADE_IN_DURATION);
  }

  /**
   * Disconnected Lifecycle Callback.
   *
   * @link <https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks>
   */
  disconnectedCallback(): void {
    dispatchEventConsentHide();
  }
}

customElements.define(DIALOG_ELEMENT_NAME, ConsentDialog);
