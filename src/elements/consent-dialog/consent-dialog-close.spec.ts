import { describe, expect, it, vi } from 'vitest';
import '@/elements/consent-dialog/consent-dialog';
import type { ConsentDialog } from '@/elements/consent-dialog/consent-dialog';
import { consentDialogInstance } from '@/components/consent-dialog/consent-dialog-instances';
import { openDialog, SETTLE_MS, setupDialogSuite, startClosing } from './dialog.spec-helpers';

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

  it('can be closed again after the same element is re-attached', async () => {
    const dialog = (await openDialog()) as ConsentDialog;
    dialog.closeModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    document.body.append(dialog);
    await vi.advanceTimersByTimeAsync(SETTLE_MS);
    expect(dialog.isClosing).toBe(false);

    dialog.closeModal();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);

    expect(dialog.isConnected).toBe(false);
  });

  it('does not hide a newly opened dialog when the closing one was removed by the page', async () => {
    const closing = await openDialog();
    await startClosing(closing);

    closing.remove();
    await openDialog();

    expect(consentDialogInstance.style.display).not.toBe('none');
  });
});
