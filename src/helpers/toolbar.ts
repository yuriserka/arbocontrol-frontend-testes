/**
 * @packageDocumentation
 */

import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';

/**
 * Represena a barra de navegação superior do site arbocontrol
 */
export class ToolBar {
  /**
   * botões que necessitam de ser clicados
   */
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    this.botoes_ = {
      sair: By.xpath(
        '//button[@class="mat-button mat-button-base ng-star-inserted"]'
      ),
    };
  }

  /**
   * clica no botão de sair
   */
  async logout() {
    await element(this.botoes_.sair).click();
  }
}
