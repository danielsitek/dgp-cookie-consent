
const { rollup: rollupJs } = require('rollup');
const typescript = require( '@rollup/plugin-typescript');
const { nodeResolve: resolve } = require( '@rollup/plugin-node-resolve');
const strip = require( '@rollup/plugin-strip');
const replace = require( '@rollup/plugin-replace');
const { readFileSync } = require( 'fs');
const { isDevelopment, isProduction } = require('./helpers/environment');

const packageJson = require('../package.json');

const readCookiesStyles = () => {
  return readFileSync('dist/cookies.min.css', {
    encoding: 'utf8',
  }).toString();
};

// Rollup's promise API works great in an `async` task
module.exports = async function rollup() {


  const bundle = await rollupJs({
    input: 'src/index.ts',
    plugins: [
      resolve(),
      typescript(),
      // isProduction() ?? strip({
      //   exclude: 'node_modules/**',
      //   functions: [
      //     'console.log',
      //   ]
      // }),
      replace({
        values: {
          '__INLINE_STYLES__': readCookiesStyles(),
        },
        preventAssignment: true,
      })
    ],
  });

  return bundle.write({
    file: packageJson.main,
    format: 'iife',
    sourcemap: isDevelopment(),
  });
};
