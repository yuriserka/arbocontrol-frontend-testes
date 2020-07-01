import { By, browser } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from './smart_waiter';

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
    await browser.executeScript('window.scrollTo(0,0);');
    await SmartWaiter.safeClick(this.botoes_.sair);
  }
}
