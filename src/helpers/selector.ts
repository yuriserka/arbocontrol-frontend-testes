import { Locator, element, ElementFinder } from 'protractor';

/**
 * Abstração para a interação com campos que precisam que uma opção seja selecionada
 */
export class Selector {
  /**
   * seleciona uma opção de um array de opções
   * @param locator caminho para um ou mais nós que possuam um texto dentro para ser comparado
   * @param opcaoProcurada string que deverá ser comparada
   */
  static async selectFrom(locator: Locator, opcaoProcurada: string) {
    const options: ElementFinder[] = await element.all(locator);
    for (let i = 0; i < options.length; ++i) {
      const option = options[i];
      const text = await option.getText();
      if (text === opcaoProcurada) {
        return option.click();
      }
    }
    throw new Error(
      `não foi possivel encontrar a opção = '${opcaoProcurada}' na lista de opções`
    );
  }
}
