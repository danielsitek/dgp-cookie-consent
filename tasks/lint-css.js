const stylelint = require('stylelint');

// Reports problems without failing the build, `npm run lint:css` is the strict check.
module.exports = async function lintCss() {
  const { report } = await stylelint.lint({
    files: 'src/**/*.css',
    formatter: 'string',
  });

  if (report) {
    console.log(report);
  }
};
