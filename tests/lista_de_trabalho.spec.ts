const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser, element, By } from 'protractor';
import { LoginPage } from '../src/pages/login.po';
import { ListaDeTrabalhoPage } from '../src/pages/lista_de_trabalho.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { makeUsuario } from '../src/models/usuario';
import { makeRegistroDeCampo } from '../src/models/registro_campo';
import { makeRegistroDeLaboratorio } from '../src/models/registro_laboratorio';
import { makeAmostra } from '../src/models/amostra';
import { assertRegistroInserido } from '../src/helpers/asserts/lista_de_trabalho';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();

let atividade: string;
let qtdRegistrosAntes: number;

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await loginPage.login(user);
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
  async (dataTable: TableDefinition) => {
    qtdRegistrosAntes = await element
      .all(By.xpath('//app-registro-atividade-tabela//tbody//tr'))
      .count();

    await element(By.xpath('//button[@color="primary"]')).click();
    const registroDeCampo = makeRegistroDeCampo(dataTable.hashes()[0]);
    await listaDeTrabalhoPage['preencherCamposDeDados'](registroDeCampo);
  }
);

Then('selecionarei a aba de registros de laboratório', async () => {
  await listaDeTrabalhoPage['selecionarAbaRegistroDeLaboratorio']();
});

Then(
  'irei cadastrar um registro de laboratório com os valores',
  async (dataTable: TableDefinition) => {
    qtdRegistrosAntes = await element
      .all(By.xpath('//app-registro-atividade-tabela//tbody//tr'))
      .count();

    await element(By.xpath('//button[@color="primary"]')).click();
    const registroDeLab = makeRegistroDeLaboratorio(dataTable.hashes()[0]);
    await listaDeTrabalhoPage['preencherCamposDeDados'](registroDeLab);
  }
);

Then('Adicionar as seguintes amostras', async (dataTable: TableDefinition) => {
  const amostras = dataTable.hashes().map(a => makeAmostra(a));
  await listaDeTrabalhoPage['preencherAmostras'](amostras);
});

Then('salvar', async () => {
  await listaDeTrabalhoPage['salvar']();
  expect(await browser.getCurrentUrl()).to.be.equal(
    `${baseUrl}/registros/${atividade}`
  );
  expect(await assertRegistroInserido(qtdRegistrosAntes)).to.be.equal(true);
});
