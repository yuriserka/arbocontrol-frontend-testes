/**
 * @packageDocumentation
 */

import {
  browser,
  element,
  ExpectedConditions as EC,
  Locator,
} from 'protractor';

/**
 * Representa o tempo máximo de espera para as condições
 */
const timeout = 10000;

/**
 * Responsável por esperas inteligentes
 */
export class SmartWaiter {
  /**
   * Espera o elemento estar disponivel para ser clicado
   *
   * @param locator
   * @param tempoAdicional
   */
  static async waitClick(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.elementToBeClickable(element(locator)),
      timeout + tempoAdicional
    );
  }

  /**
   * Espera até que a url mude para a passada como argumento
   * @param url
   * @param tempoAdicional
   */
  static async waitUrl(url: string, tempoAdicional = 0) {
    await browser.wait(EC.urlIs(url), timeout + tempoAdicional);
  }

  /**
   * Espera até que a url tenha algum pedaço que de match com a string passada
   * 
   * @param str 
   * @param tempoAdicional 
   */
  static async waitUrlContain(str: string, tempoAdicional = 0) {
    await browser.wait(EC.urlContains(str), timeout + tempoAdicional);
  }

  /**
   * Espera o elemento estar visível
   *
   * @param locator
   * @param tempoAdicional
   */
  static async waitVisibility(locator: Locator, tempoAdicional = 0) {
    await browser.wait(
      EC.visibilityOf(element(locator)),
      timeout + tempoAdicional
    );
  }

  /**
   * Espera o texto dentro do elemento ser o passado
   *
   * @param locator
   * @param texto
   * @param tempoAdicional
   */
  static async waitText(locator: Locator, texto: string, tempoAdicional = 0) {
    await browser.wait(
      EC.textToBePresentInElement(element(locator), texto),
      timeout + tempoAdicional
    );
  }
}
