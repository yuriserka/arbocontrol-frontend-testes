import { Config, browser } from 'protractor';
import { Reporter } from './src/helpers/reporter';
const fs = require('fs');
import path = require('path');

const chromeOpts = {
  args: ['disable-plugins', 'disable-infobars'],
};

const startTime = (() => {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
})();

const runInfoData = [
  { label: 'Project', value: 'ArboControl frontend tests' },
  { label: 'Release', value: '1.0.1' },
  { label: 'Execution Start Time', value: startTime },
  { label: 'Execution End Time', value: '' },
];

const metadata = {
  browser: {
    name: 'chrome',
    version: '80.0.3987.163',
  },
  device: 'Local test machine',
  platform: {
    name: 'windows',
    version: '10',
  },
};

export const config: Config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  seleniumAddress: 'http://localhost:4444/wd/hub',
  stopSpecOnExpectationFailure: true,
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: chromeOpts,
      shardTestFiles: true,
      maxInstances: 5,
      // path relativo ao protractor.conf.js que está em build/
      specs: [
        '../features/perfis_de_usuario.feature',
        '../features/login.feature',
        '../features/home.feature',
        '../features/territorios.feature',
        '../features/equipes.feature',
      ],
      metadata,
    },
    {
      browserName: 'chrome',
      chromeOptions: chromeOpts,
      // path relativo ao protractor.conf.js que está em build/
      specs: ['../features/imoveis.feature', '../features/atividades.feature'],
      metadata,
    },
  ],
  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    require: ['tests/**/*.js'], // path relativo ao protractor.conf.js que está em build/
    format: [require.resolve('cucumber-pretty'), 'json:reports/results.json'],
    'fail-fast': true,
    tags: false,
    strict: true,
    profile: false,
    'no-source': true,
    'dry-run': false,
  },
  onPrepare: async () => {
    Reporter.criarDiretorio('reports');
    await browser
      .manage()
      .window()
      .maximize();
  },
  onComplete: () => {
    const date = new Date();
    runInfoData[3].value = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  },
  getPageTimeout: 30000,
  allScriptsTimeout: 30000,
  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        removeOriginalJsonReportFile: true,
        saveCollectedJSON: true,
        displayDuration: true,
        pageTitle: 'Relatório Testes - ArboControl',
        customData: {
          title: 'Run info',
          data: runInfoData,
        },
      },
    },
  ],
};
