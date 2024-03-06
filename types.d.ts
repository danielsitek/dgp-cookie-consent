export interface CookieConsentTranslationsDetailSection {
  title: string;
  perex: string;
}

export interface CookieConsentTranslationsButton {
  label: string;
}

export interface CookieConsentTranslationsTab {
  title: string;
}

export interface CookieConsentTranslationsTabAgree extends CookieConsentTranslationsTab {
  body: string;
}

export interface CookieConsentTranslationsTabAbout extends CookieConsentTranslationsTab {
  body: string;
}

export interface CookieConsentTranslationsTabDetail extends CookieConsentTranslationsTab {
  necessary: CookieConsentTranslationsDetailSection;
  preferences: CookieConsentTranslationsDetailSection;
  statistics: CookieConsentTranslationsDetailSection;
  marketing: CookieConsentTranslationsDetailSection;
}

export interface CookieConsentTranslations {
  locale: 'cs-CZ' | string;
  tabAgree: CookieConsentTranslationsTabAgree;
  tabAbout: CookieConsentTranslationsTabAbout;
  tabDetail: CookieConsentTranslationsTabDetail;
  buttonEdit: CookieConsentTranslationsButton;
  buttonAllowAll: CookieConsentTranslationsButton;
  buttonRejectAll: CookieConsentTranslationsButton;
  buttonConfirm: CookieConsentTranslationsButton;
  buttonClose: CookieConsentTranslationsButton;
  badge: CookieConsentTranslationsButton;
  lastUpdated: string;
}

export interface ConsentRules {
  necessary: boolean;
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
}

export interface ConsentOptions extends ConsentRules {
  updated: string;
  id: string;
  type: ConsentType;
}

export type ConsentOptionsKeys = keyof ConsentOptions;

export type CookieConsentThemeKeys =
  | 'base-color'
  | 'base-font-size'
  | 'base-line'
  | 'base-font-family'
  | 'base-shadow'
  | 'border-radius'
  | 'button-border-radius'
  | 'color-grey'
  | 'color-primary'
  | 'color-text-light'
  | 'color-text'
  | 'color-white'
  | 'button-default__bg-color'
  | 'button-default__color'
  | 'button-default__text-transform'
  | 'button-default__border'
  | 'button-default__box-shadow'
  | 'button-default--hover__bg-color'
  | 'button-default--hover__color'
  | 'button-default--hover__border'
  | 'button-default--hover__box-shadow'
  | 'button-primary__bg-color'
  | 'button-primary__color'
  | 'button-primary__text-transform'
  | 'button-primary__border'
  | 'button-primary__box-shadow'
  | 'button-primary--hover__bg-color'
  | 'button-primary--hover__color'
  | 'button-primary--hover__border'
  | 'button-primary--hover__box-shadow'
  | 'badge__bg-color'
  | 'badge__color'
  | 'badge__border'
  | 'badge__border-radius'
  | 'badge__box-shadow'
  | 'badge__position'
  | 'base-link__color'
  | 'base-link__text-decoration'
  | 'base-link--hover__color'
  | 'base-link--hover__text-decoration';

export type CookieConsentTheme = Partial<Record<CookieConsentThemeKeys, string>>;

export interface CookieConsentSettingsTab {
  showButtonRejectAll?: boolean;
  showButtonAllowAll?: boolean;
}

export interface CookieConsentSettings {
  tabAgree: CookieConsentSettingsTab;
  tabAbout: CookieConsentSettingsTab;
  tabDetails: CookieConsentSettingsTab;
  enableDarkMode: boolean;
  disableBadge: boolean;
  disableCross: boolean;
  disableHeader: boolean;
}

export type ConsentType = 'full' | 'advanced' | 'rejected' | '';

export declare class ConsentService {
  constructor();

  get necessary(): boolean;
  set necessary(value: boolean);

  get preferences(): boolean;
  set preferences(value: boolean);

  get statistics(): boolean;
  set statistics(value: boolean);

  get marketing(): boolean;
  set marketing(value: boolean);

  get updated(): string;

  get id(): string;

  get type(): ConsentType;
  set type(value: ConsentType);
}

export declare class ConsentBadge extends HTMLElement {
  constructor();
  hideBadge(): void;
}

export declare class ConsentDialog extends HTMLElement {
  constructor();
  closeModal(): void;
}

declare global {
  interface Window {
    CookieConsentTranslations: Partial<CookieConsentTranslations>;
    CookieConsentTheme: CookieConsentTheme;
    CookieConsentThemeDark: CookieConsentTheme;
    CookieConsentSettings: Partial<CookieConsentSettings>;
    CookieConsent: ConsentService;
    CookieConsentModalOpen: () => void;
  }

  interface HTMLElementTagNameMap {
    'consent-dialog': ConsentDialog;
    'consent-badge': ConsentBadge;
  }
}
