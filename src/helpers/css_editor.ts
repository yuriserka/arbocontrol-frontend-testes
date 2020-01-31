/**
 * @fileoverview
 */

import { browser, element, Locator } from 'protractor';

/**
 * @description Responsável por editar o estilo de um atributo de um elemento da
 * página
 */
export class CssEditor {
  /**
   * @description Altera ou adiciona o estilo do elemento passado
   * @async
   * @param {!Locator} locator
   * @param {!string} atributo
   * @param {!string} valor
   */
  async alterar(locator: Locator, atributo: string, valor: string) {
    await browser.executeScript(
      `arguments[0].style.${atributo} = "${valor}"`,
      element(locator).getWebElement()
    );
  }
}
