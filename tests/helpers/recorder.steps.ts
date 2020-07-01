import { Given, Then } from 'cucumber';
import { Recorder } from '../../src/helpers/recorder';

export let recorder: Recorder;

Given(
  'que eu desejo obter um script de carga para a funcionalidade {string}',
  (funcionalidade: string) => {
    recorder = new Recorder(funcionalidade);
  }
);

Then('eu inicio uma gravação do BlazeMeter', async () => {
  await recorder.iniciar();
});

Then('paro a gravação do BlazeMeter', async () => {
  await recorder.terminar();
});
