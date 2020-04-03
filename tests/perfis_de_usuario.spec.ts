const { setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { TableDefinition } from 'cucumber';
import { timeout } from './helpers/common';
import { PerfisDeUsuarioPage } from '../src/pages/rede_de_saude/perfis_de_usuario.po';
import { PerfilUsuario } from '../src/models/perfil_usuario';
import { browser, element } from 'protractor';
import {
  assertPerfilExiste,
  assertRecursoVinculado,
  assertFormularioVinculado,
} from './helpers/asserts/perfil_de_usuario';
import { baseUrl } from '../config';

setDefaultTimeout(timeout);

const perfisUsuarioPage = new PerfisDeUsuarioPage();
const perfil = new PerfilUsuario();

When('eu acessar a pagina de Perfis de Usuario', async () => {
  await perfisUsuarioPage.get();
});

Then(
  'eu vou cadastrar um perfil com os dados básicos',
  async (dataTable: TableDefinition) => {
    perfil.dadosBasicosData = dataTable.hashes()[0];
    await element(perfisUsuarioPage['botoes_']['cadastrar']).click();
    await perfisUsuarioPage['cadastroBasico'](perfil.dadosBasicos);
    await perfisUsuarioPage['salvar']();
    expect(await browser.driver.getCurrentUrl()).include(
      `${baseUrl}/perfis-usuarios`
    );

    expect(await assertPerfilExiste(perfil.dadosBasicos.nome)).to.be.equal(
      true
    );
  }
);

Then('irei atribuir os recursos', async (dataTable: TableDefinition) => {
  perfil.recursosData = dataTable.hashes();
  await perfisUsuarioPage.selecionarPerfil(perfil.dadosBasicos.nome);
  await perfisUsuarioPage.atribuirRecursos(perfil);

  for (let i = 0; i < perfil.recursos.length; ++i) {
    const recurso = perfil.recursos[i];
    expect(await assertRecursoVinculado(recurso)).to.be.equal(true);
  }
});

Then('irei atribuir os formularios', async (dataTable: TableDefinition) => {
  perfil.formulariosData = dataTable.hashes();
  await perfisUsuarioPage.atribuirFormularios(perfil);

  for (let i = 0; i < perfil.recursos.length; ++i) {
    const form = perfil.formularios[i];
    expect(await assertFormularioVinculado(form)).to.be.equal(true);
  }
});

Then('irei salvar o perfil', async () => {
  await perfisUsuarioPage['salvar']();
});

Then(
  'eu vou excluir o perfil de usuario {string}',
  async (nomePerfil: string) => {
    await perfisUsuarioPage.excluirPerfil(nomePerfil);

    expect(await assertPerfilExiste(nomePerfil)).to.be.equal(false);
  }
);
