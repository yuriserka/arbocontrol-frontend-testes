import { By, element, browser } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';

/**
 * Represena a barra de navegação superior do site arbocontrol
 */
export class ToolBar {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    this.botoes_ = {
      sair: By.xpath('//button/span[text()="Sair"]'),
    };
  }

  /**
   * clica no botão de sair
   */
  async logout() {
    await browser
      .actions()
      .mouseMove(await element(this.botoes_.sair).getWebElement())
      .perform();
    await element(this.botoes_.sair).click();
  }
}
