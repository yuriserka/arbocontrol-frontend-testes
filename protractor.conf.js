// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./spec/*[sS]pec.js'],
  suites: {
    login: './spec/LoginSpec.js',
    home: './spec/HomeSpec.js',
    forms: './spec/FormularioSpec.js',
  },
  onPrepare() {
    browser.manage().window().maximize();
  },
  // Stop execution of a spec after the first expectation failure in it
  "stopSpecOnExpectationFailure": true,
  // reinicia o browser a cada describe
  restartBrowserBetweenTests: true,
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    // random: true
  }
}