import {
  browser,
  element,
  ExpectedConditions as EC,
  Locator,
} from 'protractor';
import * as fs from 'fs';

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
   * @param locator
   * @param tempoAdicionalMs
   */
  static async waitClick(locator: Locator, tempoAdicionalMs = 0) {
    await browser.wait(
      EC.elementToBeClickable(element(locator)),
      timeout + tempoAdicionalMs
    );
  }

  /**
   * Espera até que a url mude para a passada como argumento
   * @param url
   * @param tempoAdicionalMs
   */
  static async waitUrl(url: string, tempoAdicionalMs = 0) {
    await browser.wait(EC.urlIs(url), timeout + tempoAdicionalMs);
  }

  /**
   * Espera até que a url tenha como substring a string passada
   * @param str
   * @param tempoAdicionalMs
   */
  static async waitUrlContain(str: string, tempoAdicionalMs = 0) {
    await browser.wait(EC.urlContains(str), timeout + tempoAdicionalMs);
  }

  /**
   * Espera o elemento estar visível
   * @param locator
   * @param tempoAdicionalMs
   */
  static async waitVisibility(locator: Locator, tempoAdicionalMs = 0) {
    await browser.wait(
      EC.visibilityOf(element(locator)),
      timeout + tempoAdicionalMs
    );
  }

  /**
   * Espera até que a quantidade de elementos seja maior do que 0, ou seja, que
   * tenha dados presentes
   * @param locator
   * @param tempoAdicionalMs
   */
  static async waitTableRows(locator: Locator, tempoAdicionalMs = 0) {
    await browser.wait(async () => {
      const rows = element.all(locator);
      const countValue = await rows.count();
      return countValue > 0;
    }, timeout + tempoAdicionalMs);
  }

  /**
   * Espera o texto dentro do elemento ser o passado
   * @param locator
   * @param texto
   * @param tempoAdicionalMs
   */
  static async waitText(locator: Locator, texto: string, tempoAdicionalMs = 0) {
    await browser.wait(
      EC.textToBePresentInElement(element(locator), texto),
      timeout + tempoAdicionalMs
    );
  }

  /**
   * Espera que o arquivo com o nome passado exista no sistema de arquivos
   * @param filename
   * @param tempoAdicionalMs
   */
  static async waitFile(filename: string, tempoAdicionalMs = 0) {
    await browser.wait(
      () => fs.existsSync(filename),
      timeout + tempoAdicionalMs
    );
  }

  /**
   * Espera a visibilidade do elemento, espera ele ser clicavel, move o mouse
   * até a devida posição e entao realiza o clique
   * @param locator
   * @param tempoAdicionalMs
   */
  static async safeClick(locator: Locator, tempoAdicionalMs = 0) {
    await SmartWaiter.waitVisibility(locator, tempoAdicionalMs);
    await SmartWaiter.waitClick(locator, tempoAdicionalMs);
    await browser
      .actions()
      .mouseMove(await element(locator).getWebElement())
      .perform();
    await element(locator).click();
  }

  /**
   * Espera 1 segundo
   * @param tempoAdicionalMs
   */
  static async waitOneSecond(tempoAdicionalSegundos = 0) {
    await browser.sleep((1 + tempoAdicionalSegundos) * 1000);
  }
}
