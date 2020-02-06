/**
 * @fileoverview
 */

const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { LoginPage } from '../pages/login.po';
import { ListaDeTrabalhoPage } from '../pages/lista_de_trabalho.po';
import { TableDefinition } from 'cucumber';
import { SmartWaiter } from '../helpers/smart_waiter';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();

let atividade: string;
let imovel: string;

BeforeAll(async () => {
  await browser.get('http://localhost/');
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha);
});

When('eu acessar a pagina da lista de trabalho', async () => {
  await listaDeTrabalhoPage.get();
});

Then(
  'eu vou selecionar a atividade {string}',
  async (numeroAtividade: string) => {
    await listaDeTrabalhoPage['selecionarAtividade'](numeroAtividade);
    atividade = numeroAtividade;
    await browser.sleep(1000);
  }
);

Then('selecionar o imovel {string}', async (codigoImovel: string) => {
  await listaDeTrabalhoPage['selecionarImovel'](codigoImovel);
  expect(await browser.getCurrentUrl()).to.be.equal(
    `http://localhost/registros-atividades/listar/${atividade}/${codigoImovel}`
  );
  imovel = codigoImovel;
});

Then(
  'irei cadastrar um registro com os valores',
  async (registro: TableDefinition) => {
    await listaDeTrabalhoPage['preencherRegistro'](registro.hashes()[0]);
    const url = `http://localhost/registros-atividades/listar/${atividade}/${imovel}`;
    await SmartWaiter.waitUrl(url);
    expect(await browser.getCurrentUrl()).to.be.equal(url);
  }
);
