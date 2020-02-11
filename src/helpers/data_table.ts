/**
 * @fileoverview
 */

import {
  Locator,
  element,
  ElementArrayFinder,
  ElementFinder,
} from 'protractor';
import { WebDriverLocator } from 'protractor/built/locators';

/**
 * Abstração para a captura de valores em formato tabular
 */
export class DataTable {
  /**
   * retorna todos os webelements localizados no caminho especificado
   * @param locator
   */
  static getAllRows(locator: Locator): ElementArrayFinder {
    return element.all(locator);
  }

  /**
   * Retorna um ElementFinder correspondente ao nó passado no parametro rootLocator que contenha o mesmo texto que o passado em textoProcurado.
   * É possível passar um complemento para o nó buscado, este de onde será extraído o texto para comparação,
   * sendo assim é possível retornar um nó que não seja o qual o elemento com texto está localizado.
   * @param rootLocator nó raíz que será retornado
   * @param textoProcurado texto desejado a ser buscado
   * @param textLocator caminho para onde estará localizado o texto
   */
  static async getNodeWithText(
    rootLocator: Locator,
    textoProcurado: string,
    textLocator?: WebDriverLocator
  ): Promise<ElementFinder> {
    const rows = await this.getAllRows(rootLocator);
    const nomes: string[] = await this.getAllRows(rootLocator).map(r => {
      if (textLocator) {
        return r?.all(textLocator).getText();
      }
      return r?.getText();
    });

    const index = [
      ...new Set(nomes.reduce((acc, curr) => acc.concat(curr), [] as string[])),
    ].indexOf(textoProcurado);

    if (index < 0) {
      throw new Error(
        `não foi possivel encontrar o elemento com texto = '${textoProcurado}' na tabela`
      );
    }

    return rows[index];
  }
}
