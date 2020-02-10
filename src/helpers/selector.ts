import { Locator, element, ElementFinder, By } from 'protractor';
import { WebDriverLocator } from 'protractor/built/locators';

/**
 * Abstração para a interação com elementos <select> do HTML
 */
export class Selector {
  /**
   *
   * @param locator
   * @param opcaoProcurada
   */
  static async selectFrom(
    locator: Locator,
    opcaoProcurada: string,
    textLocator?: WebDriverLocator
  ) {
    const options: ElementFinder[] = await element.all(locator);
    let found: ElementFinder | undefined;

    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const text = textLocator
        ? await option.element(textLocator).getText()
        : await option.getText();
      if (text === opcaoProcurada) {
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
