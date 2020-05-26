import { setDefaultTimeout, Then } from 'cucumber';
import { expect } from 'chai';
import { TableDefinition, When } from 'cucumber';
import { RelatoriosPage } from '../src/pages/relatorios.po';
import { Relatorio, makeRelatorio } from '../src/models/relatorio';
import { timeout } from './helpers/common';
import {
  assertRelatorioExiste,
  assertRelatorioPossuiQuantidadeCorretaDeRegistros,
} from './helpers/asserts/relatorio';

setDefaultTimeout(timeout);

const relatorioPage = new RelatoriosPage();
let relatorio: Relatorio;

When('eu acessar a pagina dos relatorios', async () => {
  await relatorioPage.get();
});

Then(
  'eu vou cadastrar o relatorio para o formulario: {string} tendo como base os registros da atividade do tipo {string}',
  async (
    formularioAlvo: string,
    siglaAtividade: string,
    dataTable: TableDefinition
  ) => {
    relatorio = makeRelatorio(dataTable.hashes()[0]);
    await relatorioPage.cadastrarRelatorio(relatorio, formularioAlvo);
    expect(await assertRelatorioExiste(relatorio.titulo)).to.be.equal(true);
    expect(
      await assertRelatorioPossuiQuantidadeCorretaDeRegistros(
        relatorio,
        siglaAtividade
      )
    ).to.be.equal(true);
  }
);

Then(
  'eu vou excluir o relatorio {string} do formulario {string}',
  async (titulo: string, nomeFormulario: string) => {
    await relatorioPage.excluirRelatorio(titulo, nomeFormulario);
  }
);
