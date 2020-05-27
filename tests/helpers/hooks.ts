import { BeforeAll, After, Before } from 'cucumber';
import { getTestPage, logout, login, userTest } from './common';
import { CssEditor } from '../../src/helpers/css_editor';
import { By } from 'protractor';
import { SmartWaiter } from '../../src/helpers/smart_waiter';

/**
 * Roda somente uma vez e acessa a URL a ser testada
 */
BeforeAll(async () => {
  await getTestPage();
});

Before(async () => {
  await SmartWaiter.waitOneSecond(15);
});

Before('@NeedLogin', async () => {
  await login(userTest);
});

/**
 * faz logout depois de cada cenário do arquivo de feature
 */
After('not @Blaze', async () => {
  await logout();
});

/**
 * Retira o popup do blazemeter
 */
Before('not @Blaze and @Record', async () => {
  try {
    await SmartWaiter.waitOneSecond();
    await CssEditor.execute(
      By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'),
      [{ atributo: 'display', valor: 'none' }]
    );
    await SmartWaiter.waitOneSecond();
  } catch (err) {}
});
