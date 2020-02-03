/**
 * @fileoverview
 */

const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../pages/login.po';
import { EquipesPage } from '../pages/equipes.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const equipePage = new EquipesPage();

BeforeAll(async () => {
  await browser.get('http://localhost/');
});

Given(
  'que estou logado com',
  async (dataTable: any) => {
    const user = dataTable.hashes()[0];
    await loginPage.login(user.cpf, user.senha);
  }
);

When('eu acessar a pagina das equipes', async () => {
  await equipePage.get();
});

Then('eu vou cadastrar a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.criarEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/equipes');
});

Then('adicionar os usuarios a equipe {string}', async (nomeDaEquipe: string, dataTable: any) => {
  await equipePage.adicionarPessoas(nomeDaEquipe, dataTable.hashes());
});
