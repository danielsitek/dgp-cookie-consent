type GtagConsentCommand = (command: 'consent', action: 'default' | 'update', params: Record<string, string>) => void;

/**
 * Queues a Google tag command in the documented gtag shape, `dataLayer.push(arguments)`.
 * Leaves the host's `window.gtag` untouched.
 * See <https://developers.google.com/tag-platform/security/guides/consent>.
 */
export const gtagCommand: GtagConsentCommand = function () {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params -- gtag commands must be an Arguments object, not an Array.
  window.dataLayer.push(arguments);
};

/** Queues a custom event as a plain object. */
export function dataLayerPush(event: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
