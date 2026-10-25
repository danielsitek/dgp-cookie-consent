const { src, dest, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass')(require('sass'));
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

const cwd = 'src/styles';

const minify = (stream) => {
  return stream
    .pipe(dest('./dist'))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./dist'));
};

const compileScss = function compileScss() {
  return minify(
    src(['*.scss'], {
      cwd,
    })
      .pipe(
        gulpSass({
          precision: 3,
          sourceMap: false,
        }),
      )
      .pipe(postcss([autoprefixer()])),
  );
};

// Standard CSS entries, local @import rules are inlined at build time.
// An entry must exist either as .scss or as .css, not both.
const compileCss = function compileCss() {
  return minify(
    src(['*.css'], {
      cwd,
      allowEmpty: true,
    }).pipe(postcss([postcssImport(), autoprefixer()])),
  );
};

module.exports = parallel(compileScss, compileCss);
