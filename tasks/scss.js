const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');

module.exports = function scss() {
  return src(['*.scss'], {
    cwd: 'src/styles',
  })
    .pipe(
      gulpSass({
        precision: 3,
        sourceMap: false,
      }),
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist'))
    .pipe(postcss([cssnano()]))
    .pipe(
      rename({
        suffix: '.min',
      }),
    )
    .pipe(dest('./dist'));
};
