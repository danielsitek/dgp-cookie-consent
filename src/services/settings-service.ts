import { defaultSettings } from '../settings/default';

export interface CookieConsentSettingsTab {
  buttonRejectAll: boolean
}

export interface CookieConsentSettings {
  tabAgree: CookieConsentSettingsTab;
  tabAbout: CookieConsentSettingsTab;
}

export const settingsService = (): CookieConsentSettings => {
  const windowSettings = window?.CookieConsentSettings;

  return {
    // Settings for tab agree.
    tabAgree: {
      ...defaultSettings.tabAgree,
      ...windowSettings.tabAgree,
    },

    // Settings for tab about.
    tabAbout: {
      ...defaultSettings.tabAbout,
      ...windowSettings.tabAbout,
    },
  };
};
