const { src, dest } = require('gulp');
const rollupJs = require('rollup-stream-gulp');
const typescript = require('@rollup/plugin-typescript');
const { nodeResolve: resolve } = require('@rollup/plugin-node-resolve');
const { isDevelopment } = require('./helpers/environment');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const stripDebug = require('gulp-strip-debug');
const strip = require('gulp-strip-comments');
const insert = require('gulp-insert');

const packageJson = require('../package.json');

const createRollupConfig = () => ({
  input: 'src/gtm.ts',
  output: {
    file: 'dist/cookies-gtm.js',
    format: 'iife',
    sourcemap: isDevelopment(),
  },
  plugins: [resolve(), typescript()],
});

module.exports = async function rollup() {
  const rollupConfig = createRollupConfig();

  return src(['gtm.ts'], {
    cwd: 'src',
  })
    .pipe(rollupJs(rollupConfig))
    .pipe(strip())
    .pipe(dest('./dist'))
    .pipe(stripDebug())
    .pipe(
      terser({
        mangle: {
          reserved: ['ConsentService'],
        },
      }),
    )
    .pipe(insert.prepend(`/* v${packageJson.version} */`))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./dist'));
};
