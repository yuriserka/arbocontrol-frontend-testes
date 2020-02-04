/**
 * @fileoverview
 */

import { By, element } from 'protractor';
import { Page } from './page.po';

/**
 * Abstração da página inicial após login
 * @category Páginas do sistema
 */
export class HomePage extends Page {
  /**
   * mapeamento do nome dos botões para a função que deve ser
   * chamada
   * @private
   * @constant
   */
  private btn2page_: { [key: string]: () => Promise<void> };

  constructor() {
    super();
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
   * acessa a página especificada pelo nome do botao
   * @async
   * @param {!string} nomeBotao
   */
  async acessar(nomeBotao: string) {
    await this.btn2page_[nomeBotao]();
  }

  /**
   * Retorna o nome do usuário escrito no Card
   * @returns {!string} nome do usuário logado
   * @async
   */
  async getUsuarioLogado(): Promise<string> {
    return element(
      By.xpath('.//mat-card-title[@class="mat-card-title"]')
    ).getText();
  }
}
