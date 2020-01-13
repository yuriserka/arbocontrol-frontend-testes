const fs = require('fs');
const path = require('path');

exports.config = {
  framework: 'custom',
  capabilities: {
    browserName: 'chrome',
    // binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome',
    chromeOptions: {
      args: [
        // 'load-extension=C:/Users/YSerk/AppData/Local/Google/Chrome/User Data/Default/Extensions/mbopgmdnpcbohhpnfglgohlbhfongabi/4.8.0_0',
        'enable-automation',
        'disable-plugins',
        'disable-infobars'
      ],
      extensions: [
        fs.readFileSync(path.resolve('./exts', 'blazemeter_4_8_0_0.crx'), { encoding: 'base64' }),
      ],
    }
  },
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./src/features/**/login.feature'],
  "stopSpecOnExpectationFailure": true,
  cucumberOpts: {
    require: ['./src/specs/**/login.spec.js'],
    format: ['json:results.json'],
    tags: false,
    strict: true,
    profile: false,
    'no-source': true,
    'dry-run': false,
  },
  afterLaunch: function () {
    const reporter = require('cucumber-html-reporter');

    const options = {
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