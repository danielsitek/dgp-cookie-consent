import { describe, expect, it, vi } from 'vitest';
import { ConsentDialog } from '@/elements/consent-dialog/consent-dialog';
import { tabButtonAboutEl, tabButtonAgreeEl, tabButtonDetailsEl } from '@/components/consent-tab/consent-tab-instances';
import { closeDialog, openDialog, SETTLE_MS, setupDialogSuite } from './dialog.spec-helpers';

describe('header tabs', () => {
  setupDialogSuite();

  it.each([
    ['agree', tabButtonAgreeEl, 'setTabContentAgree'],
    ['details', tabButtonDetailsEl, 'setTabContentDetails'],
    ['about', tabButtonAboutEl, 'setTabContentAbout'],
  ] as const)('renders the %s tab once per click after the dialog was reopened', async (_, tab, method) => {
    await closeDialog(await openDialog());
    await closeDialog(await openDialog());
    await openDialog();
    const render = vi.spyOn(ConsentDialog.prototype, method);

    tab.click();

    expect(render).toHaveBeenCalledTimes(1);
  });

  it('ignores tab clicks once the dialog starts closing', async () => {
    const dialog = (await openDialog()) as ConsentDialog;
    const render = vi.spyOn(ConsentDialog.prototype, 'setTabContentDetails');

    dialog.closeModal();
    tabButtonDetailsEl.click();

    expect(render).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(SETTLE_MS);
  });

  it('does not render tab content while the dialog is closed', async () => {
    await closeDialog(await openDialog());
    const render = vi.spyOn(ConsentDialog.prototype, 'setTabContentDetails');

    tabButtonDetailsEl.click();

    expect(render).not.toHaveBeenCalled();
  });

  it('removes the dialog that is closing, not the first one in the document', async () => {
    const first = await openDialog();
    const second = await openDialog();

    await closeDialog(second);

    expect(second.isConnected).toBe(false);
    expect(first.isConnected).toBe(true);
  });
});
