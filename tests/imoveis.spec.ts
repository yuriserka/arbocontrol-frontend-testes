const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { ImoveisPage } from '../src/pages/imoveis.po';
import { assertImovelExiste } from './helpers/asserts/imovel';
import { makeUsuario } from '../src/models/usuario';
import { makeImovel } from '../src/models/imovel';
import { login, getTestPage, timeout } from './helpers/common';

setDefaultTimeout(timeout);
const imovelPage = new ImoveisPage();

BeforeAll(async () => {
  await getTestPage();
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
});

When('eu acessar a pagina dos imoveis', async () => {
  await imovelPage.get();
});

Then('eu vou cadastrar o imovel', async (dataTable: TableDefinition) => {
  const imovel = makeImovel(dataTable.hashes()[0]);
  await imovelPage.cadastrarImovel(imovel);
  expect(await browser.driver.getCurrentUrl()).to.be.equal(
    `${baseUrl}/imoveis`
  );

  expect(await assertImovelExiste(imovel.logradouro)).to.be.equal(true);
});

Then(
  'eu vou excluir o imovel que possui logradouro igual a {string}',
  async (logradouro: string) => {
    await imovelPage.exluirImovel(logradouro);

    expect(await assertImovelExiste(logradouro)).to.be.equal(false);
  }
);
