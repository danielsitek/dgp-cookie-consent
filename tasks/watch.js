const { series, watch: watchGulp } = require('gulp');
const browserSync = require('./browserSync');
const css = require('./css');
const rollup = require('./rollup');
const rollupGtm = require('./rollup-gtm');
const lintJs = require('./lint-js');
const lintCss = require('./lint-css');

const watchStyles = function watchStyles(done) {
  return series(lintCss, css, rollup)(done);
};

const watchTypescript = function watchTypescript(done) {
  return series(lintJs, rollup, rollupGtm)(done);
};

module.exports = function watch(done) {
  browserSync.init({
    server: '.',
    open: false,
    reloadDebounce: 1000,
  });

  return series(function watching() {
    watchGulp(['./src/**/*.ts'], watchTypescript);

    watchGulp(['./src/**/*.css'], watchStyles);

    watchGulp(['./dist/*.js']).on('change', browserSync.reload);

    watchGulp(['./public/index.html']).on('change', browserSync.reload);
  })(done);
};
