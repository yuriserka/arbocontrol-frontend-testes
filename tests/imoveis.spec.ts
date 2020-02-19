const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { ImovelPage } from '../src/pages/imoveis.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const imovelPage = new ImovelPage();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha, user.unidade);
});

When('eu acessar a pagina dos imoveis', async () => {
  await imovelPage.get();
});

Then('eu vou cadastrar o imovel', async (dataTable: TableDefinition) => {
  const imovel = dataTable.hashes()[0];
  await imovelPage.cadastrarImovel(imovel);
  expect(await browser.driver.getCurrentUrl()).to.be.equal(
    `${baseUrl}/imoveis`
  );
});
