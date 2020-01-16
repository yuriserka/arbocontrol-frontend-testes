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
   * @param {!String} attribute
   * @param {!String} value
   */
  async alterar(locator, attribute, value) {
    await browser.executeScript(
        `arguments[0].style.${attribute} = "${value}"`,
        element(locator).getWebElement());
  }
}
