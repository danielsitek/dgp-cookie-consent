import { afterEach, describe, expect, it } from 'vitest';
import cs from '@/translations/cs';
import { translationService } from '@/services/translation-service';

const withTranslations = (translations: unknown) => {
  (window as unknown as { CookieConsentTranslations: unknown }).CookieConsentTranslations = translations;
  return translationService();
};

describe('translationService', () => {
  afterEach(() => {
    delete (window as unknown as { CookieConsentTranslations?: unknown }).CookieConsentTranslations;
  });

  it.each([
    ['missing', undefined],
    ['empty', {}],
    ['null', null],
  ])('returns defaults when custom translations are %s', (_, translations) => {
    expect(withTranslations(translations)).toEqual(cs);
  });

  it('keeps defaults for keys missing in a partial nested section', () => {
    const result = withTranslations({
      tabAgree: { title: 'Hello' },
      tabDetail: { necessary: { perex: 'Necessary perex' } },
    });

    expect(result.tabAgree).toEqual({ title: 'Hello', body: cs.tabAgree.body });
    expect(result.tabDetail.necessary).toEqual({ title: cs.tabDetail.necessary.title, perex: 'Necessary perex' });
    expect(result.tabDetail.title).toBe(cs.tabDetail.title);
    expect(result.tabDetail.marketing).toEqual(cs.tabDetail.marketing);
  });

  it('falls back to defaults for undefined, null and non-string values', () => {
    const result = withTranslations({
      tabAgree: { title: undefined, body: null },
      tabDetail: { necessary: { perex: 5 } },
      badge: null,
      dialog: 'not a section',
      lastUpdated: undefined,
    });

    expect(result).toEqual(cs);
  });

  it('uses empty strings for texts', () => {
    const result = withTranslations({
      tabDetail: { title: '', marketing: { title: '' } },
      buttonEdit: { label: '' },
      lastUpdated: '',
    });

    expect(result.tabDetail.title).toBe('');
    expect(result.tabDetail.marketing).toEqual({ title: '', perex: cs.tabDetail.marketing.perex });
    expect(result.buttonEdit.label).toBe('');
    expect(result.lastUpdated).toBe('');
  });

  it.each([
    ['empty', ''],
    ['null', null],
    ['a number', 1],
  ])('falls back to the default locale when it is %s', (_, locale) => {
    expect(withTranslations({ locale }).locale).toBe(cs.locale);
  });

  it('uses a custom locale', () => {
    expect(withTranslations({ locale: 'en-US' }).locale).toBe('en-US');
  });
});
