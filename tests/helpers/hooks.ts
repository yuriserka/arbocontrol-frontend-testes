import { After, Before } from 'cucumber';
import { logout, login, userTest, getTestPage } from './common';
import { CssEditor } from '../../src/helpers/css_editor';
import { By } from 'protractor';
import { SmartWaiter } from '../../src/helpers/smart_waiter';

/**
 * Tag utilizada nos testes de geração de arquivos jmx
 */
Before('@NeedLogin', async () => {
  await login(userTest);
});

/**
 * faz logout depois de cada cenário de teste
 */
After('not @Blaze', async () => {
  await logout();
});

/**
 * Retira o popup do blazemeter caso ele ainda esteja visivel antes de começar
 * o cenário de teste
 */
Before('not @Blaze and @Record', async () => {
  try {
    await CssEditor.execute(
      By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'),
      [{ atributo: 'display', valor: 'none' }]
    );
    await SmartWaiter.waitOneSecond();
  } catch (err) {}
});
