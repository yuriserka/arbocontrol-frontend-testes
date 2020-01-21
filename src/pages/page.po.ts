/**
 * @fileoverview
 */

import { SideNav } from '../helpers/sidenav';
import { ToolBar } from '../helpers/toolbar';

/**
 * @description Abstração dos componentes basicos que todas as páginas possuem
 * @category Util
 */
export class Page {
  /**
   * @description barra de navegação superior visível em todas as paginas
   * @private
   * @constant
   */
  protected toolbar_: ToolBar;
  /**
   * @description barra de navegação lateral
   * @private
   * @constant
   */
  protected navbar_: SideNav;

  constructor() {
    this.toolbar_ = new ToolBar();
    this.navbar_ = new SideNav();
  }

  /**
   * @description faz logout do sistema
   * @async
   */
  public async logout() {
    await this.toolbar_.logout();
  }

  /**
   * @description mostra a barra de navegação lateral
   * @async
   */
  public async mostrarSideNav() {
    await this.navbar_.exibir();
  }
}
