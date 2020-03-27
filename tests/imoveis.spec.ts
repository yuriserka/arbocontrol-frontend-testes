const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { ImoveisPage } from '../src/pages/imoveis.po';
import { assertImovelExiste } from './helpers/asserts/imovel';
import { makeUsuario } from '../src/models/usuario';
import { makeImovel } from '../src/models/imovel';
import {
  login,
  getTestPage,
  timeout,
  criarTerritorio,
  deletarTerritorio,
} from './helpers/common';
import { Territorio, makeTerritorio } from '../src/models/territorio';

setDefaultTimeout(timeout);
const imovelPage = new ImoveisPage();
let territorio: Territorio;

BeforeAll(async () => {
  await getTestPage();
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
});

Given('que cadastrei o territorio', async (dataTable: TableDefinition) => {
  territorio = makeTerritorio(dataTable.hashes()[0]);
  await criarTerritorio(territorio);
});

When('eu acessar a pagina dos imoveis', async () => {
  await imovelPage.get();
});

Then(
  'eu vou cadastrar o imovel no territorio criado',
  async (dataTable: TableDefinition) => {
    const imovel = makeImovel(dataTable.hashes()[0], {
      território: territorio.nome,
    });
    await imovelPage.cadastrarImovel(imovel);
    expect(await browser.driver.getCurrentUrl()).to.be.equal(
      `${baseUrl}/imoveis`
    );

    expect(await assertImovelExiste(imovel.logradouro)).to.be.equal(true);
  }
);

Then(
  'eu vou excluir o imovel que possui logradouro igual a {string}',
  async (logradouro: string) => {
    await imovelPage.excluirImovel(logradouro);
    expect(await assertImovelExiste(logradouro)).to.be.equal(false);
  }
);

Then('irei excluir as dependencias', async () => {
  await deletarTerritorio(territorio);
});
