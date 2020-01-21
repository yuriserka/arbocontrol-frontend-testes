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
 * @description Responsável por esperas inteligentes
 */
export class SmartWaiter {
  /**
   * @description Representa o tempo máximo de espera para as condições
   * @private
   * @constant
   */
  private timeout_: number;

  constructor() {
    this.timeout_ = 10000;
  }
  /**
   * @description Espera o elemento estar disponivel para ser clicado
   * @async
   * @param {!Locator} locator
   * @param {?number} tempoAdicional
   */
  public async waitClick(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.elementToBeClickable(element(locator)),
      this.timeout_ + tempoAdicional
    );
  }

  /**
   * @description Espera até que a url mude para a passada como argumento
   * @async
   * @param {!string} url
   * @param {?number} tempoAdicional
   */
  public async waitUrl(url: string, tempoAdicional = 0) {
    await browser.wait(EC.urlIs(url), this.timeout_ + tempoAdicional);
  }

  /**
   * @description Espera o elemento estar visível
   * @async
   * @param {!Locator} locator
   * @param {?number} tempoAdicional
   */
  public async waitVisibility(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.visibilityOf(element(locator)),
      this.timeout_ + tempoAdicional
    );
  }

  /**
   * @description Espera o texto dentro do elemento ser o passado
   * @async
   * @param {!Locator} locator
   * @param {!string} texto
   * @param {?number} tempoAdicional
   */
  public async waitText(locator: Locator, texto: string, tempoAdicional = 0) {
    await browser.wait(
      EC.textToBePresentInElement(element(locator), texto),
      this.timeout_ + tempoAdicional
    );
  }
}
