/**
 * @fileoverview
 */

import {By, element} from 'protractor';
import {Page} from './page.po';

const basePage = new Page();

/**
 *
 */
export class HomePage {
  constructor() {
    this.card = By.xpath('//mat-card[@class="example-card mat-card"]');

    this.btnFuncMap = {
      formularios: this.formularios,
      relatorios_indices: this.relatorios,
      exportar: this.exportacao,
      processo_importacao: this.importacao,
      demandas: this.demandas,
      lista_trabalho: this.listasDeTrabalho,
      atividades: this.atividades,
      imoveis: this.imoveis,
      territorios: this.territorios,
      areas_gestao: this.areasDeGestao,
      unidades: this.unidadesOrganizacionais,
      pessoas: this.pessoas,
      equipes: this.equipes,
      perfis_usuarios: this.perfisDeUsuario,
      perfil_usuario_unidade: this.usuariosDaUnidade,
    };
  }

  /**
   *
   */
  logout() {
    return basePage.logout();
  };

  /**
   *
   */
  showNavBar() {
    return basePage.mostarBarraNavegacao();
  };

  /**
   *
   */
  getUsuarioLogado() {
    return element(By.xpath('.//mat-card-title[@class="mat-card-title"]'))
        .getText();
  };

  /**
   *
   */
  async formularios() {
    await basePage.navbar.acessarFormularios();
  };

  /**
   *
   */
  async relatorios() {
    await basePage.navbar.acessarRelatorios();
  };

  /**
   *
   */
  async exportacao() {
    await basePage.navbar.acessarExportacao();
  };

  /**
   *
   */
  async importacao() {
    await basePage.navbar.acessarImportacao();
  };

  /**
   *
   */
  async demandas() {
    await basePage.navbar.acessarDemandas();
  };

  /**
   *
   */
  async listasDeTrabalho() {
    await basePage.navbar.acessarListasDeTrabalho();
  };

  /**
   *
   */
  async atividades() {
    await basePage.navbar.acessarAtividades();
  };

  /**
   *
   */
  async imoveis() {
    await basePage.navbar.acessarImoveis();
  };

  /**
   *
   */
  async territorios() {
    await basePage.navbar.acessarTerritorios();
  };

  /**
   *
   */
  async areasDeGestao() {
    await basePage.navbar.acessarAreasDeGestao();
  };

  /**
   *
   */
  async unidadesOrganizacionais() {
    await basePage.navbar.acessarUnidadesOrganizacionais();
  };

  /**
   *
   */
  async pessoas() {
    await basePage.navbar.acessarPessoas();
  };

  /**
   *
   */
  async equipes() {
    await basePage.navbar.acessarEquipes();
  };

  /**
   *
   */
  async perfisDeUsuario() {
    await basePage.navbar.acessarPerfisDeUsuario();
  };

  /**
   *
   */
  async usuariosDaUnidade() {
    await basePage.navbar.acessarUsuariosDaUnidade();
  };
};
