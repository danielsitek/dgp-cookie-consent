const { src, lastRun } = require('gulp');
const gulpStylelint = require('@ronilaukkarinen/gulp-stylelint');

module.exports = function lintScss(done) {
  return src(['src/**/*.scss'], {
    cwd: '.',
    since: lastRun(lintScss), // Viz: <https://github.com/gulpjs/gulp#incremental-builds>
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
