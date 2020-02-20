const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { AtividadesPage } from '../src/pages/atividades.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { SmartWaiter } from '../src/helpers/smart_waiter';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const atividadesPage = new AtividadesPage();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha, user.unidade);
  console.log('entrou?');
});

When('eu acessar a pagina de atividades', async () => {
  await atividadesPage.get();
});

Then(
  'eu vou cadastrar uma atividade com os dados básicos',
  async (dataTable: TableDefinition) => {
    const dadosBasicos = dataTable.hashes()[0];
    await atividadesPage.cadastroBasico(dadosBasicos);
    expect(await browser.driver.getCurrentUrl()).include('http://localhost/atividades/editar/')
  }
);
