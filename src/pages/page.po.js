/**
 * @fileoverview
 */

import {SideNav} from '../helpers/navbar';
import {ToolBar} from '../helpers/toolbar';

/**
 * @description Abstração dos componentes basicos que todas as páginas possuem
 */
export class Page {
  constructor() {
    /**
     * @description barra de navegação superior visível em todas as paginas
     * @private
     * @constant
     * @type {!ToolBar}
     */
    this.toolbar_ = new ToolBar();

    /**
     * @description barra de navegação lateral
     * @private
     * @constant
     * @type {!SideNav}
     */
    this.navbar_ = new SideNav();
  }

  /**
   * @description faz logout do sistema
   * @async
   */
  async logout() {
    await this.toolbar_.logout();
  }

  /**
   * @description mostra a barra de navegação lateral
   * @async
   */
  async mostrarSideNav() {
    await this.navbar_.exibir();
  }
}
