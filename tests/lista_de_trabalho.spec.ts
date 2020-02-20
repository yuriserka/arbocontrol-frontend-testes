const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser, element, By } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { ListaDeTrabalhoPage } from '../src/pages/lista_de_trabalho.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();

let atividade: string;

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha, user.unidade);
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

Then('selecionar o imovel {string}', async (logradouro: string) => {
  await listaDeTrabalhoPage['selecionarImovel'](logradouro);
  expect(await browser.getCurrentUrl()).to.be.equal(
    `${baseUrl}/registros/${atividade}`
  );
});

Then(
  'irei cadastrar um registro de campo com os valores',
  async (registro: TableDefinition) => {
    await element(By.xpath('//button[@color="primary"]')).click();
    await listaDeTrabalhoPage['preencherCamposDeDados'](registro.hashes()[0]);
  }
);

Then('selecionarei a aba {string}', async (nome: string) => {
  await listaDeTrabalhoPage['selecionarAba'](nome);
});

Then(
  'irei cadastrar um registro de laboratório com os valores',
  async (registro: TableDefinition) => {
    await element(By.xpath('//button[@color="primary"]')).click();
    await listaDeTrabalhoPage['preencherCamposDeDados'](registro.hashes()[0]);
  }
);

Then('Adicionar as seguintes amostras', async (amostras: TableDefinition) => {
  await listaDeTrabalhoPage['preencherAmostras'](amostras.hashes());
});

Then('salvar', async () => {
  await listaDeTrabalhoPage['salvar']();
  expect(await browser.getCurrentUrl()).to.be.equal(
    `${baseUrl}/registros/${atividade}`
  );
});
