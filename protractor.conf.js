exports.config = {
  framework: 'custom',
  capabilities: {
    browserName: 'chrome',
    binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome',
    chromeOptions: {
      args: [
        'load-extension=C:/Users/YSerk/AppData/Local/Google/Chrome/User Data/Default/Extensions/mbopgmdnpcbohhpnfglgohlbhfongabi/4.8.0_0',
        'enable-automation',
        'disable-plugins',
        'disable-infobars'
      ]
    }
  },
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./src/features/**/*.feature'],
  "stopSpecOnExpectationFailure": true,
  cucumberOpts: {
    require: ['./src/specs/**/*.spec.js'],
    format: ['json:results.json'],
    tags: false,
    strict: true,
    profile: false,
    'no-source': true,
    'dry-run': false,
  },
  afterLaunch: function () {
    var reporter = require('cucumber-html-reporter');

    var options = {
      theme: 'bootstrap',
      jsonFile: 'results.json',
      output: 'logs/resultados/cucumber_report.html',
      reportSuiteAsScenarios: true,
      launchReport: true
    };

    reporter.generate(options);
  },
  onPrepare: function () {
    browser.manage().window().maximize();
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  plugins: []
}