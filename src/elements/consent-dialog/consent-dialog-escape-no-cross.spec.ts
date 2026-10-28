import { beforeAll, describe, expect, it } from 'vitest';
import { dialogCount, openDialog, pressKey, setupEscapeSuite } from './escape.spec-helpers';

// Settings are read when the modules load, so they are set before the dialog is imported.
describe('Escape without the close button (disableCross)', () => {
  const { consentClose } = setupEscapeSuite();

  beforeAll(async () => {
    window.CookieConsentSettings = { disableCross: true } as Window['CookieConsentSettings'];
    await import('@/elements/consent-dialog/consent-dialog');
  });

  it('keeps the dialog open', async () => {
    await openDialog();

    await pressKey('Escape');

    expect(consentClose()).not.toHaveBeenCalled();
    expect(dialogCount()).toBe(1);
  });
});
