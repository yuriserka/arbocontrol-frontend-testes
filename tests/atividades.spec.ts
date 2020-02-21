const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { AtividadesPage } from '../src/pages/atividades.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { makeUsuario } from '../src/models/usuario';
import { makeAtividade, Atividade } from '../src/models/atividade';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const atividadesPage = new AtividadesPage();
let atividade: Atividade;

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
    atividade = makeAtividade(dataTable.hashes()[0], [], [], []);
    await atividadesPage.cadastroBasico(atividade);
    expect(await browser.driver.getCurrentUrl()).include(
      'http://localhost/atividades/editar/'
    );
  }
);

// Then('irei atribuir os imoveis', async (dataTable: TableDefinition) => {
//   await atividadesPage['atrbuirImoveis'](dataTable.hashes());
// });

// Then('irei atribuir as equipes', async (dataTable: TableDefinition) => {
//   await atividadesPage['atribuirEquipes'](dataTable.hashes());
// });
