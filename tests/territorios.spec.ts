const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { makeUsuario } from '../src/models/usuario';
import { makeTerritorio, Territorio } from '../src/models/territorio';
import { login, getTestPage, timeout } from './helpers/common';
import { TerritoriosPage } from '../src/pages/territorios.po';
import { assertTerritorioExiste } from './helpers/asserts/territorio';

setDefaultTimeout(timeout);
const territorioPage = new TerritoriosPage();
let territorio: Territorio;

BeforeAll(async () => {
  await getTestPage();
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
});

When('eu acessar a pagina dos territorios', async () => {
  await territorioPage.get();
});

Then('eu vou cadastrar o territorio', async (dataTable: TableDefinition) => {
  territorio = makeTerritorio(dataTable.hashes()[0]);
  await territorioPage.cadastrarTerritorio(territorio);
  expect(await browser.driver.getCurrentUrl()).to.be.equal(
    `${baseUrl}/territorios`
  );
  expect(await assertTerritorioExiste(territorio.nome)).to.be.equal(true);
});

Then(
  'eu vou excluir o territorio que possui nome igual a {string}',
  async (nome: string) => {
    await territorioPage.exluirTerritorio(nome);
    expect(await assertTerritorioExiste(territorio.nome)).to.be.equal(false);
  }
);
