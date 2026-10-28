import { describe, expect, it, vi } from 'vitest';
import '@/elements/consent-dialog/consent-dialog';
import type { ConsentDialog } from '@/elements/consent-dialog/consent-dialog';
import { openDialog, SETTLE_MS, setupDialogSuite } from './dialog.spec-helpers';

describe('closing state', () => {
  setupDialogSuite();

  it('is not closing while open', async () => {
    const dialog = (await openDialog()) as ConsentDialog;

    expect(dialog.isClosing).toBe(false);
  });

  it('is closing until whenClosed() resolves with the dialog removed', async () => {
    const dialog = (await openDialog()) as ConsentDialog;
    const closed = vi.fn();

    dialog.closeModal();
    dialog.whenClosed().then(closed);
    await vi.advanceTimersByTimeAsync(100);

    expect(dialog.isClosing).toBe(true);
    expect(dialog.isConnected).toBe(true);
    expect(closed).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(dialog.isConnected).toBe(false);
    expect(closed).toHaveBeenCalledTimes(1);
  });

  it('closes once when closeModal() is called repeatedly', async () => {
    const dialog = (await openDialog()) as ConsentDialog;
    const remove = vi.spyOn(dialog, 'remove');

    dialog.closeModal();
    dialog.closeModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(remove).toHaveBeenCalledTimes(1);
  });
});
