import { describe, expect, it, vi } from 'vitest';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME } from '@/config';
import { initConsentModal } from '@/init/init';
import { closeDialog, dialogCount, SETTLE_MS, setupDialogSuite, startClosing } from '@/elements/consent-dialog/dialog.spec-helpers';

const openModal = async (): Promise<HTMLElement> => {
  initConsentModal();
  await vi.advanceTimersByTimeAsync(SETTLE_MS);

  return document.querySelector(DIALOG_ELEMENT_NAME) as HTMLElement;
};

const badgeCount = (): number => document.querySelectorAll(BADGE_ELEMENT_NAME).length;

describe('CookieConsentModalOpen during the close animation', () => {
  setupDialogSuite();

  it('reopens the dialog once the closing one is removed', async () => {
    const closing = await openModal();
    await startClosing(closing);

    initConsentModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(closing.isConnected).toBe(false);
    expect(dialogCount()).toBe(1);
  });

  it('reopens a single dialog when called repeatedly', async () => {
    await startClosing(await openModal());

    initConsentModal();
    initConsentModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(dialogCount()).toBe(1);
  });

  it('does not show the badge while the dialog is reopened', async () => {
    await startClosing(await openModal());

    initConsentModal();

    // Sampled during the whole reopen: a badge added and hidden again would pass a final check.
    for (let elapsed = 0; elapsed < SETTLE_MS; elapsed += 50) {
      await vi.advanceTimersByTimeAsync(50);
      expect(badgeCount()).toBe(0);
    }
  });

  it('shows the badge after the reopened dialog is closed', async () => {
    await startClosing(await openModal());
    initConsentModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    await closeDialog(document.querySelector(DIALOG_ELEMENT_NAME) as HTMLElement);

    expect(dialogCount()).toBe(0);
    expect(badgeCount()).toBe(1);
  });
});
