import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BADGE_ELEMENT_NAME, DIALOG_ELEMENT_NAME } from '@/config';
import { initConsentBadge, initConsentModal } from '@/init/init';

const removeBody = (): HTMLElement => {
  const body = document.body;
  body.remove();

  return body;
};

describe('init before <body> exists', () => {
  let body: HTMLElement;

  beforeEach(() => {
    vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    body = removeBody();
    expect(document.body).toBeNull();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (!document.body) {
      document.documentElement.append(body);
    }
    document.querySelectorAll(`${DIALOG_ELEMENT_NAME}, ${BADGE_ELEMENT_NAME}`).forEach((el) => el.remove());
  });

  it('inserts the dialog once <body> is ready', () => {
    expect(() => initConsentModal()).not.toThrow();

    document.documentElement.append(body);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(document.querySelectorAll(DIALOG_ELEMENT_NAME)).toHaveLength(1);
  });

  it('inserts a single dialog when opened twice before <body> is ready', () => {
    initConsentModal();
    initConsentModal();

    document.documentElement.append(body);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(document.querySelectorAll(DIALOG_ELEMENT_NAME)).toHaveLength(1);
  });

  it('inserts the badge once <body> is ready', () => {
    expect(() => initConsentBadge()).not.toThrow();

    document.documentElement.append(body);
    document.dispatchEvent(new Event('DOMContentLoaded'));

    expect(document.querySelectorAll(BADGE_ELEMENT_NAME)).toHaveLength(1);
  });
});

describe('init with <body>', () => {
  afterEach(() => {
    document.querySelectorAll(`${DIALOG_ELEMENT_NAME}, ${BADGE_ELEMENT_NAME}`).forEach((el) => el.remove());
  });

  it('inserts the dialog immediately', () => {
    initConsentModal();

    expect(document.body.querySelectorAll(DIALOG_ELEMENT_NAME)).toHaveLength(1);
  });
});
