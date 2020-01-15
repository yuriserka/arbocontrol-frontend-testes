/**
 * @fileoverview
 */

import dotenv from 'dotenv';
import {browser, By, element} from 'protractor';
import {GoogleAccount} from './google_login.po'
dotenv.config();

/**
 *
 */
export class BlazeMeter {
  constructor() {
    this.botoes = {
      google: By.xpath('//*[@id="zocial-google"]'),
      cadastrar: By.xpath('//*[@id="kc-form-buttons"]/input'),
      login: By.xpath('//*[@id="kc-login"]'),
    };

    this.input = {
      email: By.xpath('//*[@id="username"]'),
      senha: By.xpath('//*[@id="password"]'),
    };
  }

  /**
   *
   */
  async loginGoogle() {
    await element(this.botoes.google).click();
    await new GoogleAccount().login(
        process.env.GOOGLE_EMAIL, process.env.GOOGLE_SENHA);
  };

  /**
   *
   */
  async login() {
    await element(this.input.email).sendKeys(process.env.BLAZE_METER_EMAIL);
    await element(this.input.senha).sendKeys(process.env.BLAZE_METER_SENHA);
    return element(this.botoes.login).click();
  };
}
