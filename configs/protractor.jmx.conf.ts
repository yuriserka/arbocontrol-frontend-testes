import { Config } from 'protractor';
import { baseConfig } from './protractor.base.conf';
import { extensions, defaultChromeOpts, defaultMetadata } from './utils';
import * as path from 'path';

function loadFeatureFiles(fnames: string[]) {
  const featuresPath = path.join(__dirname, '..', '..', 'features', 'recorded');
  return fnames.map(f => path.join(featuresPath, `${f}.record.feature`));
}

export const config: Config = {
  ...baseConfig,
  cucumberOpts: {
    ...baseConfig.cucumberOpts,
    tags: '@Record',
  },
  multiCapabilities: [
    // {
    //   browserName: 'chrome',
    //   chromeOptions: {
    //     ...defaultChromeOpts,
    //     extensions,
    //   },
    //   shardTestFiles: true,
    //   maxInstances: 3,
    //   specs: loadFeatureFiles([
    //     'perfis_de_usuario',
    //     'login',
    //     'home',
    //     'territorios',
    //     'equipes',
    //   ]),
    //   metadata: {
    //     ...defaultMetadata,
    //   },
    // },
    {
      browserName: 'chrome',
      chromeOptions: {
        ...defaultChromeOpts,
        extensions,
      },
      specs: loadFeatureFiles([
        // 'imoveis',
        // 'atividades',
        // 'lista_de_trabalho',
        'relatorios',
      ]),
      metadata: {
        ...defaultMetadata,
      },
    },
  ],
};
