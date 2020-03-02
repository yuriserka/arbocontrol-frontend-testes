const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { AtividadesPage } from '../src/pages/atividades.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { makeUsuario } from '../src/models/usuario';
import { Atividade } from '../src/models/atividade';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const atividadesPage = new AtividadesPage();
const atividade = new Atividade();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await loginPage.login(user);
});

When('eu acessar a pagina de atividades', async () => {
  await atividadesPage.get();
});

Then(
  'eu vou cadastrar uma atividade com os dados básicos',
  async (dataTable: TableDefinition) => {
    atividade.dadosBasicosData = dataTable.hashes()[0];
    await atividadesPage.cadastroBasico(atividade);
    expect(await browser.driver.getCurrentUrl()).include(
      'http://localhost/atividades/editar/'
    );
  }
);

Then('irei atribuir as demandas', async (dataTable: TableDefinition) => {
  atividade.demandasData = dataTable.hashes();
  await atividadesPage.atribuirDemandas(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );
});

Then('irei atribuir os imoveis', async (dataTable: TableDefinition) => {
  atividade.imoveisData = dataTable.hashes();
  await atividadesPage.atribuirImoveis(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );
});

Then('irei atribuir as equipes', async (dataTable: TableDefinition) => {
  atividade.equipesData = dataTable.hashes();
  await atividadesPage.atribuirEquipes(atividade);
  expect(await browser.driver.getCurrentUrl()).include(
    'http://localhost/atividades/editar/'
  );
});
