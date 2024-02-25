const typescript = require('@rollup/plugin-typescript');
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { readFileSync } = require('fs');
const { isDevelopment } = require('./helpers/environment');

const packageJson = require('../package.json');
const rollupPipe = require('./helpers/rollupPipe');

const readCookiesStyles = () => {
  return readFileSync('dist/cookies.min.css', {
    encoding: 'utf8',
  }).toString();
};

const readBadgeStyles = () => {
  return readFileSync('dist/badge.min.css', {
    encoding: 'utf8',
  }).toString();
};

const createRollupConfig = () => ({
  input: 'src/index.ts',
  output: {
    file: packageJson.main,
    format: 'iife',
    sourcemap: isDevelopment(),
  },
  plugins: [
    resolve(),
    typescript(),
    replace({
      values: {
        __INLINE_STYLES__: readCookiesStyles(),
        __INLINE_BADGE_STYLES__: readBadgeStyles(),
      },
      preventAssignment: true,
    }),
  ],
});

module.exports = async function rollup() {
  const rollupConfig = createRollupConfig();

  return rollupPipe({
    file: 'index.ts',
    rollupConfig,
    packageJson,
  });
};
