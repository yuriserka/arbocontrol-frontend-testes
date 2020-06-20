import { baseUrl } from '../../../src/common';
import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { By } from 'protractor';
import {
  ControleRecurso,
  ControleFormulario,
} from '../../../src/models/perfil_usuario';

export async function assertPerfilExiste(nome: string) {
  await SmartWaiter.waitUrl(`${baseUrl}/perfis-usuarios`);
  const ok = true;
  try {
    await getNodeWithText(
      By.xpath(
        '//app-perfil-usuario-listar//tbody//tr/td[contains(@class, "nome")]'
      ),
      nome
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}

export async function assertRecursoVinculado(recurso: ControleRecurso) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/perfis-usuarios/editar`);
  const ok = true;
  try {
    const recursoRow = await getNodeWithText(
      By.xpath('//app-perfil-usuario-recurso-autoridade-tabela//tbody//tr'),
      recurso.recurso,
      By.xpath('./td[contains(@class, "recurso")]')
    );
    const autoridade = await recursoRow
      .element(By.xpath('./td[contains(@class, "autoridade")]'))
      .getText();

    if (recurso.autoridade !== autoridade.toUpperCase()) {
      return !ok;
    }
  } catch (err) {
    return !ok;
  }
  return ok;
}

export async function assertFormularioVinculado(
  formulario: ControleFormulario
) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/perfis-usuarios/editar`);
  const ok = true;
  try {
    const recursoRow = await getNodeWithText(
      By.xpath('//app-perfil-usuario-formulario-listar//tbody//tr'),
      formulario.formulario,
      By.xpath('./td[contains(@class, "formulario")]')
    );
    const autoridade = await recursoRow
      .element(By.xpath('./td[contains(@class, "autoridade")]'))
      .getText();

    if (formulario.autoridade !== autoridade.toUpperCase()) {
      return !ok;
    }
  } catch (err) {
    return !ok;
  }
  return ok;
}
