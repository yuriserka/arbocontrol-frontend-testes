import { SideNav } from '../helpers/sidenav';
import { ToolBar } from '../helpers/toolbar';

/**
 * Abstração dos componentes basicos que todas as páginas possuem
 * @category Util
 */
export abstract class SystemPage {
  /**
   * barra de navegação superior visível em todas as paginas
   */
  protected readonly toolbar_: ToolBar;
  /**
   * barra de navegação lateral
   */
  protected readonly navbar_: SideNav;

  constructor() {
    this.toolbar_ = new ToolBar();
    this.navbar_ = new SideNav();
  }

  abstract async get(): Promise<void>;

  /**
   * faz logout do sistema
   */
  async logout() {
    await this.toolbar_.logout();
  }

  /**
   * mostra a barra de navegação lateral
   */
  async mostrarSideNav() {
    await this.navbar_.exibir();
  }
}
