/**
 * @fileoverview
 */

const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../pages/login.po';
import { ImovelPage } from '../pages/imovel.po';
import { TableDefinition } from 'cucumber';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const imovelPage = new ImovelPage();

BeforeAll(async () => {
  await browser.get('http://localhost/');
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha);
});

When('eu acessar a pagina dos imoveis', async () => {
  await imovelPage.get();
});

Then('eu vou cadastrar o imovel', async (dataTable: TableDefinition) => {
  const imovel = dataTable.hashes()[0];
  await imovelPage.cadastrarImovel(imovel);
  expect(await browser.driver.getCurrentUrl()).to.be.equal(
    'http://localhost/imoveis'
  );
});
