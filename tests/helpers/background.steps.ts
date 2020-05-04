import { Given, TableDefinition } from 'cucumber';
import { makeUsuario, Usuario } from '../../src/models/usuario';
import { makeTerritorio, Territorio } from '../../src/models/territorio';
import {
  login,
  criarEquipe,
  criarImovel,
  criarTerritorio,
  criarAtividade,
  criarPerfilDeUsuario,
  permitirEdicaoDeNovasAtividades,
  adicionarFormularioAoTipoDeAtividade,
} from './common';
import { Imovel, makeImovel } from '../../src/models/imovel';
import { assertTerritorioExiste } from './asserts/territorio';
import { expect } from 'chai';
import { assertImovelExiste } from './asserts/imovel';
import { assertEquipeExiste } from './asserts/equipe';
import { Atividade } from '../../src/models/atividade';
import { By, element } from 'protractor';
import { getNodeWithText } from '../../src/helpers/selectors';
import { assertAtividadeExiste } from './asserts/atividade';
import { PerfilUsuario } from '../../src/models/perfil_usuario';
import { assertPerfilExiste } from './asserts/perfil_de_usuario';
import { assertSituacaoLiberadaParaEdicao } from './asserts/situacao_de_atividade';
import { assertTipoDeAtividadePossuiFormulario } from './asserts/tipo_de_atividade';

/**
 * usuario que está logado
 */
export let user: Usuario;

/**
 * territorio que por ventura vá ser cadastrado e usado por algum teste
 */
export let territorio: Territorio;

/**
 * imovel que por ventura vá ser cadastrado e usado por algum teste
 */
export let imovel: Imovel;

/**
 * nome da equipe que por ventura vá ser cadastrada e usada por algum teste
 */
export let nomeDaEquipe: string;

/**
 * atividades que por ventura vão ser cadastradas e usadas por algum teste
 */
export let atividades: {
  [sigla: string]: { atividade: Atividade; id: string };
} = {};

/**
 * perfil de usuario que por ventura vá ser cadastrado e usado por algum teste
 */
export const perfil = new PerfilUsuario();

Given('que estou logado com', async (dataTable: TableDefinition) => {
  user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
});

Given('que cadastrei o territorio', async (dataTable: TableDefinition) => {
  territorio = makeTerritorio(dataTable.hashes()[0]);
  await criarTerritorio(territorio);
  expect(await assertTerritorioExiste(territorio.nome)).to.be.equal(true);
});

Given(
  'que cadastrei o imovel no territorio cadastrado',
  async (dataTable: TableDefinition) => {
    imovel = makeImovel(dataTable.hashes()[0], {
      território: territorio.nome,
    });
    await criarImovel(imovel);
    expect(await assertImovelExiste(imovel.logradouro)).to.be.equal(true);
  }
);

Given(
  'que cadastrei a equipe {string} com os usuarios',
  async (nomeEquipe: string, dataTable: TableDefinition) => {
    const usuarios = dataTable.hashes();
    await criarEquipe(nomeEquipe, usuarios);
    nomeDaEquipe = nomeEquipe;
    expect(await assertEquipeExiste(nomeDaEquipe)).to.be.equal(true);
  }
);

Given(
  'que cadastrei o perfil de usuario {string} com acesso a todos os recursos e aos formularios',
  async (nome: string, dataTable: TableDefinition) => {
    perfil.dadosBasicosData = { nome };
    perfil.recursosData = [
      {
        recurso: 'Todas',
        autoridade: 'TODAS AÇÕES',
      },
    ];
    perfil.formulariosData = dataTable.hashes();

    await criarPerfilDeUsuario(perfil);

    expect(await assertPerfilExiste(perfil.dadosBasicos.nome)).to.be.equal(
      true
    );
  }
);

Given(
  'que cadastrei uma atividade do tipo {string} com o imovel e a equipe criados',
  async (tipo: string, dataTable: TableDefinition) => {
    const sigla = tipo.substr(0, tipo.indexOf(' -')).replace(/\s/g, '_');
    const atividade = new Atividade();

    atividade.dadosBasicosData = {
      ...dataTable.hashes()[0],
      titulo: `${dataTable.hashes()[0].titulo}${sigla}`,
      tipo_de_atividade: tipo,
    };
    atividade.equipesData = [
      {
        nome: nomeDaEquipe,
      },
    ];
    atividade.imoveisData = [
      {
        logradouro: imovel.logradouro,
      },
    ];

    await criarAtividade(atividade);

    expect(
      await assertAtividadeExiste(atividade.dadosBasicos.titulo)
    ).to.be.equal(true);

    atividades[sigla] = {
      atividade,
      id: await getNodeWithText(
        By.xpath('//app-atividade-tabela//tbody//tr'),
        atividade.dadosBasicos.titulo,
        By.xpath('./td[contains(@class, "titulo")]/span')
      ).then(row =>
        row
          .element(By.xpath('./td[contains(@class, "column-id")]/span'))
          .getText()
      ),
    };
  }
);

Given('que o usuario atual pode editar novas atividades criadas', async () => {
  await permitirEdicaoDeNovasAtividades();
  expect(await assertSituacaoLiberadaParaEdicao('Nova')).to.be.equal(true);
});

Given(
  'que a atividade do tipo {string} possui o formulario {string}',
  async (tipoAtividade: string, nomeFormulario: string) => {
    await adicionarFormularioAoTipoDeAtividade(tipoAtividade, nomeFormulario);
    expect(
      await assertTipoDeAtividadePossuiFormulario(tipoAtividade, nomeFormulario)
    ).to.be.equal(true);
  }
);
