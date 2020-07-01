import { setDefaultTimeout, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser, element } from 'protractor';
import { TableDefinition } from 'cucumber';
import { AtividadesPage } from '../src/pages/atividades.po';
import {
  assertDemandaVinculada,
  assertImovelVinculado,
  assertEquipeVinculada,
  assertAtividadeExiste,
} from './helpers/asserts/atividade';
import { Atividade } from '../src/models/atividade';
import { timeout } from './helpers/common';
import { baseUrl } from '../src/common';

setDefaultTimeout(timeout);

const atividadesPage = new AtividadesPage();
const atividade = new Atividade();

When('eu acessar a pagina de atividades', async () => {
  await atividadesPage.get();
});

Then(
  'eu vou cadastrar uma atividade com os dados básicos',
  async (dataTable: TableDefinition) => {
    atividade.setDadosBasicos(dataTable.hashes()[0]);
    await element(atividadesPage['botoes_']['cadastrar']).click();
    await atividadesPage['cadastroBasico'](atividade.dadosBasicos);
    await atividadesPage['salvar']();
    expect(await browser.driver.getCurrentUrl()).include(
      `${baseUrl}/atividades`
    );
  }
);

Then('irei atribuir as demandas', async (dataTable: TableDefinition) => {
  atividade.setDemandas(dataTable.hashes());
  await atividadesPage.atribuirDemandas(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    `${baseUrl}/atividades/editar`
  );

  for (let i = 0; i < atividade.demandas.length; ++i) {
    const demanda = atividade.demandas[i];
    expect(await assertDemandaVinculada(demanda)).to.be.equal(true);
  }
});

Then('irei atribuir os imoveis', async (dataTable: TableDefinition) => {
  atividade.setImoveis(dataTable.hashes());
  await atividadesPage.atribuirImoveis(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    `${baseUrl}/atividades/editar`
  );

  for (let i = 0; i < atividade.imoveis.length; ++i) {
    const imovel = atividade.imoveis[i];
    expect(await assertImovelVinculado(imovel)).to.be.equal(true);
  }
});

Then('irei atribuir as equipes', async (dataTable: TableDefinition) => {
  atividade.setEquipes(dataTable.hashes());
  await atividadesPage.atribuirEquipes(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    `${baseUrl}/atividades/editar`
  );

  for (let i = 0; i < atividade.equipes.length; ++i) {
    const equipe = atividade.equipes[i];
    expect(await assertEquipeVinculada(equipe)).to.be.equal(true);
  }
});

Then('irei salvar a atividade', async () => {
  await atividadesPage['salvar']();
  expect(
    await assertAtividadeExiste(atividade.dadosBasicos.titulo)
  ).to.be.equal(true);
});

Then('eu vou excluir a atividade {string}', async (titulo: string) => {
  await atividadesPage.excluirAtividade(titulo);
  expect(
    await assertAtividadeExiste(atividade.dadosBasicos.titulo)
  ).to.be.equal(false);
});
