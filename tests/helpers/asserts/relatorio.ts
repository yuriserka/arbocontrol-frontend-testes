import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { baseUrl } from '../../../config';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { By } from 'selenium-webdriver';
import { Relatorio } from '../../../src/models/relatorio';
import { element, browser } from 'protractor';
import { RelatoriosPage } from '../../../src/pages/relatorios.po';
import { atividades } from '../background.steps';

const relatoriosPage = new RelatoriosPage();

/**
 * verifica se a o relatorio passado foi criado, ou seja, checando se o mesmo
 * consta na tabela na página de gerenciamento de relatorios e indices
 * @param nomeDoRelatorio
 */
export async function assertRelatorioExiste(nomeDoRelatorio: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/relatorios-indices`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-relatorio-tabela//tbody//tr/td[contains(@class, "titulo")]/a'
      ),
      nomeDoRelatorio
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

/**
 *
 * @param relatorio
 */
export async function assertRelatorioPossuiQuantidadeCorretaDeRegistros(
  relatorio: Relatorio
) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/relatorios`);
  const ok = true;
  try {
    await relatoriosPage.selecionarRelatorio(relatorio.titulo);
    await relatoriosPage.pesquisar('01/01/2019', '12/12/2020');
    await browser.sleep(2000);
    const totalRegistros = +(await element(
      By.xpath('//*[contains(@class, "wdr-cell wdr-total wdr-grand-total")]')
    ).getText());
    console.log(totalRegistros, Object.keys(atividades).length);
    if (Object.keys(atividades).length !== totalRegistros) {
      throw Error();
    }
  } catch (err) {
    console.log(err);
    return !ok;
  }
  return ok;
}
