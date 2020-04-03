const { Then } = require('cucumber');
import {
  deletarImovel,
  deletarTerritorio,
  deletarEquipe,
  deletarAtividade,
} from './common';
import {
  territorio,
  imovel,
  nomeDaEquipe,
  atividades,
} from './background.steps';
import { assertTerritorioExiste } from './asserts/territorio';
import { assertImovelExiste } from './asserts/imovel';
import { assertEquipeExiste } from './asserts/equipe';
import { expect } from 'chai';
import { assertAtividadeExiste } from './asserts/atividade';

const deleters = {
  territorio: () => deletarTerritorio(territorio),
  imovel: () => deletarImovel(imovel),
  equipe: () => deletarEquipe(nomeDaEquipe),
  atividades: (tipo: string) => deletarAtividade(atividades[tipo].atividade),
};

const asserts = {
  territorio: () => assertTerritorioExiste(territorio.nome),
  imovel: () => assertImovelExiste(imovel.logradouro),
  equipe: () => assertEquipeExiste(nomeDaEquipe),
  atividades: (tipo: string) =>
    assertAtividadeExiste(atividades[tipo].atividade.dadosBasicos.titulo),
};

Then('irei excluir a dependencia {string}', async (nomeDependencia: string) => {
  if (nomeDependencia === 'atividades') {
    const siglas = Object.keys(atividades);

    console.log({ siglas });

    for (let i = 0; i < siglas.length; ++i) {
      await deleters[nomeDependencia](siglas[i]);
      expect(await asserts[nomeDependencia](siglas[i])).to.be.equal(false);
    }
  } else {
    await deleters[nomeDependencia]();
    expect(await asserts[nomeDependencia]()).to.be.equal(false);
  }
});
