/**
 * @fileoverview
 */

import {Page} from './page.po';

/**
 * @description Abstração da página de login
 * @category Páginas do sistema
 */
export class WorkList extends Page {
  botoes_: any;
  campos_: any;

  constructor() {
    super();

    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.botoes_ = {};

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.campos_ = {};
  }

  async get() {
    await super.navbar_.acessarListasDeTrabalho();
  }
}
