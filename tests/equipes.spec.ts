import { setDefaultTimeout, Then, When } from 'cucumber';
import { TableDefinition } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { baseUrl } from '../src/common';
import { EquipesPage } from '../src/pages/rede_de_saude/equipes.po';
import {
  assertEquipeExiste,
  assertEquipePossui,
} from './helpers/asserts/equipe';
import { timeout } from './helpers/common';

setDefaultTimeout(timeout);
const equipePage = new EquipesPage();

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
