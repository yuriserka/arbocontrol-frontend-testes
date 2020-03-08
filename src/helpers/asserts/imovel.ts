import { SmartWaiter } from '../smart_waiter';
import { By } from 'protractor';
import { getNodeWithText } from '../selectors';
import { baseUrl } from '../../../config';

/**
 * verifica se a o imovel passado foi criado, ou seja, checando se o mesmo
 * consta na tabela na página de gerenciamento de imoveis
 * @param logradouro
 */
export async function assertImovelExiste(logradouro: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/imoveis`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-imovel-listagem//tbody//tr/td[contains(@class, "logradouro")]/span'
      ),
      logradouro
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}
