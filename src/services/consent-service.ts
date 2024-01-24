import { ConsentOptions, ConsentOptionsKeys, ConsentType, getConsent, updateConsent } from '@/utils/consent';
import { dispatchEventConsentReady, dispatchEventConsentUpdated } from '@/utils/events';

const cache: ConsentOptions = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
  id: '',
  type: '',
};

export class ConsentService {
  constructor() {
    this.getConsentData();
    dispatchEventConsentReady();
  }

  get necessary(): boolean {
    this.getConsentData();
    return cache.necessary;
  }

  set necessary(value: boolean) {
    cache.necessary = Boolean(value);
    this.updateConsentData();
  }

  get preferences(): boolean {
    this.getConsentData();
    return cache.preferences;
  }

  set preferences(value: boolean) {
    cache.preferences = Boolean(value);
    this.updateConsentData();
  }

  get statistics(): boolean {
    this.getConsentData();
    return cache.statistics;
  }

  set statistics(value: boolean) {
    cache.statistics = Boolean(value);
    this.updateConsentData();
  }

  get marketing(): boolean {
    this.getConsentData();
    return cache.marketing;
  }

  set marketing(value: boolean) {
    cache.marketing = Boolean(value);
    this.updateConsentData();
  }

  get updated(): string {
    this.getConsentData();
    return cache.updated;
  }

  get id(): string {
    this.getConsentData();
    return cache.id;
  }

  get type(): ConsentType {
    this.getConsentData();
    return cache.type;
  }

  set type(value: ConsentType) {
    cache.type = value;
    this.updateConsentData();
  }

  private getConsentData() {
    const consentData = getConsent();

    const consentKeys: ConsentOptionsKeys[] = Object.keys(consentData) as ConsentOptionsKeys[];

    consentKeys.forEach((key) => {
      cache[key] = consentData[key] as never;
    });
  }

  private updateConsentData() {
    updateConsent(cache, () => {
      dispatchEventConsentUpdated();
    });
  }
}
