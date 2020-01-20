/**
 * @fileoverview
 */

import {By, element} from 'protractor';

/**
 * @description Represena a barra de navegação superior do site arbocontrol
 */
export class ToolBar {
  botoes_: any;
  
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<string, !Locator>}
     */
    this.botoes_ = {
      sair: By.xpath(
          '//button[@class="mat-button mat-button-base ng-star-inserted"]'),
    };
  }

  /**
   * @description clica no botão de sair
   * @async
   */
  async logout() {
    await element(this.botoes_.sair).click();
  }
}
