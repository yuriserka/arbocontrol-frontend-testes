import { Config, browser } from 'protractor';
import { Reporter } from './src/helpers/reporter';
import * as path from 'path';
import * as fs from 'fs';

function getCurrentDateAndTime() {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const runInfoData = [
  { label: 'Project', value: 'ArboControl frontend tests' },
  { label: 'Release', value: '1.0.1' },
  { label: 'Execution Start Time', value: getCurrentDateAndTime() },
  { label: 'Execution End Time', value: '' },
];

const metadata = {
  browser: {
    name: 'chrome',
    version: '83.0.4103.61',
  },
  device: 'Local test machine',
  platform: {
    name: 'windows',
    version: '10',
  },
};

/**
 * retorna uma string base64 encoded dos arquivos de extensão do chrome '.crx'
 */
function loadExtensions() {
  const basePath = path.join(__dirname, '..', './extensions');
  return ['blazemeter_4_9_1_0.crx']
    .map(extName => path.join(basePath, extName))
    .map(f => fs.readFileSync(f).toString('base64'));
}

const chromeOpts = {
  args: ['disable-plugins', 'disable-infobars'],
  prefs: {
    download: {
      prompt_for_download: false,
      directory_upgrade: true,
      default_directory: path.join(__dirname, '..', 'reports', 'downloads'),
    },
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
        // '../features/perfis_de_usuario.feature',
        // '../features/login.feature',
        '../features/home.feature',
        // '../features/territorios.feature',
        // '../features/equipes.feature',
      ],
      metadata,
    },
    // {
    //   browserName: 'chrome',
    //   chromeOptions: {
    //     ...chromeOpts,
    //     extensions: loadExtensions(),
    //   },
    //   shardTestFiles: true,
    //   maxInstances: 1,
    //   // path relativo ao protractor.conf.js que está em build/
    //   specs: ['../features/**/relatorios.feature'],
    //   metadata,
    // },
    // {
    //   browserName: 'chrome',
    //   chromeOptions: chromeOpts,
    //   // path relativo ao protractor.conf.js que está em build/
    //   specs: [
    //     // '../features/imoveis.feature',
    //     '../features/atividades.feature',
    //     // '../features/lista_de_trabalho.feature',
    //     // '../features/relatorios.feature',
    //   ],
    //   metadata,
    // },
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
    runInfoData[3].value = getCurrentDateAndTime();
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
