const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser, element, By } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { ListaDeTrabalhoPage } from '../src/pages/lista_de_trabalho.po';
import { assertRegistroInserido } from './helpers/asserts/lista_de_trabalho';
import { makeUsuario } from '../src/models/usuario';
import { timeout, getTestPage, login } from './helpers/common';

setDefaultTimeout(timeout);
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();

let atividade: string;
let qtdRegistrosAntes: number;
const idRegistros: Array<{ id: string; qtd_reg: number }> = [];

BeforeAll(async () => {
  await getTestPage();
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
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

Then('selecionar o formulario {string}', async (nomeDoFormulario: string) => {
  await listaDeTrabalhoPage['selecionarFormulario'](nomeDoFormulario);
});

Then(
  'irei cadastrar registros com os valores',
  async (dataTable: TableDefinition) => {
    const registros = dataTable.hashes();
    for (let i = 0; i < registros.length; ++i) {
      qtdRegistrosAntes = await element
        .all(By.xpath('//app-registro-atividade-tabela//tbody//tr'))
        .count();

      // cadastra o registro
      await element(By.xpath('//button[@color="primary"]')).click();
      await listaDeTrabalhoPage['preencherCamposDeDados'](registros[i]);
      await listaDeTrabalhoPage['salvar']();

      // verifica se foi inserido
      expect(await browser.getCurrentUrl()).to.be.equal(
        `${baseUrl}/registros/${atividade}`
      );
      expect(await assertRegistroInserido(qtdRegistrosAntes)).to.be.equal(true);

      // caso seja para inserir as amostras, guarda os ids para acessar novamente
      if (registros[i]['quantidade_de_amostras']) {
        idRegistros.push({
          id: await element(
            // sempre que um novo registro é inserido ele vai para o topo
            By.xpath(
              '(//app-registro-atividade-tabela//tbody//tr//td[contains(@class, "id")]//span)[1]'
            )
          ).getText(),
          qtd_reg: +registros[i]['quantidade_de_amostras'],
        });
      }
    }
  }
);

Then('Adicionar as seguintes amostras', async (dataTable: TableDefinition) => {
  const amostras = dataTable.hashes();
  for (
    let i = 0, amostraIBegin = 0;
    i < idRegistros.length;
    amostraIBegin += idRegistros[i].qtd_reg, ++i
  ) {
    const iterators = {
      beg: amostraIBegin,
      end: amostraIBegin + idRegistros[i].qtd_reg,
    };

    await listaDeTrabalhoPage['selecionarRegistro'](idRegistros[i].id);
    await listaDeTrabalhoPage['preencherAmostras'](
      amostras.slice(iterators.beg, iterators.end)
    );
    await listaDeTrabalhoPage['salvar']();
  }
});
