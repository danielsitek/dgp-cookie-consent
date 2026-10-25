const { series } = require('gulp');
const { ENV_DEVELOPMENT, ENV_PRODUCTION } = require('./tasks/helpers/config');
const css = require('./tasks/css');
const watch = require('./tasks/watch');
const rollup = require('./tasks/rollup');
const rollupGtm = require('./tasks/rollup-gtm');
const lintJs = require('./tasks/lint-js');
const lintCss = require('./tasks/lint-css');

process.env.NODE_ENV = ENV_DEVELOPMENT;

const styles = function styles(done) {
  return series(
    lintCss,
    css,
  )(done);
};

const build = function build(done) {
  return series(
    styles,
    lintJs,
    rollup,
    rollupGtm,
  )(done);
};

const dev = function dev(done) {
  return series(
    build,
    watch,
  )(done);
};

const prod = function min(done) {
  process.env.NODE_ENV = ENV_PRODUCTION;

  return series(
    build,
  )(done);
};

module.exports = {
  build,
  prod,
  default: dev,
  rollup,
  rollupGtm,
  lintJs,
  styles,
}
