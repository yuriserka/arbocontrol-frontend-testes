const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { EquipesPage } from '../src/pages/equipes.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { assertEquipeExiste } from '../src/helpers/asserts/equipes';
import { makeUsuario } from '../src/models/usuario';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const equipePage = new EquipesPage();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await loginPage.login(user);
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
    expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);
  }
);

Then('eu vou cadastrar a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.criarEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);
  expect(await assertEquipeExiste(nomeDaEquipe)).to.be.equal(true);
});

Then(
  'adicionar os usuarios a equipe {string}',
  async (nomeDaEquipe: string, dataTable: TableDefinition) => {
    await equipePage.vincularUsuarios(nomeDaEquipe, dataTable.hashes());
  }
);

Then('eu vou excluiur a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.excluirEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);
});
