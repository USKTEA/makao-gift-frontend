const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

setHeadlessWhen(process.env.HEADLESS);

setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: true,
      browser: 'chromium',
    },
    REST: {
      endpoint: 'http://localhost:8000/backdoor',
      prettyPrintJson: true,
    },
  },
  include: {
    I: './steps_file.js',
  },
  name: 'makao-gift-frontend',
};
