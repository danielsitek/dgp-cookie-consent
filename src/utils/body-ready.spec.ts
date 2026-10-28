import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { onBodyReady } from '@/utils/body-ready';

describe('onBodyReady', () => {
  let body: HTMLElement;

  beforeEach(() => {
    body = document.body;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (!document.body) {
      document.documentElement.append(body);
    }
  });

  it('runs immediately when <body> exists', () => {
    const callback = vi.fn();

    onBodyReady(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('waits for DOMContentLoaded while the document is loading without <body>', () => {
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    body.remove();
    const callback = vi.fn();

    onBodyReady(callback);
    expect(callback).not.toHaveBeenCalled();

    document.documentElement.append(body);
    document.dispatchEvent(new Event('DOMContentLoaded'));
    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('runs immediately when the document is parsed but has no <body>', () => {
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
    body.remove();
    const callback = vi.fn();

    onBodyReady(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
