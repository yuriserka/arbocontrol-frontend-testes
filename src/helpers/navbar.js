/**
 * @fileoverview
 */

import {By, element, Locator} from 'protractor';
import {Utility} from './utility';

const util = new Utility();

/**
 * @description Permite o acesso à todas as páginas do sistema
 */
export class SideNav {
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
      formularios: By.xpath('//a[@routerlink="formularios"]'),
      relatorios_indices: By.xpath('//a[@routerlink="relatorios-indices"]'),
      exportar: By.xpath('//a[@routerlink="exportar"]'),
      processo_importacao: By.xpath('//a[@routerlink="processo-importacao"]'),
      demandas: By.xpath('//a[@routerlink="demandas"]'),
      lista_trabalho: By.xpath('//a[@routerlink="lista-trabalho"]'),
      atividades: By.xpath('//a[@routerlink="atividades"]'),
      imoveis: By.xpath('//a[@routerlink="imoveis"]'),
      territorios: By.xpath('//a[@routerlink="territorios"]'),
      rede_de_saude: By.xpath(
          '(//mat-list-item[@class="parent mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted"])[1]'),
      areas_gestao: By.xpath('//a[@routerlink="areas-gestao"]'),
      unidades: By.xpath('//a[@routerlink="unidades"]'),
      pessoas: By.xpath('//a[@routerlink="pessoas"]'),
      equipes: By.xpath('//a[@routerlink="equipes"]'),
      perfis_usuarios: By.xpath('//a[@routerlink="perfis-usuarios"]'),
      perfil_usuario_unidade:
          By.xpath('//a[@routerlink="perfil-usuario-unidade"]'),
      tabelas_basicas: By.xpath(
          '(//mat-list-item[@class="parent mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted"])[2]')
    };
  }

  /**
   * @description Se a barra de navegação lateral não estiver sendo exibida,
   * então é clicado no botão para exibi-la, caso contrário não faz nada
   * @async
   */
  async exibir() {
    /**
     * @description checa se a barra de navegação está sendo exibida
     * @async
     */
    const isNavBarExibida = async () => {
      return (await element(
                  By.xpath(
                      '//*[contains(@class, "example-sidenav mat-drawer mat-sidenav")]'))
                  .getAttribute('class'))
          .includes('mat-drawer-opened');
    };

    if (await isNavBarExibida()) {
      return;
    }

    const btnNavBarLateral = By.xpath(
        '//button[contains(@class, "mat-icon-button mat-button-base ng-star-inserted")]');
    await util.waitClick(btnNavBarLateral);
    await element(btnNavBarLateral).click();
    // tentativa de fazer esperar o ultimo item da lista aparecer pra interagir
    // await util.waitVisibility(this.botoes_.tabelas_basicas);
    // await util.waitClick(this.botoes_.tabelas_basicas);
    // await browser.sleep(2000);
  }

  /**
   * @description Se a lista de opções da Rede de Saúde não estiver sendo
   * exibida, então é clicado no botão para exibi-la, caso contrário não faz
   * nada
   * @async
   */
  async expandirRedeSaude() {
    this.exibir();
    /**
     * @description checa se a lista da Rede de Saúde está sendo exibida
     * @async
     */
    const isRedeSaudeExibida = async () => {
      return (await element(
                  By.xpath(
                      '(//div[contains(@class, "submenu ng-star-inserted")])[1]'))
                  .getAttribute('class'))
          .includes('expanded');
    };

    if (await isRedeSaudeExibida()) {
      return;
    }

    await element(this.botoes_.rede_de_saude)
        .element(By.xpath('.//div[@class="mat-list-item-content"]'))
        .click();
    // tentativa de fazer esperar o ultimo item da lista aparecer pra interagir
    // await util.waitVisibility(this.botoes_.perfil_usuario_unidade);
    // await util.waitClick(this.botoes_.perfil_usuario_unidade);
    // await browser.sleep(1500);
  }

  /**
   * @description acessa a página de "Formulários" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarFormularios() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.formularios);
    await util.waitClick(this.botoes_.formularios);
    await element(this.botoes_.formularios).click();
  }

  /**
   * @description acessa a página de "Relatórios e Índices" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarRelatorios() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.relatorios_indices);
    await util.waitClick(this.botoes_.relatorios_indices);
    await element(this.botoes_.relatorios_indices).click();
  }

  /**
   * @description acessa a página de "Exportação" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarExportacao() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.exportar);
    await util.waitClick(this.botoes_.exportar);
    await element(this.botoes_.exportar).click();
  }

  /**
   * @description acessa a página de "Importação" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarImportacao() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.processo_importacao);
    await util.waitClick(this.botoes_.processo_importacao);
    await element(this.botoes_.processo_importacao).click();
  }

  /**
   * @description acessa a página de "Demandas" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarDemandas() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.demandas);
    await util.waitClick(this.botoes_.demandas);
    await element(this.botoes_.demandas).click();
  }

  /**
   * @description acessa a página de "Lista de Trabalho" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarListasDeTrabalho() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.lista_trabalho);
    await util.waitClick(this.botoes_.lista_trabalho);
    await element(this.botoes_.lista_trabalho).click();
  }

  /**
   * @description acessa a página de "Atividades" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarAtividades() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.atividades);
    await util.waitClick(this.botoes_.atividades);
    await element(this.botoes_.atividades).click();
  }

  /**
   * @description acessa a página de "Imóveis" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarImoveis() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.imoveis);
    await util.waitClick(this.botoes_.imoveis);
    await element(this.botoes_.imoveis).click();
  }

  /**
   * @description acessa a página de "Territórios" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarTerritorios() {
    await this.exibir();
    await util.waitVisibility(this.botoes_.territorios);
    await util.waitClick(this.botoes_.territorios);
    await element(this.botoes_.territorios).click();
  }

  /**
   * @description acessa a página de "Áreas de Gestão" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarAreasDeGestao() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.areas_gestao);
    await util.waitClick(this.botoes_.areas_gestao);
    await element(this.botoes_.areas_gestao).click();
  }

  /**
   * @description acessa a página de "Unidades Organizacionais" a partir da
   * barra de navegação lateral
   * @async
   */
  async acessarUnidadesOrganizacionais() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.unidades);
    await util.waitClick(this.botoes_.unidades);
    await element(this.botoes_.unidades).click();
  }

  /**
   * @description acessa a página de "Pessoas" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarPessoas() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.pessoas);
    await util.waitClick(this.botoes_.pessoas);
    await element(this.botoes_.pessoas).click();
  }

  /**
   * @description acessa a página de "Equipes" a partir da barra de navegação
   * lateral
   * @async
   */
  async acessarEquipes() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.equipes);
    await util.waitClick(this.botoes_.equipes);
    await element(this.botoes_.equipes).click();
  }

  /**
   * @description acessa a página de "Perfis de Usuário" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarPerfisDeUsuario() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.perfis_usuarios);
    await util.waitClick(this.botoes_.perfis_usuarios);
    await element(this.botoes_.perfis_usuarios).click();
  }

  /**
   * @description acessa a página de "Usuários da Unidade" a partir da barra de
   * navegação lateral
   * @async
   */
  async acessarUsuariosDaUnidade() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes_.perfil_usuario_unidade);
    await util.waitClick(this.botoes_.perfil_usuario_unidade);
    await element(this.botoes_.perfil_usuario_unidade).click();
  }
}
