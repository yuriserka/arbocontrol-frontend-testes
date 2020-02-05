import { Locator, element, ElementFinder, By } from 'protractor';

/**
 * Abstração para a interação com elementos <select> do HTML
 */
export class Selector {
  /**
   *
   * @param locator
   * @param opcaoProcurada
   */
  static async selectFrom(locator: Locator, opcaoProcurada: string) {
    await element(locator).click();

    const options: ElementFinder[] = await element(locator).all(
      By.xpath('.//option')
    );
    let found: ElementFinder | undefined;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if ((await option.getText()) === opcaoProcurada) {
        found = option;
        break;
      }
    }

    if (!found) {
      throw new Error(
        `não foi possivel encontrar a opção = '${opcaoProcurada}' na lista de opções`
      );
    }

    await found.click();
  }
}
