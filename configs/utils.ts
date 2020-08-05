import * as path from 'path';
import * as fs from 'fs';

/**
 * array com as extensoes desejadas
 */
const extensionsName = ['blazemeter_4_9_1_0.crx'];

/**
 * retorna um array de strings base64 encoded para os arquivos de extensão
 * do chrome '.crx'
 */
function loadExtensions() {
  const basePath = path.join(__dirname, '..', '..', 'extensions');
  return extensionsName
    .map(extName => path.join(basePath, extName))
    .map(f => fs.readFileSync(f).toString('base64'));
}

/**
 * array de string base64 representando as extensoes que devem ser carregadas
 * no chrome
 */
export const extensions = loadExtensions();

/**
 * metadata que será inserido no relatorio final gerado
 */
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
 * opções padroes para o navegador google chrome
 */
export const defaultChromeOpts = {
  args: [
    '--headless',
    '--window-size=1280x720',
    '--no-sandbox',
    '--disable-plugins',
    '--disable-infobars',
    '--disable-gpu'
  ],
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
