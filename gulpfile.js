const { series } = require('gulp');
const { ENV_DEVELOPMENT, ENV_PRODUCTION } = require('./tasks/helpers/config');
const scss = require('./tasks/scss');
const watch = require('./tasks/watch');
const rollup = require('./tasks/rollup');
const lintJs = require('./tasks/lint-js');
const lintScss = require('./tasks/lint-scss');

process.env.NODE_ENV = ENV_DEVELOPMENT;

const styles = function styles(done) {
  return series(
    lintScss,
    scss,
  )(done);
};

const build = function build(done) {
  return series(
    styles,
    lintJs,
    rollup,
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
  lintJs,
  styles,
}
