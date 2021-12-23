const { src, dest } = require('gulp');
const rollupJs = require('rollup-stream-gulp');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { readFileSync } = require('fs');
const { isDevelopment } = require('./helpers/environment');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const stripDebug = require('gulp-strip-debug');

const packageJson = require('../package.json');

const readCookiesStyles = () => {
  return readFileSync('dist/cookies.min.css', {
    encoding: 'utf8',
  }).toString();
};

module.exports = async function rollup() {
  const rollupConfig = {
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
        },
        preventAssignment: true,
      }),
    ],
  };

  return src(['index.ts'], {
    cwd: 'src',
  })
    .pipe(rollupJs(rollupConfig))
    .pipe(dest('./dist'))
    .pipe(stripDebug())
    .pipe(terser())
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./dist'));
};