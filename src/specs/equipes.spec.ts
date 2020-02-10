/**
 * @fileoverview
 */

const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../pages/login.po';
import { EquipesPage } from '../pages/equipes.po';
import { TableDefinition } from 'cucumber';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const equipePage = new EquipesPage();

BeforeAll(async () => {
  await browser.get('http://localhost/');
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha, user.unidade);
});

When('eu acessar a pagina das equipes', async () => {
  await equipePage.get();
});

Then(
  'eu irei desvincular os usuarios da equipe {string}',
  async (nomeDaEquipe: string, dataTable: TableDefinition) => {
    await equipePage.desvincularUsuarios(
      nomeDaEquipe,
      dataTable.hashes().map(usuario => usuario.nome)
    );
    expect(await browser.getCurrentUrl()).to.be.equal(
      'http://localhost/equipes'
    );
  }
);

Then('eu vou cadastrar a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.criarEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/equipes');
});

Then(
  'adicionar os usuarios a equipe {string}',
  async (nomeDaEquipe: string, dataTable: TableDefinition) => {
    await equipePage.vincularUsuarios(nomeDaEquipe, dataTable.hashes());
  }
);

Then('eu vou excluiur a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.excluirEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/equipes');
});
