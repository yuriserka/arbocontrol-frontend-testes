import { SmartWaiter } from '../smart_waiter';
import { By, browser, element } from 'protractor';
import { getNodeWithText } from '../selectors';
import { baseUrl } from '../../../config';
import { HomePage } from '../../pages/home.po';
import { assertEquipePossui } from './equipes';

/**
 * checa se a atividade existe na página de gerenciamento de atividades
 * @param nomeDaAtividade
 */
export async function assertAtividadeExiste(nomeDaAtividade: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/atividades`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-atividade-tabela//tbody//tr//td[contains(@class, "titulo")]'
      ),
      nomeDaAtividade
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

/**
 * checa se a demanda foi corretamente atribuída à atividade
 * @param numeroDaDemanda
 */
export async function assertDemandaVinculada(numeroDaDemanda: string) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/atividades/editar`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-demanda-atividade-tabela//tbody//tr//td[contains(@class, "numero")]'
      ),
      numeroDaDemanda
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

/**
 * checa se o imóvel foi corretamente atribído à atividade
 * @param logradouroDoImovel
 */
export async function assertImovelVinculado(logradouroDoImovel: string) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/atividades/editar`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-atividade-imovel-tabela//tbody//tr//td[contains(@class, "logradouro")]'
      ),
      logradouroDoImovel
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

/**
 * checa se a equipe foi corretamente vinculada à atividade
 * @param nomeDaEquipe
 */
export async function assertEquipeVinculada(nomeDaEquipe: string) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/atividades/editar`);

  const vinculos: Array<{ nome: string; cargo: string }> = await element
    .all(By.xpath('//app-atividade-vinculo-tabela//tbody//tr'))
    .map(row => {
      return {
        nome: row
          ?.element(By.xpath('td[contains(@class, "vinculo")]'))
          .getText(),
        cargo: row
          ?.element(By.xpath('td[contains(@class, "cdk-column-agente")]//input'))
          .getAttribute('aria-checked')
          .then((val: string) => val === 'true')
          .then((equal: boolean) => (equal ? 'agente' : 'supervisor')),
      };
    });
  await browser.executeScript('window.open()');
  const handles = await browser.getAllWindowHandles();
  await browser.switchTo().window(handles[1]);
  await browser.get(`${baseUrl}`);
  await new HomePage().acessar('equipes');
  const ok = await assertEquipePossui(nomeDaEquipe, vinculos);
  await browser.close();
  await browser.switchTo().window(handles[0]);
  return ok;
}