import { EVENT_CONSENT_UPDATED } from '../config';

export const eventConsentUpdated = new Event(EVENT_CONSENT_UPDATED);

export const dispatchEventContentUpdated = (): void => {
  window.dispatchEvent(eventConsentUpdated);
};
