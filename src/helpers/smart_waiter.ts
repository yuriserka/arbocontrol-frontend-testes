/**
 * @fileoverview
 */

import {
  browser,
  element,
  ExpectedConditions as EC,
  Locator,
} from 'protractor';

/**
 * Representa o tempo máximo de espera para as condições
 * @private
 * @constant
 */
const timeout = 10000;

/**
 * Responsável por esperas inteligentes
 */
export class SmartWaiter {
  /**
   * Espera o elemento estar disponivel para ser clicado
   * @async
   * @param {!Locator} locator
   * @param {?number} tempoAdicional
   */
  static async waitClick(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.elementToBeClickable(element(locator)),
      timeout + tempoAdicional
    );
  }

  /**
   * Espera até que a url mude para a passada como argumento
   * @async
   * @param {!string} url
   * @param {?number} tempoAdicional
   */
  static async waitUrl(url: string, tempoAdicional = 0) {
    await browser.wait(EC.urlIs(url), timeout + tempoAdicional);
  }

  /**
   * Espera o elemento estar visível
   * @async
   * @param {!Locator} locator
   * @param {?number} tempoAdicional
   */
  static async waitVisibility(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.visibilityOf(element(locator)),
      timeout + tempoAdicional
    );
  }

  /**
   * Espera o texto dentro do elemento ser o passado
   * @async
   * @param {!Locator} locator
   * @param {!string} texto
   * @param {?number} tempoAdicional
   */
  static async waitText(locator: Locator, texto: string, tempoAdicional = 0) {
    await browser.wait(
      EC.textToBePresentInElement(element(locator), texto),
      timeout + tempoAdicional
    );
  }
}
