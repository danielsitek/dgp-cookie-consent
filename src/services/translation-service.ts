import cs from '@/translations/cs';

export interface CookieConsentTranslationsDetailSection {
  title: string;
  perex: string;
}

export interface CookieConsentTranslationsButton {
  label: string;
}

export interface CookieConsentTranslationsDialog {
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
  dialog: CookieConsentTranslationsDialog;
  lastUpdated: string;
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? T[K] : DeepPartial<T[K]>;
};

export type CookieConsentTranslationsPartial = DeepPartial<CookieConsentTranslations>;

const defaultTranslations = cs;

// Use a custom text only when it is a string (empty included); undefined, null and other types fall back.
const text = (value: unknown, fallback: string): string => (typeof value === 'string' ? value : fallback);

export const translationService = (): CookieConsentTranslations => {
  const custom = window?.CookieConsentTranslations;
  const defaults = defaultTranslations;
  const locale = custom?.locale;

  return {
    // An empty locale would make Intl.DateTimeFormat throw.
    locale: typeof locale === 'string' && locale.length ? locale : defaults.locale,
    tabAgree: {
      title: text(custom?.tabAgree?.title, defaults.tabAgree.title),
      body: text(custom?.tabAgree?.body, defaults.tabAgree.body),
    },
    tabAbout: {
      title: text(custom?.tabAbout?.title, defaults.tabAbout.title),
      body: text(custom?.tabAbout?.body, defaults.tabAbout.body),
    },
    tabDetail: {
      title: text(custom?.tabDetail?.title, defaults.tabDetail.title),
      necessary: {
        title: text(custom?.tabDetail?.necessary?.title, defaults.tabDetail.necessary.title),
        perex: text(custom?.tabDetail?.necessary?.perex, defaults.tabDetail.necessary.perex),
      },
      preferences: {
        title: text(custom?.tabDetail?.preferences?.title, defaults.tabDetail.preferences.title),
        perex: text(custom?.tabDetail?.preferences?.perex, defaults.tabDetail.preferences.perex),
      },
      statistics: {
        title: text(custom?.tabDetail?.statistics?.title, defaults.tabDetail.statistics.title),
        perex: text(custom?.tabDetail?.statistics?.perex, defaults.tabDetail.statistics.perex),
      },
      marketing: {
        title: text(custom?.tabDetail?.marketing?.title, defaults.tabDetail.marketing.title),
        perex: text(custom?.tabDetail?.marketing?.perex, defaults.tabDetail.marketing.perex),
      },
    },
    buttonEdit: {
      label: text(custom?.buttonEdit?.label, defaults.buttonEdit.label),
    },
    buttonAllowAll: {
      label: text(custom?.buttonAllowAll?.label, defaults.buttonAllowAll.label),
    },
    buttonRejectAll: {
      label: text(custom?.buttonRejectAll?.label, defaults.buttonRejectAll.label),
    },
    buttonConfirm: {
      label: text(custom?.buttonConfirm?.label, defaults.buttonConfirm.label),
    },
    buttonClose: {
      label: text(custom?.buttonClose?.label, defaults.buttonClose.label),
    },
    badge: {
      label: text(custom?.badge?.label, defaults.badge.label),
    },
    dialog: {
      label: text(custom?.dialog?.label, defaults.dialog.label),
    },
    lastUpdated: text(custom?.lastUpdated, defaults.lastUpdated),
  };
};
