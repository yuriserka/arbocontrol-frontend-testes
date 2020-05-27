import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { GoogleAccountPage } from './google_account.po';
import { googleAccount, blazeMeterAccount } from '../../common';
import { SmartWaiter } from '../smart_waiter';

/**
 * Responsável por prover interfaces para login utilizando tanto uma conta do
 * Google quanto com uma conta do Blaze Meter
 */
export class BlazeMeterPage {
  private botoes_: { [key: string]: SeleniumBy };
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
  async googleLogin() {
    await SmartWaiter.safeClick(this.botoes_.google);
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
    await SmartWaiter.safeClick(this.botoes_.login);
  }
}
