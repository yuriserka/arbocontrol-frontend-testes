import { SmartWaiter } from '../smart_waiter';
import { By, element } from 'protractor';
import { baseUrl } from '../../../config';

/**
 *
 * @param quantidadeAntiga
 */
export async function assertRegistroDeCampoInserido(quantidadeAntiga: number) {
  await SmartWaiter.waitUrl(`${baseUrl}/lista_de_trabalho`);
  return (await element.all(By.xpath('')).count()) > quantidadeAntiga;
}

/**
 *
 * @param quantidadeAntiga
 */
export async function assertRegistroDeLaboratorioInserido(
  quantidadeAntiga: number
) {
  await SmartWaiter.waitUrl(`${baseUrl}/lista_de_trabalho`);
  return (await element.all(By.xpath('')).count()) > quantidadeAntiga;
}
