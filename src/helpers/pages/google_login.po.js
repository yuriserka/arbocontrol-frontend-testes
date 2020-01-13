const By = require('protractor').By;
const element = require('protractor').element;
const Util = require('../utility');


class GoogleAccount {
  constructor(browser) {
    this.browser = browser;
    
    this.botoes = {
      proximo_email: By.xpath('//*[@id="identifierNext"]'),
      proximo_senha: By.xpath('//*[@id="passwordNext"]'),
    };
    this.input = {
      email: By.xpath('//*[@name="identifier"]'),
      senha: By.xpath('//*[@name="password"]'),
    };
  }
  
  async login(email, senha) {
    const util = new Util();
    await this.preencherEmail(email);
    util.waitVisibility(this.input.senha);
    util.waitClick(this.botoes.proximo_senha);
    await this.browser.sleep(2000);
    await this.preencherSenha(senha);
    await this.browser.sleep(1500);
  };

  async preencherEmail(email) {
    await element(this.input.email).sendKeys(email);
    return element(this.botoes.proximo_email).click();
  };

  async preencherSenha(senha) {
    await element(this.input.senha).sendKeys(senha);
    return element(this.botoes.proximo_senha).click();
  };
};

module.exports = GoogleAccount;
