import { afterEach, describe, expect, it, vi } from 'vitest';
import { randomClientId } from '@/utils/random-client-id';

describe('randomClientId', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('keeps the "<digits>.<seconds timestamp>" format', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(1642399486123));

    expect(randomClientId(10)).toMatch(/^\d{10}\.1642399486$/);
  });

  it('draws the digits from crypto.getRandomValues', () => {
    const mathRandom = vi.spyOn(Math, 'random');
    const getRandomValues = vi.spyOn(crypto, 'getRandomValues');

    randomClientId(10);

    expect(getRandomValues).toHaveBeenCalled();
    expect(mathRandom).not.toHaveBeenCalled();
  });

  it('skips bytes 250–255 so that digits stay uniform', () => {
    vi.spyOn(crypto, 'getRandomValues')
      .mockImplementationOnce((array) => (array as Uint8Array).fill(255))
      .mockImplementationOnce((array) => (array as Uint8Array).fill(123));

    expect(randomClientId(4).split('.')[0]).toBe('3333');
  });

  it('returns different IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => randomClientId(10)));

    expect(ids.size).toBe(100);
  });
});
