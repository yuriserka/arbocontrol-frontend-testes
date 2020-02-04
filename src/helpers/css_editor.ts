/**
 * @fileoverview
 */

import { browser, element, Locator } from 'protractor';

/**
 * Responsável por editar o estilo de um atributo de um elemento da
 * página
 */
export class CssEditor {
  /**
   * Altera ou adiciona o estilo do elemento passado
   * @async
   * @param {!Locator} locator
   * @param {!string} atributo
   * @param {!string} valor
   * @static
   */
  static async alterar(
    locator: Locator,
    estilos: Array<{ atributo: string; valor: string }>
  ) {
    for (let i = 0; i < estilos.length; i++) {
      await browser.executeScript(
        `arguments[0].style.${estilos[i].atributo} = "${estilos[i].valor}"`,
        element(locator).getWebElement()
      );
    }
  }
}
