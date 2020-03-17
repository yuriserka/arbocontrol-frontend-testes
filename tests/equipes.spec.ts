const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { TableDefinition } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { baseUrl } from '../config';
import { EquipesPage } from '../src/pages/equipes.po';
import { LoginPage } from '../src/pages/login.po';
import {
  assertEquipeExiste,
  assertEquipePossui,
} from '../src/helpers/asserts/equipes';
import { makeUsuario } from '../src/models/usuario';

setDefaultTimeout(60 * 1000);
const equipePage = new EquipesPage();
const loginPage = new LoginPage();

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

Then('eu vou cadastrar a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage['criarEquipe'](nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);

  expect(await assertEquipeExiste(nomeDaEquipe)).to.be.equal(true);
});

Then(
  'adicionar os usuarios a equipe {string}',
  async (nomeDaEquipe: string, dataTable: TableDefinition) => {
    const usuarios = dataTable.hashes();
    await equipePage.vincularUsuarios(nomeDaEquipe, usuarios);

    expect(await assertEquipePossui(nomeDaEquipe, usuarios)).to.be.equal(true);
  }
);

Then('eu vou excluir a equipe {string}', async (nomeDaEquipe: string) => {
  await equipePage.excluirEquipe(nomeDaEquipe);
  expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);

  expect(await assertEquipeExiste(nomeDaEquipe)).to.be.equal(false);
});

Then(
  'eu irei desvincular os usuarios da equipe {string}',
  async (nomeDaEquipe: string, dataTable: TableDefinition) => {
    await equipePage.desvincularUsuarios(
      nomeDaEquipe,
      dataTable.hashes().map(usuario => usuario.nome)
    );
    expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/equipes`);

    expect(
      await assertEquipePossui(nomeDaEquipe, dataTable.hashes())
    ).to.be.equal(false);
  }
);
