import cs from '../translations/cs';

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
  lastUpdated: string;
}

const defaultTranslations = cs;

export const translationService = (): CookieConsentTranslations => {
  const windowTranslations = window?.CookieConsentTranslations;

  return {
    locale: windowTranslations?.locale || defaultTranslations.locale,
    tabAgree: {
      ...defaultTranslations.tabAgree,
      ...windowTranslations?.tabAgree,
    },
    tabAbout: {
      ...defaultTranslations.tabAbout,
      ...windowTranslations?.tabAbout,
    },
    tabDetail: {
      title: windowTranslations?.tabDetail?.title || defaultTranslations.tabDetail.title,
      necessary: {
        ...defaultTranslations.tabDetail.necessary,
        ...windowTranslations?.tabDetail?.necessary,
      },
      preferences: {
        ...defaultTranslations.tabDetail.preferences,
        ...windowTranslations?.tabDetail?.preferences,
      },
      statistics: {
        ...defaultTranslations.tabDetail.statistics,
        ...windowTranslations?.tabDetail?.statistics,
      },
      marketing: {
        ...defaultTranslations.tabDetail.marketing,
        ...windowTranslations?.tabDetail?.marketing,
      },
    },
    buttonEdit: {
      ...defaultTranslations.buttonEdit,
      ...windowTranslations?.buttonEdit,
    },
    buttonAllowAll: {
      ...defaultTranslations.buttonAllowAll,
      ...windowTranslations?.buttonAllowAll,
    },
    buttonRejectAll: {
      ...defaultTranslations.buttonRejectAll,
      ...windowTranslations?.buttonRejectAll,
    },
    buttonConfirm: {
      ...defaultTranslations.buttonConfirm,
      ...windowTranslations?.buttonConfirm,
    },
    lastUpdated: windowTranslations?.lastUpdated || defaultTranslations.lastUpdated,
  };
};
