import { BeforeAll, After, Before } from 'cucumber';
import { getTestPage, logout, login, userTest } from './common';
import { CssEditor } from '../../src/helpers/css_editor';
import { By, browser } from 'protractor';

/**
 * Roda somente uma vez e acessa a URL a ser testada
 */
BeforeAll(async () => {
  await getTestPage();
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
    await CssEditor.execute(
      By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'),
      [{ atributo: 'display', valor: 'none' }]
    );
    await browser.sleep(1000);
  } catch (err) {}
});
