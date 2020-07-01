import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { getNodeWithText, selectFrom } from '../../../src/helpers/selectors';
import { By, browser, element } from 'protractor';
import { baseUrl } from '../../../src/common';

/**
 * checa se a situação está liberada para edição
 * @param situacao 
 */
export async function assertSituacaoLiberadaParaEdicao(situacao: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/situacoes-atividade`);
  const ok = true;
  try {
    await element(By.xpath('//mat-paginator//mat-select')).click();
    await selectFrom(By.xpath('//mat-option/span'), '30');
    await browser.sleep(1000);

    const situacaoRow = await getNodeWithText(
      By.xpath('//tbody//tr'),
      situacao,
      By.xpath('./td[contains(@class, "nome")]/a')
    );

    return situacaoRow
      .element(
        By.xpath('./td[contains(@class, "cdk-column-liberadaParaEdicao")]/a')
      )
      .getText()
      .then(txt => txt.toLowerCase() === 'sim');
  } catch (err) {
    return !ok;
  }
}

/**
 * checa se a situação exige justificativa
 * @param situacao 
 */
export async function assertSituacaoExigeJustificativa(situacao: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/situacoes-atividade`);
  const ok = true;
  try {
    await element(By.xpath('//mat-paginator//mat-select')).click();
    await selectFrom(By.xpath('//mat-option/span'), '30');
    await browser.sleep(1000);

    const situacaoRow = await getNodeWithText(
      By.xpath('//tbody//tr'),
      situacao,
      By.xpath('./td[contains(@class, "nome")]/a')
    );

    return situacaoRow
      .element(
        By.xpath('./td[contains(@class, "cdk-column-exigeJustificativa")]/a')
      )
      .getText()
      .then(txt => txt.toLowerCase() === 'sim');
  } catch (err) {
    return !ok;
  }
}
