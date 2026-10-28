import { afterEach, beforeEach, vi } from 'vitest';
import { DIALOG_ELEMENT_NAME, EVENT_CONSENT_CLOSE } from '@/config';

// Long enough for the debounced events and the close animation (300 ms delay + 300 ms fade).
export const SETTLE_MS = 1000;

export const openDialog = async (): Promise<HTMLElement> => {
  const dialog = document.createElement(DIALOG_ELEMENT_NAME);
  document.body.append(dialog);
  await vi.advanceTimersByTimeAsync(SETTLE_MS);

  return dialog;
};

export const pressKey = async (key: string): Promise<void> => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key }));
  await vi.advanceTimersByTimeAsync(SETTLE_MS);
};

export const listenConsentClose = () => {
  const listener = vi.fn();
  window.addEventListener(EVENT_CONSENT_CLOSE, listener);

  return {
    listener,
    stop: () => window.removeEventListener(EVENT_CONSENT_CLOSE, listener),
  };
};

export const dialogCount = (): number => document.querySelectorAll(DIALOG_ELEMENT_NAME).length;

// Fake timers, a consent-close spy and a clean <body> for each test of the calling suite.
export const setupEscapeSuite = (): { consentClose: () => ReturnType<typeof vi.fn> } => {
  let consentClose: ReturnType<typeof listenConsentClose>;

  beforeEach(() => {
    vi.useFakeTimers();
    consentClose = listenConsentClose();
  });

  afterEach(() => {
    consentClose.stop();
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  return { consentClose: () => consentClose.listener };
};
