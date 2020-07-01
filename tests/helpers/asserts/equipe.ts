import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { By } from 'protractor';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { baseUrl } from '../../../src/common';
import { EquipesPage } from '../../../src/pages/rede_de_saude/equipes.po';

const equipesPage = new EquipesPage();

/**
 * verifica se a equipe passada foi criada, ou seja, checando se a mesma
 * consta na tabela na página de gerenciamento de equipes
 * @param nomeDaEquipe
 */
export async function assertEquipeExiste(nomeDaEquipe: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/equipes`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath('//app-equipe-tabela//tbody//tr/td[contains(@class, "nome")]'),
      nomeDaEquipe
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

/**
 * verifica se a equipe possui a lista de usuarios a partir da página de
 * gerenciamento de equipes
 * @param nomeDaEquipe
 * @param usuarios
 */
export async function assertEquipePossui(
  nomeDaEquipe: string,
  usuarios: Array<{ [key: string]: string }>
) {
  await equipesPage['selecionarEquipe'](nomeDaEquipe);
  await SmartWaiter.waitUrlContain(`${baseUrl}/equipes/editar`);
  const ok = true;
  for (let i = 0; i < usuarios.length; ++i) {
    const usuarioInfo = usuarios[i];
    try {
      const userRow = await equipesPage['getUsuarioRow'](usuarioInfo['nome']);
      const ariaChecked = await userRow
        .element(
          By.xpath(
            `./td[contains(@class, "cdk-column-${usuarioInfo['cargo']}")]//input`
          )
        )
        .getAttribute('aria-checked');
      if (ariaChecked !== 'true') {
        return !ok;
      }
    } catch (err) {
      return !ok;
    }
  }
  return ok;
}
