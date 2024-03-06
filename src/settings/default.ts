import type { CookieConsentSettings } from '@/services/settings-service';

export const defaultSettings: CookieConsentSettings = {
  // Settings for tab agree.
  tabAgree: {
    showButtonRejectAll: true,
  },

  // Settings for tab about.
  tabDetails: {
    showButtonAllowAll: false,
  },

  // Settings for tab about.
  tabAbout: {
    showButtonRejectAll: true,
  },

  // Enable / Disable automatic theme switch to dark mode.
  enableDarkMode: false,

  // Disable / Enable consent badge.
  disableBadge: false,

  // Disable / Enable cross button in header.
  disableCross: false,

  // Disable / Enable consent header.
  disableHeader: false,
};
