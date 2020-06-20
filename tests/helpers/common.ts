/**
 * @fileoverview Concentra as funções de alto nivel de cada página do sistema a
 * fim de tornar fácil o acesso a elas, bem como centralizar a instanciação das
 * classes
 */

import { AtividadesPage } from '../../src/pages/atividades.po';
import { EquipesPage } from '../../src/pages/rede_de_saude/equipes.po';
import { ImoveisPage } from '../../src/pages/imoveis.po';
import { LoginPage } from '../../src/pages/login.po';
import { Usuario } from '../../src/models/usuario';
import { TerritoriosPage } from '../../src/pages/territorios.po';
import { HomePage } from '../../src/pages/home.po';
import { Imovel } from '../../src/models/imovel';
import { browser } from 'protractor';
import { Atividade } from '../../src/models/atividade';
import { baseUrl } from '../../src/common';
import { Territorio } from '../../src/models/territorio';
import { PerfilUsuario } from '../../src/models/perfil_usuario';
import { PerfisDeUsuarioPage } from '../../src/pages/rede_de_saude/perfis_de_usuario.po';
import { SituacoesDeAtividadePage } from '../../src/pages/tabelas_basicas/situacoes_de_atividade.po';
import { TiposDeAtividadesPage } from '../../src/pages/tabelas_basicas/tipos_de_atividade.po';
import { ListaDeTrabalhoPage } from '../../src/pages/lista_de_trabalho.po';
import { Registro } from '../../src/models/registro';
import { RelatoriosPage } from '../../src/pages/relatorios.po';
import { Relatorio } from '../../src/models/relatorio';

const atividadePage = new AtividadesPage();
const equipePage = new EquipesPage();
const imovelPage = new ImoveisPage();
const loginPage = new LoginPage();
const homePage = new HomePage();
const territorioPage = new TerritoriosPage();
const perfilDeUsuarioPage = new PerfisDeUsuarioPage();
const situacaoDeAtividadePage = new SituacoesDeAtividadePage();
const tipoDeAtividadePage = new TiposDeAtividadesPage();
const listaDeTrabalhoPage = new ListaDeTrabalhoPage();
const relatorioPage = new RelatoriosPage();

/**
 * tempo de timeout de 2 minutos para os testes
 */
export const timeout = 10 * 60 * 1000;

/**
 * usuário padrão utilizado nos testes
 */
export const userTest: Usuario = {
  cpf: '111.111.111-11',
  senha: '12345678',
  unidade: 'SES - AM',
};

/**
 * navega até a página que deve ser testada
 */
export async function getTestPage() {
  await browser.get(baseUrl);
}

/**
 * faz login partindo da tela inicial
 * @param user
 */
export async function login(user: Usuario) {
  try {
    const currUrl = await browser.getCurrentUrl();
    if (!currUrl.includes('/login')) {
      await getTestPage();
    }
  } catch (err) {
    await getTestPage();
  }
  await loginPage.login(user);
}

/**
 * retorna para a página de login
 */
export async function logout() {
  loginPage['logado_'] = false;
  await homePage.logout();
}

/**
 * cria uma equipe, uma vez que está logado
 * @param nomeDaEquipe
 * @param usuarios
 */
export async function criarEquipe(
  nomeDaEquipe: string,
  usuarios: Array<{ [colname: string]: string }>
) {
  await equipePage.get();
  await equipePage.cadastrarEquipe(nomeDaEquipe, usuarios);
}

/**
 * deleta uma equipe, uma vez que está logado
 * @param nomeDaEquipe
 */
export async function deletarEquipe(nomeDaEquipe: string) {
  await equipePage.get();
  await equipePage.excluirEquipe(nomeDaEquipe);
}

/**
 * cria um imovel, uma vez que está logado
 * @param imovel
 */
export async function criarImovel(imovel: Imovel) {
  await imovelPage.get();
  await imovelPage.cadastrarImovel(imovel);
}

/**
 * deleta um imovel, uma vez que está logado
 * @param imovel
 */
export async function deletarImovel(imovel: Imovel) {
  await imovelPage.get();
  await imovelPage.excluirImovel(imovel.logradouro);
}

/**
 * cria um territorio, uma vez que está logado
 * @param territorio
 */
export async function criarTerritorio(territorio: Territorio) {
  await territorioPage.get();
  await territorioPage.cadastrarTerritorio(territorio);
}

/**
 * deleta um territorio, uma vez que está logado
 * @param territorio
 */
export async function deletarTerritorio(territorio: Territorio) {
  await territorioPage.get();
  await territorioPage.exluirTerritorio(territorio.nome);
}

/**
 * cria um perfil de usuario, uma vez que está logado
 * @param perfil
 */
export async function criarPerfilDeUsuario(perfil: PerfilUsuario) {
  await perfilDeUsuarioPage.get();
  await perfilDeUsuarioPage.cadastrarPerfil(perfil);
}

/**
 * deleta um perfil de usuario, uma vez que está logado
 * @param perfil
 */
export async function deletarPerfilDeUsuario(perfil: PerfilUsuario) {
  await perfilDeUsuarioPage.get();
  await perfilDeUsuarioPage.excluirPerfil(perfil.dadosBasicos.nome);
}

/**
 * cria uma atividade, uma vez que está logado
 * é necessário a criação de imoveis, equipes e opcionalmente demandas
 * @param atividade
 */
export async function criarAtividade(atividade: Atividade) {
  await atividadePage.get();
  await atividadePage.cadastrarAtividade(atividade);
}

/**
 * deleta uma atividade, uma vez que está logado
 * @param atividade
 */
export async function deletarAtividade(atividade: Atividade) {
  await deletarAtividadePorTitulo(atividade.dadosBasicos.titulo);
}

/**
 * deleta uma atividade baseado no titulo, uma vez que está logado
 * @param atividade
 */
export async function deletarAtividadePorTitulo(titulo: string) {
  await atividadePage.get();
  await atividadePage.excluirAtividade(titulo);
}

/**
 * permite que aividades com a situação "Nova" possam ser editadas, ou seja,
 * possa ser possível a inserção de registros dado que esta logado
 * @param tipo_de_atividade
 */
export async function permitirEdicaoDeNovasAtividades() {
  await situacaoDeAtividadePage.get();
  await situacaoDeAtividadePage.checkLiberadaParaEdicao('Nova');
}

/**
 * remove a permissao de edição para atividades em situação "Nova", uma vez que
 * está logado
 */
export async function removerPermissaoDeEdicaoDeNovasAtividades() {
  await situacaoDeAtividadePage.get();
  await situacaoDeAtividadePage.checkLiberadaParaEdicao('Nova');
}

/**
 * adiciona formulario às atividades do tipo especificado, uma vez que está logado
 * @param tipo
 * @param form
 */
export async function adicionarFormularioAoTipoDeAtividade(
  tipo: string,
  form: string
) {
  await tipoDeAtividadePage.get();
  await tipoDeAtividadePage.adicionarFormularioAoTipo(tipo, form, true);
}

/**
 * remove o formulario passado das atividades do tipo especificado, uma vez que
 * está logado
 * @param tipo
 * @param form
 */
export async function removerFormularioAoTipoDeAtividade(
  tipo: string,
  form: string
) {
  await tipoDeAtividadePage.get();
  await tipoDeAtividadePage.removerFormularioDoTipo(tipo, form);
}

/**
 * Insere um registro na lista de trabalho para a atividade no formulario e imovel passados
 * @param idAtividade
 * @param imovel
 * @param form
 * @param reg
 */
export async function criarRegistroNaListaDeTrabalho(
  idAtividade: string,
  imovel: Imovel,
  form: string,
  reg: Registro
) {
  await listaDeTrabalhoPage.get();
  await listaDeTrabalhoPage.inserirRegistro(
    idAtividade,
    imovel.logradouro,
    form,
    reg
  );
}

/**
 * exclui todos os registros da lista de trbalho da atividade no imovel passado
 * @param idAtividade
 * @param form
 */
export async function deletarRegistrosNaListaDeTrabalho(
  idAtividade: string,
  form: string
) {
  await listaDeTrabalhoPage.get();
  await listaDeTrabalhoPage.excluirRegistros(idAtividade, form);
}

/**
 * cria um relatorio, uma vez que está logado
 * é necessária a inserção de registros na lista de trabalho primeiro
 * @param relatorio
 * @param form
 */
export async function criarRelatorio(relatorio: Relatorio, form: string) {
  await relatorioPage.get();
  await relatorioPage.cadastrarRelatorio(relatorio, form);
}

/**
 * deleta o relatorio que possuir o titulo passado, uma vez que está logado
 * @param relatorio
 * @param form
 */
export async function deletarRelatorio(relatorio: Relatorio, form: string) {
  await relatorioPage.get();
  await relatorioPage.excluirRelatorio(relatorio.titulo, form);
}
