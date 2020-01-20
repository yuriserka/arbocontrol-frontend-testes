/**
 * @fileoverview
 */

import {browser, By, element} from 'protractor';
import {SmartWaiter} from '../smart_waiter';

/**
 * @description Representa a página de login utilizando a conta do Google
 */
export class GoogleAccount {
  botoes_: any;
  campos_: any;
  
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.botoes_ = {
      proximo_email: By.id('identifierNext'),
      proximo_senha: By.id('passwordNext'),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
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
    const waiter = new SmartWaiter();
    await this.preencherEmail_(email);
    await browser.sleep(1000);
    await waiter.waitVisibility(this.campos_.senha);
    await waiter.waitClick(this.botoes_.proximo_senha);
    await this.preencherSenha_(senha);
  }

  /**
   * @description Preenche o email na página login que é aberta pelo Blaze Meter
   * @private
   * @async
   * @param {!string} email
   */
  async preencherEmail_(email: string) {
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
  async preencherSenha_(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
    await element(this.botoes_.proximo_senha).click();
  }
}
