const Utility = require('../helpers/utility');
const By = require('protractor').By;
const element = require('protractor').element;
const util = new Utility();

class ArboControlLoginPage {
  constructor(browser) {
    this.browser = browser;

    this.input = {
      cpf: By.xpath(`//*[@id='mat-input-0']`),
      senha: By.xpath(`//*[@id='mat-input-1']`),
      unidade: By.xpath(`//*[@id='mat-input-2']`),
    };

    this.btnEntrar = By.xpath(`//*[@class='mat-raised-button mat-button-base mat-primary']`);
  }

  async login(cpf, senha) {
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarPrimeiraUnidade();
    return this.clicarBotaoEntrar();
  };

  preencherCpf(cpf) {
    return element(this.input.cpf).sendKeys(cpf);
  };

  preencherSenha(senha) {
    return element(this.input.senha).sendKeys(senha);
  };

  async selecionarPrimeiraUnidade() {
    await element(this.input.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await util.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);

    return element(primeiraUnidade).click();
  };

  clicarBotaoEntrar() {
    return element(this.btnEntrar).click();
  };
};

module.exports = ArboControlLoginPage;
