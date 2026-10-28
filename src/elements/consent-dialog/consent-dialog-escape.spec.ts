import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@/elements/consent-dialog/consent-dialog';
import { dialogCount, listenConsentClose, openDialog, pressKey } from './escape.spec-helpers';

describe('Escape with the close button enabled', () => {
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

  it('does nothing while the dialog is not open', async () => {
    await pressKey('Escape');

    expect(consentClose.listener).not.toHaveBeenCalled();
  });

  it('closes the open dialog and dispatches consent-close once', async () => {
    await openDialog();

    await pressKey('Escape');

    expect(consentClose.listener).toHaveBeenCalledTimes(1);
    expect(dialogCount()).toBe(0);
  });

  it('ignores other keys', async () => {
    await openDialog();

    await pressKey('Enter');

    expect(consentClose.listener).not.toHaveBeenCalled();
    expect(dialogCount()).toBe(1);
  });

  it('closes the dialog again after it is reopened', async () => {
    await openDialog();
    await pressKey('Escape');
    await openDialog();

    await pressKey('Escape');

    expect(consentClose.listener).toHaveBeenCalledTimes(2);
    expect(dialogCount()).toBe(0);
  });

  it('stops listening once the dialog is closed', async () => {
    await openDialog();
    await pressKey('Escape');

    await pressKey('Escape');

    expect(consentClose.listener).toHaveBeenCalledTimes(1);
  });
});
