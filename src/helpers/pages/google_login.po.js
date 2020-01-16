/**
 * @fileoverview
 */

import {browser, By, element, Locator} from 'protractor';
import {Utility} from '../utility';

/**
 * @description Representa a página de login utilizando a conta do Google
 */
export class GoogleAccount {
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
      proximo_email: By.xpath('//*[@id="identifierNext"]'),
      proximo_senha: By.xpath('//*[@id="passwordNext"]'),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.campos_ = {
      email: By.xpath('//*[@name="identifier"]'),
      senha: By.xpath('//*[@name="password"]'),
    };
  }

  /**
   * @description Preenche email e senha na página de login que é aberta pelo
   * Blaze Meter
   * @async
   * @param  {!String} email
   * @param  {!String} senha
   */
  async login(email, senha) {
    const util = new Utility();
    await this.preencherEmail_(email);
    await browser.sleep(1000);
    await util.waitVisibility(this.campos_.senha);
    await util.waitClick(this.botoes_.proximo_senha);
    await this.preencherSenha_(senha);
  }

  /**
   * @description Preenche o email na página login que é aberta pelo Blaze Meter
   * @private
   * @async
   * @param {!String} email
   */
  async preencherEmail_(email) {
    await element(this.campos_.email).sendKeys(email);
    await element(this.botoes_.proximo_email).click();
  }

  /**
   * @description Preenche a Senha na página login que é aberta pelo Blaze
   * Meter, deve ser chamada após preencher o email
   * @private
   * @async
   * @param {!String} senha
   */
  async preencherSenha_(senha) {
    await element(this.campos_.senha).sendKeys(senha);
    await element(this.botoes_.proximo_senha).click();
  }
}
