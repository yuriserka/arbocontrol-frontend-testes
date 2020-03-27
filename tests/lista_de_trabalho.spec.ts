const { Given, BeforeAll, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser, element, By } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { ListaDeTrabalhoPage } from '../src/pages/lista_de_trabalho.po';
import { assertRegistroInserido } from './helpers/asserts/lista_de_trabalho';
import { makeUsuario } from '../src/models/usuario';
import {
  timeout,
  getTestPage,
  login,
  criarImovel,
  criarEquipe,
  criarAtividade,
  deletarEquipe,
  deletarImovel,
  deletarAtividadePorTitulo,
  criarTerritorio,
  deletarTerritorio,
} from './helpers/common';
import { Imovel, makeImovel } from '../src/models/imovel';
import { Atividade } from '../src/models/atividade';
import { getNodeWithText } from '../src/helpers/selectors';
import { Territorio, makeTerritorio } from '../src/models/territorio';

setDefaultTimeout(timeout);
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();

const atividadesCadastradas: {
  [sigla: string]: {
    titulo: string;
    id: string;
  };
} = {};
let atividadeAtual: string;
let qtdRegistrosAntes: number;
const idRegistros: Array<{ id: string; qtd_reg: number }> = [];
let territorio: Territorio;
let imovel: Imovel;
let nomeDaEquipe: string;

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

Given(
  'que cadastrei o imovel no territorio cadastrado',
  async (dataTable: TableDefinition) => {
    imovel = makeImovel(dataTable.hashes()[0], {
      território: territorio.nome,
    });
    await criarImovel(imovel);
  }
);

Given(
  'que cadastrei a equipe {string} com os usuarios',
  async (nomeEquipe: string, dataTable: TableDefinition) => {
    const usuarios = dataTable.hashes();
    await criarEquipe(nomeEquipe, usuarios);
    nomeDaEquipe = nomeEquipe;
  }
);

Given(
  'que cadastrei uma atividade do tipo {string} com o imovel e a equipe criados',
  async (tipo: string, dataTable: TableDefinition) => {
    const tipoAtividadeSigla = tipo
      .substr(0, tipo.indexOf(' -'))
      .replace(/\s/g, '_');
    const atividade = new Atividade();

    atividade.dadosBasicosData = {
      ...dataTable.hashes()[0],
      titulo: `${dataTable.hashes()[0].titulo}${tipoAtividadeSigla}`,
      tipo_de_atividade: tipo,
    };
    atividade.equipesData = [nomeDaEquipe].map(n => {
      return { nome: n };
    });
    atividade.imoveisData = [imovel].map(i => {
      return { logradouro: i.logradouro };
    });

    await criarAtividade(atividade);

    const atividadeRow = await getNodeWithText(
      By.xpath('//app-atividade-tabela//tbody//tr'),
      atividade.dadosBasicos.titulo,
      By.xpath('./td[contains(@class, "titulo")]/span')
    );

    atividadesCadastradas[tipoAtividadeSigla] = {
      titulo: atividade.dadosBasicos.titulo,
      id: await atividadeRow
        .element(By.xpath('./td[contains(@class, "column-id")]/span'))
        .getText(),
    };
  }
);

When('eu acessar a pagina da lista de trabalho', async () => {
  await listaDeTrabalhoPage.get();
});

Then(
  'eu vou selecionar a atividade do tipo {string}',
  async (sigla: string) => {
    atividadeAtual = atividadesCadastradas[sigla].id;
    await listaDeTrabalhoPage['selecionarAtividade'](atividadeAtual);
    await browser.sleep(1000);
  }
);

Then('selecionar o imovel {string}', async (logradouro: string) => {
  await listaDeTrabalhoPage['selecionarImovel'](logradouro);
  expect(await browser.getCurrentUrl()).to.be.equal(
    `${baseUrl}/registros/${atividadeAtual}`
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
        `${baseUrl}/registros/${atividadeAtual}`
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

Then(
  'irei excluir os registros da atividade do tipo {string} do formulario {string}',
  async (sigla: string, form: string) => {
    await listaDeTrabalhoPage.excluirRegistros(
      atividadesCadastradas[sigla].id,
      form
    );
  }
);

Then('irei excluir as dependencias', async () => {
  const keys = Object.keys(atividadesCadastradas);
  for (let i = 0; i < keys.length; ++i) {
    await deletarAtividadePorTitulo(atividadesCadastradas[keys[i]].titulo);
  }
  await deletarImovel(imovel);
  await deletarEquipe(nomeDaEquipe);
  await deletarTerritorio(territorio);
});
