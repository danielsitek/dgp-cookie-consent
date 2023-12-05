import {
  EVENT_BADGE_CLICK,
  EVENT_BADGE_HIDE,
  EVENT_BADGE_SHOW,
  EVENT_CONSENT_CLOSE,
  EVENT_CONSENT_HIDE,
  EVENT_CONSENT_READY,
  EVENT_CONSENT_SHOW,
  EVENT_CONSENT_UPDATED,
  EVENT_DEBOUNCE,
  EVENT_DEBOUNCE_FAST,
} from '../config';
import { debounce } from './debounce';

const dispatchEvent = (eventName: string) => window.dispatchEvent(new Event(eventName));

export const dispatchEventConsentUpdated = debounce(() => {
  dispatchEvent(EVENT_CONSENT_UPDATED);
}, EVENT_DEBOUNCE);

export const dispatchEventConsentShow = debounce(() => {
  dispatchEvent(EVENT_CONSENT_SHOW);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentHide = debounce(() => {
  dispatchEvent(EVENT_CONSENT_HIDE);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentReady = debounce(() => {
  dispatchEvent(EVENT_CONSENT_READY);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentClose = debounce(() => {
  dispatchEvent(EVENT_CONSENT_CLOSE);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeShow = debounce(() => {
  dispatchEvent(EVENT_BADGE_SHOW);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeClick = debounce(() => {
  dispatchEvent(EVENT_BADGE_CLICK);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeHide = debounce(() => {
  dispatchEvent(EVENT_BADGE_HIDE);
}, EVENT_DEBOUNCE_FAST);
