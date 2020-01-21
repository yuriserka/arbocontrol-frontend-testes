/**
 * @fileoverview
 */

import dotenv = require('dotenv');
import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { GoogleAccount } from './google_account.po';

dotenv.config();

/**
 * @description Responsável por prover interfaces para login utilizando o Google
 * quanto com uma conta do Blaze Meter
 */
export class BlazeMeter {
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
      google: By.id('zocial-google'),
      login: By.id('kc-login'),
    };
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
  public async loginGoogle() {
    await element(this.botoes_.google).click();
    await new GoogleAccount().login(
      process.env.GOOGLE_EMAIL || 'none',
      process.env.GOOGLE_SENHA || 'none'
    );
  }

  /**
   * @description preenche email e senha utilizando as credenciais criadas.
   * @async
   */
  public async login() {
    await element(this.campos_.email).sendKeys(
      process.env.BLAZE_METER_EMAIL || 'none'
    );
    await element(this.campos_.senha).sendKeys(
      process.env.BLAZE_METER_SENHA || 'none'
    );
    await element(this.botoes_.login).click();
  }
}
