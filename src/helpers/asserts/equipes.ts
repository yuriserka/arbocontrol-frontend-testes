import { SmartWaiter } from '../smart_waiter';
import { By } from 'protractor';
import { getNodeWithText } from '../selectors';

export async function assertEquipeExiste(nomeDaEquipe: string) {
  await SmartWaiter.waitUrl('http://localhost/equipes');
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath('//tbody//tr//td//span[@class="span-link"]'),
      nomeDaEquipe
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}
