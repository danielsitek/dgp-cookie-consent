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
} from '@/config';
import { settingsService } from '@/services/settings-service';
import { themeService } from '@/services/theme-service';
import { translationService } from '@/services/translation-service';
import { fadeIn, fadeOut } from '@/utils/animation';
import { ConsentType } from '@/utils/consent';
import { createVElement } from '@/utils/elements';
import { dispatchEventConsentHide, dispatchEventConsentShow } from '@/utils/events';
import { consentButtonClose } from '@/components/consent-button-close/consent-button-close';
import { consentButton, consentButtonPrimary } from '@/components/consent-button/consent-button';
import { ConsentTab } from '@/components/consent-tab/consent-tab';
import { consentTabs } from '@/components/consent-tabs/consent-tabs';
import { HTMLSwitchButtonElement, switchButton } from '@/components/switch-button/switch-button';
import { tabContentDefault } from '@/components/tab-content-default/tab-content-default';
import { TabContentDetailsProps, tabContentDetails } from '@/components/tab-content-details/tab-content-details';
import { consentDialog } from '@/components/consent-dialog/consent-dialog';
import { consentDialogInner } from '@/components/consent-dialog-inner/consent-dialog-inner';

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
    this.mainElement = consentDialog();
    this.innerElement = consentDialogInner();

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

    this.mainElement.append(
      consentTabs({
        tabs: [tabButtonAgree, tabButtonDetails, tabButtonAbout, tabButtonClose],
        modifier: 'c-d__h',
      }),
    );
  }

  setTabContent(tabContent: HTMLDivElement): void {
    this.innerElement.innerHTML = '';
    this.innerElement.append(tabContent);
  }

  onAnchorClickProp(): { onAnchorClick: (el: HTMLAnchorElement) => void } {
    return {
      onAnchorClick: (el: HTMLAnchorElement): void => {
        this.handleBodyAnchorsClick(el);
      },
    };
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
        ...this.onAnchorClickProp(),
      }),
    );

    this.tabButtonAgree.active = true;
  }

  setTabContentDetails(): void {
    this.switchButtonPreferences.setChecked(window.CookieConsent.preferences);
    this.switchButtonStatistics.setChecked(window.CookieConsent.statistics);
    this.switchButtonMarketing.setChecked(window.CookieConsent.marketing);

    this.setTabContent(tabContentDetails(this.tabContentDetailsProps()));
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
        ...this.onAnchorClickProp(),
      }),
    );

    this.tabButtonAbout.active = true;
  }

  handleBodyAnchorsClick(el: HTMLAnchorElement): void {
    if (el.href.includes(BODY_ANCHOR_HREF_TAB_AGREE)) {
      this.setTabContentAgree();
    } else if (el.href.includes(BODY_ANCHOR_HREF_TAB_DETAILS)) {
      this.setTabContentDetails();
    } else if (el.href.includes(BODY_ANCHOR_HREF_TAB_ABOUT)) {
      this.setTabContentAbout();
    } else if (el.href.includes(BODY_ANCHOR_HREF_ACTION_AGREE_ALL)) {
      this.updateConsentOnClick(true, true, true, CONSENT_TYPE_FULL);
    } else if (el.href.includes(BODY_ANCHOR_HREF_ACTION_REJECT_ALL)) {
      this.updateConsentOnClick(false, false, false, CONSENT_TYPE_REJECTED);
    }
  }

  tabContentDetailsProps(): TabContentDetailsProps {
    return {
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
          ...this.onAnchorClickProp(),
        },
        preferences: {
          ...i18n.tabDetail.preferences,
          switch: this.switchButtonPreferences,
          ...this.onAnchorClickProp(),
        },
        statistics: {
          ...i18n.tabDetail.statistics,
          switch: this.switchButtonStatistics,
          ...this.onAnchorClickProp(),
        },
        marketing: {
          ...i18n.tabDetail.marketing,
          switch: this.switchButtonMarketing,
          ...this.onAnchorClickProp(),
        },
      },
    };
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
    return consentButton({
      label: i18n.buttonEdit.label,
      onClick: () => {
        this.setTabContentDetails();
      },
    });
  }

  createButtonAllowAll(): HTMLButtonElement {
    return consentButtonPrimary({
      label: i18n.buttonAllowAll.label,
      onClick: () => {
        this.switchButtonPreferences.setChecked(true);
        this.switchButtonStatistics.setChecked(true);
        this.switchButtonMarketing.setChecked(true);

        this.updateConsentOnClick(true, true, true, CONSENT_TYPE_FULL);
      },
    });
  }

  createButtonRejectAll(): HTMLButtonElement {
    return consentButtonPrimary({
      label: i18n.buttonRejectAll.label,
      onClick: () => {
        this.switchButtonPreferences.setChecked(false);
        this.switchButtonStatistics.setChecked(false);
        this.switchButtonMarketing.setChecked(false);

        this.updateConsentOnClick(false, false, false, CONSENT_TYPE_REJECTED);
      },
    });
  }

  createButtonConfirm(): HTMLButtonElement {
    return consentButtonPrimary({
      label: i18n.buttonConfirm.label,
      onClick: () => {
        this.updateConsentOnClick(
          this.switchButtonPreferences.isChecked(),
          this.switchButtonStatistics.isChecked(),
          this.switchButtonMarketing.isChecked(),
          CONSENT_TYPE_ADVANCED,
        );
      },
    });
  }

  appendCode(): void {
    this.shadow.append(
      createVElement<HTMLStyleElement>('style', {}, INLINE_STYLES_MAIN, themeService().themeTextContent),
    );
    this.shadow.append(this.mainElement);

    this.mainElement.append(this.innerElement);
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
