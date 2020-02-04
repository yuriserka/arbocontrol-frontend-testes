/**
 * @fileoverview
 */

import { SideNav } from '../helpers/sidenav';
import { ToolBar } from '../helpers/toolbar';

/**
 * Abstração dos componentes basicos que todas as páginas possuem
 * @category Util
 */
export class Page {
  /**
   * barra de navegação superior visível em todas as paginas
   * @private
   * @constant
   */
  protected readonly toolbar_: ToolBar;
  /**
   * barra de navegação lateral
   * @private
   * @constant
   */
  protected readonly navbar_: SideNav;

  constructor() {
    this.toolbar_ = new ToolBar();
    this.navbar_ = new SideNav();
  }

  /**
   * faz logout do sistema
   * @async
   */
  async logout() {
    await this.toolbar_.logout();
  }

  /**
   * mostra a barra de navegação lateral
   * @async
   */
  async mostrarSideNav() {
    await this.navbar_.exibir();
  }
}
