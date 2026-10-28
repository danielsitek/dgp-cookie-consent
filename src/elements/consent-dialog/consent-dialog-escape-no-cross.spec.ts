import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { dialogCount, listenConsentClose, openDialog, pressKey } from './escape.spec-helpers';

// Settings are read when the modules load, so they are set before the dialog is imported.
describe('Escape without the close button (disableCross)', () => {
  let consentClose: ReturnType<typeof listenConsentClose>;

  beforeAll(async () => {
    window.CookieConsentSettings = { disableCross: true } as Window['CookieConsentSettings'];
    await import('@/elements/consent-dialog/consent-dialog');
  });

  beforeEach(() => {
    vi.useFakeTimers();
    consentClose = listenConsentClose();
  });

  afterEach(() => {
    consentClose.stop();
    document.body.innerHTML = '';
    vi.useRealTimers();
  });

  it('keeps the dialog open', async () => {
    await openDialog();

    await pressKey('Escape');

    expect(consentClose.listener).not.toHaveBeenCalled();
    expect(dialogCount()).toBe(1);
  });
});
