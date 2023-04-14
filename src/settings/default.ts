import { CookieConsentSettings } from '../services/settings-service';

export const defaultSettings: CookieConsentSettings = {
  // Settings for tab agree.
  tabAgree: {
    showButtonRejectAll: false,
  },

  // Settings for tab about.
  tabAbout: {
    showButtonRejectAll: false,
  },

  // Enable / Disable automatic theme switch to dark mode.
  enableDarkMode: false,
};
