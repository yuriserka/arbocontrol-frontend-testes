const { Then } = require('cucumber');
import {
  deletarImovel,
  deletarTerritorio,
  deletarEquipe,
  deletarAtividade,
  deletarPerfilDeUsuario,
} from './common';
import {
  territorio,
  imovel,
  nomeDaEquipe,
  atividades,
  perfil,
} from './background.steps';
import { assertTerritorioExiste } from './asserts/territorio';
import { assertImovelExiste } from './asserts/imovel';
import { assertEquipeExiste } from './asserts/equipe';
import { expect } from 'chai';
import { assertAtividadeExiste } from './asserts/atividade';
import { assertPerfilExiste } from './asserts/perfil_de_usuario';

const deleters = {
  territorio: () => deletarTerritorio(territorio),
  imovel: () => deletarImovel(imovel),
  equipe: () => deletarEquipe(nomeDaEquipe),
  perfil_admin: () => deletarPerfilDeUsuario(perfil),
  atividades: (tipo: string) => deletarAtividade(atividades[tipo].atividade),
};

const asserts = {
  territorio: () => assertTerritorioExiste(territorio.nome),
  imovel: () => assertImovelExiste(imovel.logradouro),
  equipe: () => assertEquipeExiste(nomeDaEquipe),
  perfil_admin: () => assertPerfilExiste(perfil.dadosBasicos.nome),
  atividades: (tipo: string) =>
    assertAtividadeExiste(atividades[tipo].atividade.dadosBasicos.titulo),
};

Then('irei excluir a dependencia {string}', async (nomeDependencia: string) => {
  if (nomeDependencia === 'atividades') {
    const siglas = Object.keys(atividades);

    for (let i = 0; i < siglas.length; ++i) {
      await deleters[nomeDependencia](siglas[i]);
      expect(await asserts[nomeDependencia](siglas[i])).to.be.equal(false);
    }
  } else {
    await deleters[nomeDependencia]();
    expect(await asserts[nomeDependencia]()).to.be.equal(false);
  }
});
