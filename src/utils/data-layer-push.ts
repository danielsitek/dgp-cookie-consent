export function dataLayerPush(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];

  if (args.length === 1) {
    window.dataLayer.push(args[0]);
    return;
  }

  window.dataLayer.push(args);
}
