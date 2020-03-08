import { SmartWaiter } from '../smart_waiter';
import { By, element } from 'protractor';
import { baseUrl } from '../../../config';

/**
 * checa se a quantidade de registros antes da inserção é menor que depois da inserção
 * @param quantidadeAntiga
 */
export async function assertRegistroInserido(quantidadeAntiga: number) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/registros`);
  return (
    (await element
      .all(By.xpath('//app-registro-atividade-tabela//tbody//tr'))
      .count()) > quantidadeAntiga
  );
}
