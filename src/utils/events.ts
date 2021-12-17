import { EVENT_CONSENT_UPDATED, EVENT_DEBOUNCE } from '../config';
import { debounce } from './debounce';

export const eventConsentUpdated = new Event(EVENT_CONSENT_UPDATED);

export const dispatchEventContentUpdated = debounce(() => {
  window.dispatchEvent(eventConsentUpdated);
}, EVENT_DEBOUNCE);
