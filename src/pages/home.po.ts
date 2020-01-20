/**
 * @fileoverview
 */

import {By, element, Locator} from 'protractor';
import {Page} from './page.po';

/**
 * @description Abstração da página inicial após login
 * @category Páginas do sistema
 */
export class HomePage extends Page {
  card_: Locator;
  btn2page_: any;

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
     * @type {!Object<!string, !Promise<void>>}
     */
    this.btn2page_ = {
      formularios: () => super.navbar_.acessarFormularios(),
      relatorios_indices: () => super.navbar_.acessarRelatorios(),
      exportar: () => super.navbar_.acessarExportacao(),
      processo_importacao: () => super.navbar_.acessarImportacao(),
      demandas: () => super.navbar_.acessarDemandas(),
      lista_trabalho: () => super.navbar_.acessarListasDeTrabalho(),
      atividades: () => super.navbar_.acessarAtividades(),
      imoveis: () => super.navbar_.acessarImoveis(),
      territorios: () => super.navbar_.acessarTerritorios(),
      areas_gestao: () => super.navbar_.acessarAreasDeGestao(),
      unidades: () => super.navbar_.acessarUnidadesOrganizacionais(),
      pessoas: () => super.navbar_.acessarPessoas(),
      equipes: () => super.navbar_.acessarEquipes(),
      perfis_usuarios: () => super.navbar_.acessarPerfisDeUsuario(),
      perfil_usuario_unidade: () => super.navbar_.acessarUsuariosDaUnidade(),
    };
  }

  /**
   * @description acessa a página especificada pelo nome do botao
   * @async
   * @param {!string} nomeBotao
   */
  async acessar(nomeBotao: string) {
    await this.btn2page_[nomeBotao]();
  }

  /**
   * @description Retorna o nome do usuário escrito no Card
   * @returns {!string} nome do usuário logado
   * @async
   */
  async getUsuarioLogado(): Promise<string> {
    return element(By.xpath('.//mat-card-title[@class="mat-card-title"]'))
        .getText();
  }
}
