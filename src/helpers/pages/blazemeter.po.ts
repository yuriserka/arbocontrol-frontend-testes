/**
 * @fileoverview
 */

import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { GoogleAccountPage } from './google_account.po';
import { googleAccount, blazeMeterAccount } from '../../../config';

/**
 * Responsável por prover interfaces para login utilizando o Google
 * quanto com uma conta do Blaze Meter
 */
export class BlazeMeterPage {
  /**
   * botões que necessitam de ser clicados
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
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
   * redireciona para a página de login do google e utiliza as
   * credenciais criadas.
   */
  async loginGoogle() {
    await element(this.botoes_.google).click();
    await new GoogleAccountPage().login(
      googleAccount.email,
      googleAccount.senha
    );
  }

  /**
   * preenche email e senha utilizando as credenciais criadas.
   */
  async login() {
    await element(this.campos_.email).sendKeys(blazeMeterAccount.email);
    await element(this.campos_.senha).sendKeys(blazeMeterAccount.senha);
    await element(this.botoes_.login).click();
  }
}
