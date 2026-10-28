import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// gtm.ts runs on import and registers document listeners that cannot be removed,
// so the loader is imported once for the whole file.
describe('GTM loader before <body> exists', () => {
  let body: HTMLElement;
  let loader: Promise<unknown>;

  beforeAll(() => {
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    window.dataLayer = [];
    body = document.body;
    body.remove();
    expect(document.body).toBeNull();

    loader = import('@/gtm');
  });

  afterAll(() => {
    vi.restoreAllMocks();
    if (!document.body) {
      document.documentElement.append(body);
    }
    document.getElementById('cookie-consent')?.remove();
    delete (window as Partial<Window>).CookieConsentModalOpen;
  });

  it('loads the panel script into <head> without throwing', async () => {
    await expect(loader).resolves.toBeDefined();

    const script = document.getElementById('cookie-consent');
    expect(script?.tagName).toBe('SCRIPT');
    expect(script?.parentNode).toBe(document.head);
  });

  it('opens the panel from a .js-consent-open click inside a later <body>', async () => {
    await loader;
    document.documentElement.append(body);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const open = vi.fn();
    window.CookieConsentModalOpen = open;

    const button = document.createElement('button');
    button.className = 'js-consent-open';
    body.append(button);
    button.click();
    button.remove();

    expect(open).toHaveBeenCalledTimes(1);
  });
});
