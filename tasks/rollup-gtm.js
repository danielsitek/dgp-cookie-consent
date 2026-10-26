const typescript = require('@rollup/plugin-typescript');
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve');
const { isDevelopment } = require('./helpers/environment');

const packageJson = require('../package.json');
const rollupPipe = require('./helpers/rollupPipe');

const createRollupConfig = () => ({
  input: 'src/gtm.ts',
  output: {
    file: 'dist/cookies-gtm.js',
    format: 'iife',
    sourcemap: isDevelopment(),
  },
  // Explicit include, picomatch 2.3.2 no longer matches the plugin's default '*.ts+(|x)' pattern.
  plugins: [resolve(), typescript({ include: ['**/*.ts'] })],
});

module.exports = async function rollupGtm() {
  const rollupConfig = createRollupConfig();

  return rollupPipe({
    file: 'gtm.ts',
    rollupConfig,
    packageJson,
  });
};
