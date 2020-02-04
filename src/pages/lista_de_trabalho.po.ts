/**
 * @fileoverview
 */

import { By as SeleniumBy } from 'selenium-webdriver';
import { Page } from './page.po';

/**
 * Abstração da página de login
 * @category Páginas do sistema
 */
export class ListaDeTrabalhoPage extends Page {
  /**
   * botões que necessitam de ser clicados
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   * @private
   * @constant
   */
  private campos_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {};
    this.campos_ = {};
  }

  async get() {
    await this.navbar_.acessarListasDeTrabalho();
  }
}
