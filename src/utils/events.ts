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

export const eventConsentUpdated = new Event(EVENT_CONSENT_UPDATED);
export const eventConsentShow = new Event(EVENT_CONSENT_SHOW);
export const eventConsentHide = new Event(EVENT_CONSENT_HIDE);
export const eventConsentReady = new Event(EVENT_CONSENT_READY);
export const eventConsentClose = new Event(EVENT_CONSENT_CLOSE);
export const eventBadgeShow = new Event(EVENT_BADGE_SHOW);
export const eventBadgeClick = new Event(EVENT_BADGE_CLICK);
export const eventBadgeHide = new Event(EVENT_BADGE_HIDE);

export const dispatchEventConsentUpdated = debounce(() => {
  window.dispatchEvent(eventConsentUpdated);
}, EVENT_DEBOUNCE);

export const dispatchEventConsentShow = debounce(() => {
  window.dispatchEvent(eventConsentShow);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentHide = debounce(() => {
  window.dispatchEvent(eventConsentHide);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentReady = debounce(() => {
  window.dispatchEvent(eventConsentReady);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventConsentClose = debounce(() => {
  window.dispatchEvent(eventConsentClose);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeShow = debounce(() => {
  window.dispatchEvent(eventBadgeShow);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeClick = debounce(() => {
  window.dispatchEvent(eventBadgeClick);
}, EVENT_DEBOUNCE_FAST);

export const dispatchEventBadgeHide = debounce(() => {
  window.dispatchEvent(eventBadgeHide);
}, EVENT_DEBOUNCE_FAST);
