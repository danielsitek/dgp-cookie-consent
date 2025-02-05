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
import type { ConsentType } from '@/utils/consent';
import { createVElement } from '@/utils/elements';
import { dispatchEventConsentHide, dispatchEventConsentShow } from '@/utils/events';
import { consentButton, consentButtonPrimary } from '@/components/consent-button/consent-button';
import { tabContentDefault } from '@/components/tab-content-default/tab-content-default';
import { type TabContentDetailsProps, tabContentDetails } from '@/components/tab-content-details/tab-content-details';
import { switchMarketing, switchNecessary, switchPreferences, switchStatistics } from '@/components/switch-button/switch-buttons';
import { tabButtonAgree, tabButtonDetails, tabButtonAbout, tabButtonAgreeEl, tabButtonDetailsEl, tabButtonAboutEl } from '@/components/consent-tab/consent-tab-instances';
import { consentDialogInnerInstance } from '@/components/consent-dialog-inner/consent-dialog-inner-instances';
import { consentDialogInstance } from '@/components/consent-dialog/consent-dialog-instances';

const i18n = translationService();
const settings = settingsService();

export class ConsentDialog extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
  }

  initHeaderTabs(): void {
    if (settings.disableHeader) {
      return;
    }

    tabButtonAgreeEl.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAgree();
    });

    tabButtonDetailsEl.addEventListener(EVENT_CLICK, () => {
      this.setTabContentDetails();
    });

    tabButtonAboutEl.addEventListener(EVENT_CLICK, () => {
      this.setTabContentAbout();
    });
  }

  setTabContent(tabContent: HTMLDivElement): void {
    consentDialogInnerInstance.innerHTML = '';
    consentDialogInnerInstance.append(tabContent);
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
        buttons: [settings.tabAgree.showButtonRejectAll ? this.createButtonRejectAll() : false, this.createButtonEdit(), this.createButtonAllowAll()],
        ...this.onAnchorClickProp(),
      }),
    );

    tabButtonAgree.active = true;
  }

  setTabContentDetails(): void {
    switchPreferences.setChecked(window.CookieConsent.preferences);
    switchStatistics.setChecked(window.CookieConsent.statistics);
    switchMarketing.setChecked(window.CookieConsent.marketing);

    this.setTabContent(tabContentDetails(this.tabContentDetailsProps()));
    tabButtonDetails.active = true;
  }

  setTabContentAbout(): void {
    this.setTabContent(
      tabContentDefault({
        body: i18n.tabAbout.body,
        buttons: [settings.tabAbout.showButtonRejectAll ? this.createButtonRejectAll() : false, this.createButtonEdit(), this.createButtonAllowAll()],
        ...this.onAnchorClickProp(),
      }),
    );

    tabButtonAbout.active = true;
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
      buttons: [this.createButtonRejectAll(), this.createButtonConfirm(), settings.tabDetails.showButtonAllowAll ? this.createButtonAllowAll() : false],
      lastUpdated: i18n.lastUpdated,
      sections: {
        necessary: {
          ...i18n.tabDetail.necessary,
          switch: switchNecessary,
          ...this.onAnchorClickProp(),
        },
        preferences: {
          ...i18n.tabDetail.preferences,
          switch: switchPreferences,
          ...this.onAnchorClickProp(),
        },
        statistics: {
          ...i18n.tabDetail.statistics,
          switch: switchStatistics,
          ...this.onAnchorClickProp(),
        },
        marketing: {
          ...i18n.tabDetail.marketing,
          switch: switchMarketing,
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

  updateConsentOnClickSwitch(preferences: boolean, statistics: boolean, marketing: boolean, type: ConsentType): void {
    switchPreferences.setChecked(preferences);
    switchStatistics.setChecked(statistics);
    switchMarketing.setChecked(marketing);

    this.updateConsentOnClick(preferences, statistics, marketing, type);
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
        this.updateConsentOnClickSwitch(true, true, true, CONSENT_TYPE_FULL);
      },
    });
  }

  createButtonRejectAll(): HTMLButtonElement {
    return consentButtonPrimary({
      label: i18n.buttonRejectAll.label,
      onClick: () => {
        this.updateConsentOnClickSwitch(false, false, false, CONSENT_TYPE_REJECTED);
      },
    });
  }

  createButtonConfirm(): HTMLButtonElement {
    return consentButtonPrimary({
      label: i18n.buttonConfirm.label,
      onClick: () => {
        this.updateConsentOnClick(switchPreferences.isChecked(), switchStatistics.isChecked(), switchMarketing.isChecked(), CONSENT_TYPE_ADVANCED);
      },
    });
  }

  appendCode(): void {
    if (this.shadowRoot) {
      this.shadowRoot.append(createVElement<HTMLStyleElement>('style', {}, INLINE_STYLES_MAIN, themeService().themeTextContent));
      this.shadowRoot.append(consentDialogInstance);
    }
  }

  closeModal(): void {
    setTimeout(async () => {
      await fadeOut(consentDialogInstance, DIALOG_FADE_OUT_DURATION);
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

    await fadeIn(consentDialogInstance, DIALOG_FADE_IN_DURATION);
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
