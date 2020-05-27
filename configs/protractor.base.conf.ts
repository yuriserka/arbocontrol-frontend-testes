import { Config, browser } from 'protractor';
import { Reporter } from '../src/helpers/reporter';
import * as path from 'path';
import * as fs from 'fs';

function getCurrentDateAndTime() {
  const date = new Date();
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const defaultRunInfoData = [
  { label: 'Project', value: 'ArboControl frontend tests' },
  { label: 'Release', value: '1.0.1' },
  { label: 'Execution Start Time', value: getCurrentDateAndTime() },
  { label: 'Execution End Time', value: '' },
];

export const defaultMetadata = {
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
export function loadExtensions() {
  const basePath = path.join(__dirname, '..', '..', 'extensions');
  return ['blazemeter_4_9_1_0.crx']
    .map(extName => path.join(basePath, extName))
    .map(f => fs.readFileSync(f).toString('base64'));
}

export const defaultChromeOpts = {
  args: ['disable-plugins', 'disable-infobars'],
  prefs: {
    download: {
      prompt_for_download: false,
      directory_upgrade: true,
      default_directory: path.join(
        __dirname,
        '..',
        '..',
        'reports',
        'downloads'
      ),
    },
  },
};

export const baseConfig: Config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  seleniumAddress: 'http://localhost:4444/wd/hub',
  stopSpecOnExpectationFailure: true,
  cucumberOpts: {
    compiler: 'ts:ts-node/register',
    require: [path.resolve(process.cwd(), './build/tests/**/*.js')],
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
    defaultRunInfoData[3].value = getCurrentDateAndTime();
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
          data: defaultRunInfoData,
        },
      },
    },
  ],
};
