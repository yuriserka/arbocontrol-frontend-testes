import { Config } from 'protractor';
import { baseConfig } from './protractor.base.conf';
import * as path from 'path';
import { defaultChromeOpts, defaultMetadata } from './utils';

function loadFeatureFiles(fnames: string[]) {
  const featuresPath = path.join(__dirname, '..', '..', 'features');
  return fnames.map(f => path.join(featuresPath, `${f}.feature`));
}

export const config: Config = {
  ...baseConfig,
  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: defaultChromeOpts,
      shardTestFiles: true,
      maxInstances: 5,
      specs: loadFeatureFiles([
        'login',
        // 'home',
        // 'perfis_de_usuario',
        // 'equipes',
        // 'territorios',
      ]),
      metadata: {
        ...defaultMetadata,
      },
    },
    // {
    //   browserName: 'chrome',
    //   chromeOptions: defaultChromeOpts,
    //   specs: loadFeatureFiles([
    //     'imoveis',
    //     'atividades',
    //     'lista_de_trabalho',
    //     'relatorios',
    //   ]),
    //   metadata: {
    //     ...defaultMetadata,
    //   },
    // },
  ],
};
