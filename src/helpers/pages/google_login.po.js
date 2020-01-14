/**
 * @fileoverview
 */

import {browser, By, element} from 'protractor';
import {Utility} from '../utility';

/**
 *
 */
export class GoogleAccount {
  constructor() {
    this.botoes = {
      proximo_email: By.xpath('//*[@id="identifierNext"]'),
      proximo_senha: By.xpath('//*[@id="passwordNext"]'),
    };

    this.input = {
      email: By.xpath('//*[@name="identifier"]'),
      senha: By.xpath('//*[@name="password"]'),
    };
  }

  /**
   * @param  {} email
   * @param  {} senha
   */
  async login(email, senha) {
    const util = new Utility();
    await this.preencherEmail(email);
    util.waitVisibility(this.input.senha);
    util.waitClick(this.botoes.proximo_senha);
    await browser.sleep(2000);
    await this.preencherSenha(senha);
    await browser.sleep(1500);
  };

  /**
   *
   * @param {*} email
   */
  async preencherEmail(email) {
    await element(this.input.email).sendKeys(email);
    return element(this.botoes.proximo_email).click();
  };

  /**
   *
   * @param {*} senha
   */
  async preencherSenha(senha) {
    await element(this.input.senha).sendKeys(senha);
    return element(this.botoes.proximo_senha).click();
  };
};
