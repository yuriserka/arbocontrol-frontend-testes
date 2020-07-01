import { SmartWaiter } from '../../../src/helpers/smart_waiter';
import { baseUrl } from '../../../src/common';
import { getNodeWithText } from '../../../src/helpers/selectors';
import { By } from 'protractor';
import { TiposDeAtividadesPage } from '../../../src/pages/tabelas_basicas/tipos_de_atividade.po';

const tiposAtividadePage = new TiposDeAtividadesPage();

/**
 * checa se as atividades do tipo passando possuem um relatorio especifico
 * @param tipo 
 * @param nomeFormulario 
 */
export async function assertTipoDeAtividadePossuiFormulario(
  tipo: string,
  nomeFormulario: string
) {
  await SmartWaiter.waitUrlContain(`${baseUrl}/tipos-atividades/editar`);
  const ok = true;
  try {
    await tiposAtividadePage.selecionarTipo(tipo);
    await tiposAtividadePage['selecionarAba']('Formulários');

    await getNodeWithText(
      By.xpath('//app-tipo-atividade-formulario-tabela//tbody//tr'),
      nomeFormulario,
      By.xpath('./td[contains(@class, "titulo")]')
    );
  } catch (err) {
    return !ok;
  }
  return ok;
}
