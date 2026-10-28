import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'happy-dom',
    environmentOptions: {
      happyDOM: {
        // Never fetch external scripts (e.g. the panel script injected by the GTM loader).
        settings: {
          disableJavaScriptFileLoading: true,
          handleDisabledFileLoadingAsSuccess: true,
        },
      },
    },
    include: ['src/**/*.spec.ts'],
  },
});
