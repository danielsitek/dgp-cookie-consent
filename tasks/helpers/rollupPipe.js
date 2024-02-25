const { src, dest } = require('gulp');
const rollupJs = require('rollup-stream-gulp');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
const stripDebug = require('gulp-strip-debug');
const strip = require('gulp-strip-comments');
const insert = require('gulp-insert');

module.exports = function rollupPipe({ file, rollupConfig, packageJson }) {
  return src([file], {
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
