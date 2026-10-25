const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

// Style entries, local @import rules are inlined at build time.
module.exports = function css() {
  return src(['*.css'], {
    cwd: 'src/styles',
  })
    .pipe(postcss([postcssImport(), autoprefixer()]))
    .pipe(dest('./dist'))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./dist'));
};
