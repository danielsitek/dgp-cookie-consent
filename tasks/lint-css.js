const { src, lastRun } = require('gulp');
const gulpStylelint = require('@ronilaukkarinen/gulp-stylelint');

module.exports = function lintCss(done) {
  return src(['src/**/*.css'], {
    cwd: '.',
    since: lastRun(lintCss), // Viz: <https://github.com/gulpjs/gulp#incremental-builds>
  })
    .pipe(
      gulpStylelint({
        failAfterError: false,
        reporters: [
          {
            formatter: 'string',
            console: true,
          },
        ],
      }),
    )
    .on('end', done);
};
