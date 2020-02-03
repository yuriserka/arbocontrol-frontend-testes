/**
 * @fileoverview
 */

import { browser, element } from 'protractor';
import { By } from 'selenium-webdriver';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from '../smart_waiter';

/**
 * @description Representa a página de login utilizando a conta do Google
 */
export class GoogleAccount {
  /**
   * @description botões que necessitam de ser clicados
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * @description campos que devem ser preenchidos
   * @private
   * @constant
   */
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
   * @description Preenche email e senha na página de login que é aberta pelo
   * Blaze Meter
   * @async
   * @param  {!string} email
   * @param  {!string} senha
   */
  async login(email: string, senha: string) {
    await this.preencherEmail_(email);
    await browser.sleep(1000);
    await SmartWaiter.waitVisibility(this.campos_.senha);
    await SmartWaiter.waitClick(this.botoes_.proximo_senha);
    await this.preencherSenha_(senha);
  }

  /**
   * @description Preenche o email na página login que é aberta pelo Blaze Meter
   * @private
   * @async
   * @param {!string} email
   */
  private async preencherEmail_(email: string) {
    await element(this.campos_.email).sendKeys(email);
    await element(this.botoes_.proximo_email).click();
  }

  /**
   * @description Preenche a Senha na página login que é aberta pelo Blaze
   * Meter, deve ser chamada após preencher o email
   * @private
   * @async
   * @param {!string} senha
   */
  private async preencherSenha_(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
    await element(this.botoes_.proximo_senha).click();
  }
}
