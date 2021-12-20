const { series, watch: watchGulp } = require('gulp');
const browserSync = require('./browserSync');
const scss = require('./scss');
const rollup = require('./rollup');
const lintJs = require('./lint-js');
const lintScss = require('./lint-scss');

const watchStyles = function watchStyles(done) {
  return series(lintScss, scss, rollup)(done);
};

const watchTypescript = function watchTypescript(done) {
  return series(lintJs, rollup)(done);
};

module.exports = function watch(done) {
  browserSync.init({
    server: '.',
    open: false,
    reloadDebounce: 1000,
  });

  return series(function watching() {
    watchGulp(['./src/**/*.ts'], watchTypescript);

    watchGulp(['./src/**/*.scss'], watchStyles);

    watchGulp(['./dist/*.js']).on('change', browserSync.reload);
  })(done);
};
