/**
 * @packageDocumentation
 */

import { By } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';

/**
 * Abstração da página de gerenciamento de equipes
 * @category Páginas do sistema
 */
export class AtividadesPage extends Page {
  /**
   * mapeamento do nome dos botões para a função que deve ser
   * chamada
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {};
  }

  /**
   * Acessa a página relativa ao gerenciamento de equipes
   */
  async get() {
    await this.navbar_.acessarAtividades();
  }
}
