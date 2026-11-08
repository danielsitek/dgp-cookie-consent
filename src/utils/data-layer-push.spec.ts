import { afterEach, describe, expect, it, vi } from 'vitest';
import { dataLayerPush, gtagCommand } from '@/utils/data-layer-push';

type HostWindow = Window & { gtag?: (...args: unknown[]) => void };

const typeOf = (value: unknown): string => Object.prototype.toString.call(value);

describe('dataLayer helpers', () => {
  afterEach(() => {
    delete (window as Partial<Window>).dataLayer;
    delete (window as HostWindow).gtag;
  });

  it('queues a consent command as an Arguments object', () => {
    window.dataLayer = [];

    gtagCommand('consent', 'default', { ad_storage: 'denied' });

    const [entry] = window.dataLayer;
    expect(typeOf(entry)).toBe('[object Arguments]');
    expect(Array.isArray(entry)).toBe(false);
    expect(Array.from(entry as IArguments)).toEqual(['consent', 'default', { ad_storage: 'denied' }]);
  });

  it('queues a custom event as a plain object', () => {
    window.dataLayer = [];

    dataLayerPush({ event: 'cookie_consent_default' });

    const [entry] = window.dataLayer;
    expect(typeOf(entry)).toBe('[object Object]');
    expect(entry).toEqual({ event: 'cookie_consent_default' });
  });

  it('appends to the host dataLayer and leaves the host gtag alone', () => {
    const hostEntry = { event: 'host' };
    const hostDataLayer: unknown[] = [hostEntry];
    const hostGtag = vi.fn();
    window.dataLayer = hostDataLayer;
    (window as HostWindow).gtag = hostGtag;

    gtagCommand('consent', 'update', { analytics_storage: 'granted' });
    dataLayerPush({ event: 'cookie_consent_update' });

    expect(window.dataLayer).toBe(hostDataLayer);
    expect(window.dataLayer).toHaveLength(3);
    expect(window.dataLayer[0]).toBe(hostEntry);
    expect((window as HostWindow).gtag).toBe(hostGtag);
    expect(hostGtag).not.toHaveBeenCalled();
  });

  it('creates dataLayer when missing without defining gtag', () => {
    gtagCommand('consent', 'default', {});

    expect(window.dataLayer).toHaveLength(1);
    expect((window as HostWindow).gtag).toBeUndefined();
  });
});
