/**
 * @fileoverview
 */

import dotenv from 'dotenv';
import {By, element} from 'protractor';
import {GoogleAccount} from './google_account.po'
dotenv.config();

/**
 * @description Responsável por prover interfaces para login utilizando o Google
 * quanto com uma conta do Blaze Meter
 */
export class BlazeMeter {
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
      google: By.id('zocial-google'),
      login: By.id('kc-login'),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.campos_ = {
      email: By.id('username'),
      senha: By.id('password'),
    };
  }

  /**
   * @description redireciona para a página de login do google e utiliza as
   * credenciais criadas.
   * @async
   */
  async loginGoogle() {
    await element(this.botoes_.google).click();
    await new GoogleAccount().login(
        process.env.GOOGLE_EMAIL, process.env.GOOGLE_SENHA);
  }

  /**
   * @description preenche email e senha utilizando as credenciais criadas.
   * @async
   */
  async login() {
    await element(this.campos_.email).sendKeys(process.env.BLAZE_METER_EMAIL);
    await element(this.campos_.senha).sendKeys(process.env.BLAZE_METER_SENHA);
    await element(this.botoes_.login).click();
  }
}
