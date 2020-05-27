import { Config } from 'protractor';
import {
  baseConfig,
  defaultChromeOpts,
  defaultMetadata,
} from './protractor.base.conf';
import * as path from 'path';

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
        'perfis_de_usuario',
        'login',
        'home',
        'territorios',
        'equipes',
      ]),
      metadata: {
        ...defaultMetadata,
      },
    },
    {
      browserName: 'chrome',
      chromeOptions: defaultChromeOpts,
      specs: loadFeatureFiles([
        'imoveis',
        'atividades',
        'lista_de_trabalho',
        'relatorios',
      ]),
      metadata: {
        ...defaultMetadata,
      },
    },
  ],
};
