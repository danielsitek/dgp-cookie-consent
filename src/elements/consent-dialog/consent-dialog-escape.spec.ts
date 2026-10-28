import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@/elements/consent-dialog/consent-dialog';
import { dialogCount, listenConsentClose, openDialog, pressKey, SETTLE_MS } from './escape.spec-helpers';
import type { ConsentDialog } from '@/elements/consent-dialog/consent-dialog';

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

  it('ignores Escape already handled by the page', async () => {
    await openDialog();

    const event = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    event.preventDefault();
    window.dispatchEvent(event);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(consentClose.listener).not.toHaveBeenCalled();
    expect(dialogCount()).toBe(1);
  });

  it('ignores Escape that cancels IME composition', async () => {
    await openDialog();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', isComposing: true }));
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

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

  it('dispatches consent-close once when Escape is pressed again during the close animation', async () => {
    await openDialog();

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await vi.advanceTimersByTimeAsync(100);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(consentClose.listener).toHaveBeenCalledTimes(1);
    expect(dialogCount()).toBe(0);
  });

  it('ignores Escape after a consent choice started closing the dialog', async () => {
    const dialog = (await openDialog()) as ConsentDialog;

    dialog.closeModal();
    await pressKey('Escape');

    expect(consentClose.listener).not.toHaveBeenCalled();
    expect(dialogCount()).toBe(0);
  });

  it('stops listening once the dialog is closed', async () => {
    await openDialog();
    await pressKey('Escape');

    await pressKey('Escape');

    expect(consentClose.listener).toHaveBeenCalledTimes(1);
  });
});
