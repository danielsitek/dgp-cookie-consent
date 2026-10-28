// Run the callback now when <body> exists, otherwise once the document is parsed
// (the script can run from <head> or from an early GTM tag).
export const onBodyReady = (callback: () => void): void => {
  // After parsing DOMContentLoaded will not fire again, so run right away even without <body>.
  if (document.body || document.readyState !== 'loading') {
    callback();
    return;
  }

  document.addEventListener('DOMContentLoaded', callback, { once: true });
};
