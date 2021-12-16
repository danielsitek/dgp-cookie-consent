import { ConsentOptions, getConsent, updateConsent } from '../utils/consent';
import { dispatchEventContentUpdated } from '../utils/events';

const cache: ConsentOptions = {
  necessary: true,
  preferences: false,
  statistics: false,
  marketing: false,
  updated: '',
}

class ConsentOptionsService {
  private _necessary = true;
  private _preferences = false;
  private _statistics = false;
  private _marketing = false;
}

export class ConsentService {
  constructor() {
    this.getConsentData();
  }

  get necessary() {
    this.getConsentData();
    return cache.necessary;
  }

  set necessary(value: boolean) {
    cache.necessary = Boolean(value);
    this.updateConsentData();
  }

  get preferences() {
    this.getConsentData();
    return cache.preferences;
  }

  set preferences(value: boolean) {
    cache.preferences = Boolean(value);
    this.updateConsentData();
  }

  get statistics() {
    this.getConsentData();
    return cache.statistics;
  }

  set statistics(value: boolean) {
    cache.statistics = Boolean(value);
    this.updateConsentData();
  }

  get marketing() {
    this.getConsentData();
    return cache.marketing;
  }

  set marketing(value: boolean) {
    cache.marketing = Boolean(value);
    this.updateConsentData();
  }

  get updated() {
    this.getConsentData();
    return cache.updated;
  }

  private getConsentData() {
    const consentData = getConsent();

    cache.necessary = consentData.necessary;
    cache.preferences = consentData.preferences;
    cache.statistics = consentData.statistics;
    cache.marketing = consentData.marketing;
    cache.updated = consentData.updated;
  }

  private updateConsentData() {
    updateConsent(cache, () => {
      dispatchEventContentUpdated();
    })
  }
}
