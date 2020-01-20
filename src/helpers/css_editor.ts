/**
 * @fileoverview
 */

import {browser, element, Locator} from 'protractor';

/**
 * @description Responsável por editar o estilo de um atributo de um elemento da
 * página
 */
export class CssEditor {
  /**
   * @description Altera ou adiciona o estilo do elemento passado
   * @async
   * @param {!Locator} locator
   * @param {!string} attribute
   * @param {!string} value
   */
  async alterar(locator: Locator, attribute: string, value: string) {
    await browser.executeScript(
        `arguments[0].style.${attribute} = "${value}"`,
        element(locator).getWebElement());
  }
}
