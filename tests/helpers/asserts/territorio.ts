import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { baseUrl } from '../../../src/common';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { By } from 'protractor';

export async function assertTerritorioExiste(nome: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/territorios`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-territorio-listar//tbody//tr/td[contains(@class, "nome")]'
      ),
      nome
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}
