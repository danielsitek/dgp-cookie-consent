const { src, lastRun } = require('gulp');
const eslint = require('gulp-eslint');

module.exports = function lintJs(done) {
  return src(['src/**/*.ts'], {
    cwd: '.',
    since: lastRun(lintJs), // Viz: <https://github.com/gulpjs/gulp#incremental-builds>
  })
    .pipe(eslint())
    .pipe(eslint.format())
    .on('end', done);
};
