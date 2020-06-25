import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { baseUrl } from '../../../src/common';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { By } from 'selenium-webdriver';
import { Relatorio } from '../../../src/models/relatorio';
import { element, browser } from 'protractor';
import { RelatoriosPage } from '../../../src/pages/relatorios.po';
import { idRegistros } from '../background.steps';

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
        '//app-relatorio-tabela//tbody//tr/td[contains(@class, "titulo")]'
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
export async function assertRelatorioPossuiRegistros(relatorio: Relatorio) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/relatorios`);
  const ok = true;
  try {
    await relatoriosPage.selecionarRelatorio(relatorio.titulo);
    await SmartWaiter.waitOneSecond();

    let ids: string[] = await element
      .all(
        By.xpath('//div[starts-with(text(), "(") and contains(text(), ")")]')
      )
      .map(id => id?.getText());
    ids = ids.map(id => id.slice(1, id.length - 1)).sort();
    idRegistros.sort();

    const eqArr = (a: string[], b: string[]) => {
      if (a === b) return true;
      if (a == null || b == null) return !ok;
      if (a.length !== b.length) return !ok;

      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return !ok;
      }
      return ok;
    };
    return eqArr(idRegistros.sort(), ids);
  } catch (err) {
    return !ok;
  }
}
