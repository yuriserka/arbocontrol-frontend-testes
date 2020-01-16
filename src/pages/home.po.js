/**
 * @fileoverview
 */

import {By, element, Locator} from 'protractor';
import {Page} from './page.po';

/**
 * @description Abstração da página inicial após login
 */
export class HomePage extends Page {
  constructor() {
    super();

    /**
     * @description card que mostra informações sobre o usuário logado
     * @private
     * @constant
     * @type {!Locator}
     */
    this.card_ = By.xpath('//mat-card[@class="example-card mat-card"]');

    /**
     * @description mapeamento do nome dos botões para a função que deve ser
     * chamada
     * @private
     * @constant
     * @type {!Object<!String, !Promise<void>>}
     */
    this.btn2page_ = {
      formularios: () => this.navbar_.acessarFormularios(),
      relatorios_indices: () => this.navbar_.acessarRelatorios(),
      exportar: () => this.navbar_.acessarExportacao(),
      processo_importacao: () => this.navbar_.acessarImportacao(),
      demandas: () => this.navbar_.acessarDemandas(),
      lista_trabalho: () => this.navbar_.acessarListasDeTrabalho(),
      atividades: () => this.navbar_.acessarAtividades(),
      imoveis: () => this.navbar_.acessarImoveis(),
      territorios: () => this.navbar_.acessarTerritorios(),
      areas_gestao: () => this.navbar_.acessarAreasDeGestao(),
      unidades: () => this.navbar_.acessarUnidadesOrganizacionais(),
      pessoas: () => this.navbar_.acessarPessoas(),
      equipes: () => this.navbar_.acessarEquipes(),
      perfis_usuarios: () => this.navbar_.acessarPerfisDeUsuario(),
      perfil_usuario_unidade: () => this.navbar_.acessarUsuariosDaUnidade(),
    };
  }

  /**
   * @description acessa a página especificada pelo nome do botao
   * @async
   * @param {String} nomeBotao
   */
  async acessar(nomeBotao) {
    await this.btn2page_[nomeBotao]();
  }

  /**
   * @description Retorna o nome do usuário escrito no Card
   * @returns {!String} nome do usuário logado
   * @async
   */
  async getUsuarioLogado() {
    return element(By.xpath('.//mat-card-title[@class="mat-card-title"]'))
        .getText();
  }
}
