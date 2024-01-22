import { defaultSettings } from '../settings/default';

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
  disableHeader: boolean;
}

export const settingsService = (): CookieConsentSettings => {
  const windowSettings = window?.CookieConsentSettings;

  return {
    // Settings for tab agree.
    tabAgree: {
      ...defaultSettings.tabAgree,
      ...windowSettings?.tabAgree,
    },

    // Settings for tab details.
    tabDetails: {
      ...defaultSettings.tabDetails,
      ...windowSettings?.tabDetails,
    },

    // Settings for tab about.
    tabAbout: {
      ...defaultSettings.tabAbout,
      ...windowSettings?.tabAbout,
    },

    enableDarkMode: windowSettings?.enableDarkMode !== undefined ? windowSettings.enableDarkMode : defaultSettings.enableDarkMode,

    disableBadge: windowSettings?.disableBadge !== undefined ? windowSettings.disableBadge : defaultSettings.disableBadge,

    disableHeader: windowSettings?.disableHeader !== undefined ? windowSettings.disableHeader : defaultSettings.disableHeader,
  };
};
