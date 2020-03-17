const {
  Given,
  BeforeAll,
  setDefaultTimeout,
  Then,
  When,
  AfterAll,
} = require('cucumber');
import { expect } from 'chai';
import { browser, element } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { AtividadesPage } from '../src/pages/atividades.po';
import { EquipesPage } from '../src/pages/equipes.po';
import { ImovelPage } from '../src/pages/imoveis.po';
import { LoginPage } from '../src/pages/login.po';
import {
  assertDemandaVinculada,
  assertImovelVinculado,
  assertEquipeVinculada,
  assertAtividadeExiste,
} from '../src/helpers/asserts/atividade';
import { Atividade } from '../src/models/atividade';
import { makeUsuario } from '../src/models/usuario';
import { makeImovel, Imovel } from '../src/models/imovel';

setDefaultTimeout(60 * 1000);
const atividadesPage = new AtividadesPage();
const equipePage = new EquipesPage();
const imovelPage = new ImovelPage();
const loginPage = new LoginPage();

const atividade = new Atividade();
let imovel: Imovel;
let nomeDaEquipe: string;

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await loginPage.login(user);
});

Given('que cadastrei o imovel', async (dataTable: TableDefinition) => {
  await imovelPage.get();
  imovel = makeImovel(dataTable.hashes()[0]);
  await imovelPage.cadastrarImovel(imovel);
  await browser.sleep(1000);
});

Given(
  'que cadastrei a equipe {string} com os usuarios',
  async (nomeEquipe: string, dataTable: TableDefinition) => {
    await equipePage.get();
    await equipePage.cadastrarEquipe(nomeEquipe, dataTable.hashes());
    nomeDaEquipe = nomeEquipe;
    await browser.sleep(1000);
  }
);

When('eu acessar a pagina de atividades', async () => {
  await atividadesPage.get();
});

Then(
  'eu vou cadastrar uma atividade com os dados básicos',
  async (dataTable: TableDefinition) => {
    atividade.dadosBasicosData = dataTable.hashes()[0];
    await element(atividadesPage['botoes_']['cadastrar']).click();
    await atividadesPage['cadastroBasico'](atividade.dadosBasicos);
    await atividadesPage['salvar']();
    expect(await browser.driver.getCurrentUrl()).include(
      'http://localhost/atividades/'
    );
  }
);

Then('irei atribuir as demandas', async (dataTable: TableDefinition) => {
  atividade.demandasData = dataTable.hashes();
  await atividadesPage.atribuirDemandas(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );

  for (let i = 0; i < atividade.demandas.length; ++i) {
    const demanda = atividade.demandas[i];
    expect(await assertDemandaVinculada(demanda)).to.be.equal(true);
  }
});

Then('irei atribuir os imoveis', async (dataTable: TableDefinition) => {
  atividade.imoveisData = dataTable.hashes();
  await atividadesPage.atribuirImoveis(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );

  for (let i = 0; i < atividade.imoveis.length; ++i) {
    const imovel = atividade.imoveis[i];
    expect(await assertImovelVinculado(imovel)).to.be.equal(true);
  }
});

Then('irei atribuir as equipes', async (dataTable: TableDefinition) => {
  atividade.equipesData = dataTable.hashes();
  await atividadesPage.atribuirEquipes(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );

  for (let i = 0; i < atividade.equipes.length; ++i) {
    const equipe = atividade.equipes[i];
    expect(await assertEquipeVinculada(equipe)).to.be.equal(true);
  }
});

Then('irei salvar', async () => {
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

// AfterAll(async () => {
//   await imovelPage.get();
//   await imovelPage.exluirImovel(imovel.logradouro);

//   await equipePage.get();
//   await equipePage.excluirEquipe(nomeDaEquipe);
// });
