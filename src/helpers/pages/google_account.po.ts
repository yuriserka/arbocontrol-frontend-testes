import { browser, element } from 'protractor';
import { By } from 'selenium-webdriver';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from '../smart_waiter';

/**
 * Representa a página de login utilizando a conta do Google
 */
export class GoogleAccountPage {
  private botoes_: { [key: string]: SeleniumBy };
  private campos_: { [key: string]: SeleniumBy };

  constructor() {
    this.botoes_ = {
      proximo_email: By.id('identifierNext'),
      proximo_senha: By.id('passwordNext'),
    };

    this.campos_ = {
      email: By.name('identifier'),
      senha: By.name('password'),
    };
  }

  /**
   * Preenche email e senha na página de login que é aberta pelo
   * Blaze Meter
   *
   * @param email
   * @param senha
   */
  async login(email: string, senha: string) {
    await this.preencherEmail(email);
    await browser.sleep(1000);
    await SmartWaiter.waitVisibility(this.campos_.senha);
    await SmartWaiter.waitClick(this.botoes_.proximo_senha);
    await this.preencherSenha(senha);
  }

  /**
   * Preenche o email na página login que é aberta pelo Blaze Meter
   * @param email
   */
  private async preencherEmail(email: string) {
    await element(this.campos_.email).sendKeys(email);
    await element(this.botoes_.proximo_email).click();
  }

  /**
   * Preenche a Senha na página login que é aberta pelo Blaze
   * Meter, deve ser chamada após preencher o email
   * @param senha
   */
  private async preencherSenha(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
    await element(this.botoes_.proximo_senha).click();
  }
}
