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

    await selectFrom(
      By.xpath('//tbody//tr/td[contains(@class, "nome")]/a'),
      situacao,
    );

    return await element(
      By.xpath('//mat-checkbox[@formcontrolname="liberadaParaEdicao"]//input')
    ).isSelected();
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

    await selectFrom(
      By.xpath('//tbody//tr/td[contains(@class, "nome")]/a'),
      situacao,
    );

    return await element(
      By.xpath('//mat-checkbox[@formcontrolname="exigeJustificativa"]//input')
    ).isSelected();
  } catch (err) {
    return !ok;
  }
}
