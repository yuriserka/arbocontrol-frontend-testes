// const fs = require('fs');
// const path = require('path');

exports.config = {
  framework: 'custom',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // carregar direto do diretório é muito mais rápido que ler o arquivo com encode base64
        'load-extension=C:/Users/YSerk/AppData/Local/Google/Chrome/User Data/Default/Extensions/mbopgmdnpcbohhpnfglgohlbhfongabi/4.8.0_0',
        'disable-plugins',
        'disable-infobars'
      ],
      // extensions: [
      //   fs.readFileSync(path.resolve('./extensions', 'blazemeter_4_8_0_0.crx'), { encoding: 'base64' }),
      // ],
    }
  },
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['./src/features/**/home.feature'],
  "stopSpecOnExpectationFailure": true,
  cucumberOpts: {
    require: ['./src/specs/**/home.spec.js'],
    format: ['json:results.json'],
    tags: false,
    strict: true,
    profile: false,
    'no-source': true,
    'dry-run': false,
  },
  afterLaunch: () => {
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
  onPrepare: () => {
    browser.manage().window().maximize();
    require('babel-register');
    require('babel-polyfill');
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  plugins: []
}