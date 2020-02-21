import { Config, browser } from 'protractor';
import { Reporter } from './src/helpers/reporter';
const fs = require('fs');
import path = require('path');

export const config: Config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        // 'load-extension=C:/Users/YSerk/AppData/Local/Google/Chrome/User Data/Default/Extensions/mbopgmdnpcbohhpnfglgohlbhfongabi/4.8.0_0',
        'disable-plugins',
        'disable-infobars',
      ],
      // extensions: [
      //   fs.readFileSync(
      //     path.resolve('./extensions', 'blazemeter_4_8_0_0.crx'),
      //     { encoding: 'base64' }
      //   ),
      // ],
    },
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../features/atividades.feature'], // path relativo ao protractor.conf.js que está em build/
  stopSpecOnExpectationFailure: true,
  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    require: ['tests/atividades.spec.js'], // path relativo ao protractor.conf.js que está em build/
    format: ['json:./reports/results.json'],
    tags: false,
    strict: true,
    profile: false,
    'no-source': true,
    'dry-run': false,
  },
  onPrepare: () => {
    browser
      .manage()
      .window()
      .maximize();

    Reporter.criarDiretorio('reports');
  },
  onComplete: () => {
    Reporter.gerarRelatorioCucumber();
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  plugins: [],
};
