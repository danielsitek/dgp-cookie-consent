export function dataLayerPush(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(...args);
}
