/**
 * @fileoverview
 */

import {browser, element, ExpectedConditions as EC, Locator} from 'protractor';

/**
 * @description Responsável por esperas inteligentes
 */
export class Utility {
  constructor() {
    /**
     * @description Representa o tempo máximo de espera para as condições
     * @private
     * @constant
     * @type {Number}
     */
    this.timeout_ = 10000;
  }
  /**
   * @description Espera o elemento estar disponivel para ser clicado
   * @async
   * @param {!Locator} locator
   * @param {?Number} tempoAdicional
   */
  async waitClick(locator, tempoAdicional = 0) {
    await browser.wait(
        EC.elementToBeClickable(element(locator)),
        this.timeout_ + tempoAdicional);
  }

  /**
   * @description Espera até que a url mude para a passada como argumento
   * @async
   * @param {!String} url
   * @param {?Number} tempoAdicional
   */
  async waitUrl(url, tempoAdicional = 0) {
    await browser.wait(EC.urlIs(url), this.timeout_ + tempoAdicional);
  }

  /**
   * @description Espera o elemento estar visível
   * @async
   * @param {!Locator} locator
   * @param {?Number} tempoAdicional
   */
  async waitVisibility(locator, tempoAdicional = 0) {
    await browser.wait(
        EC.visibilityOf(element(locator)), this.timeout_ + tempoAdicional);
  }

  /**
   * @description Espera o texto dentro do elemento ser o passado
   * @async
   * @param {!Locator} locator
   * @param {!String} texto
   * @param {?Number} tempoAdicional
   */
  async waitText(locator, texto, tempoAdicional = 0) {
    await browser.wait(
        EC.textToBePresentInElement(element(locator), texto),
        this.timeout_ + tempoAdicional);
  }
}
