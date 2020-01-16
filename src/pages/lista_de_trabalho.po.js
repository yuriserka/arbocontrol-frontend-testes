/**
 * @fileoverview
 */

import { Page } from './page.po';

/**
 * @description Abstração da página de login
 */
export class WorkList extends Page {
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.campos_ = {
    };
  }

  async get() {
    await this.navbar_.acessarListasDeTrabalho();
  }
}
