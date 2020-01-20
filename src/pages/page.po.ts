/**
 * @fileoverview
 */

import {SideNav} from '../helpers/sidenav';
import {ToolBar} from '../helpers/toolbar';

/**
 * @description Abstração dos componentes basicos que todas as páginas possuem
 * @category Util
 */
export class Page {
  toolbar_: ToolBar;
  navbar_: SideNav;
  
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
