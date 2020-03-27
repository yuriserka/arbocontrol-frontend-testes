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
import { baseUrl } from '../../config';
import { Territorio } from '../../src/models/territorio';

const atividadePage = new AtividadesPage();
const equipePage = new EquipesPage();
const imovelPage = new ImoveisPage();
const loginPage = new LoginPage();
const homePage = new HomePage();
const territorioPage = new TerritoriosPage();

/**
 * tempo de timeout para os testes
 */
export const timeout = 1000 * 60;

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
  await loginPage.login(user);
}

/**
 * retorna para a página de login
 */
export async function logout() {
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
 * cria uma atividade, uma vez que está logado
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
