const By = require('protractor').By;
const element = require('protractor').element;
const GoogleLoginPage = require('./google_login.po');
require('dotenv').config();

class BlazeMeter {
  constructor(browser) {
    this.browser = browser;

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

  async loginGoogle() {
    await element(this.botoes.google).click();
    await new GoogleLoginPage(this.browser).login(process.env.GOOGLE_EMAIL, process.env.GOOGLE_SENHA);
  };

  async login() {
    await element(this.input.email).sendKeys(process.env.BLAZE_METER_EMAIL);
    await element(this.input.senha).sendKeys(process.env.BLAZE_METER_SENHA);
    return element(this.botoes.login).click();
  };
}

module.exports = BlazeMeter;
