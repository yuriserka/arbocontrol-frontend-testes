/**
 * @fileoverview
 */

import { Locator, element, WebElement } from "protractor";
import { WebDriverLocator } from "protractor/built/locators";

/**
 * 
 */
export class DataTable {
  /**
   * @description retorna todos os {WebElements} localizados no caminho especificado
   * @param locator 
   * @async
   * @static
   */
  static async getAllRows(locator: Locator) {
    return element.all(locator).getWebElements();
  }

  /**
   * @description Retorna um {?WebElement} localizado no nó passado no parametro locator que contenha o mesmo texto que o passado em textoProcurado.
   * É possível passar um complemento para o nó buscado, este de onde será extraído o texto para comparação,
   * sendo assim é possível retornar um nó que não seja o qual o elemento com texto está localizado.
   * @param locator 
   * @param textoProcurado
   * @async
   * @static
   */
  static async findTextIn(locator: Locator, textoProcurado: string, textLocator?: WebDriverLocator) {
    const rows = await this.getAllRows(locator);
    const getNome = async (row: WebElement) => {
      if (textLocator) {
        return row.findElement(textLocator).getText();
      }
      return row.getText();
    }
    let found: undefined | WebElement;
    for (const row of rows) {
      const nome = await getNome(row);
      if (nome === textoProcurado) {
        found = row;
        break;
      }
    }
    if (!found) {
      throw new Error(`não foi possivel encontrar o elemento com texto = '${textoProcurado}' na tabela`);
    }
    return found;
  }
}