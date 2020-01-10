const Utility = require('../helpers/utility');
const By = require('protractor').By;
const element = require('protractor').element;
const util = new Utility();

const ArboControlLoginPage = function (browser) {
  this.input = {
    cpf: By.xpath(`//*[@id='mat-input-0']`),
    senha: By.xpath(`//*[@id='mat-input-1']`),
    unidade: By.xpath(`//*[@id='mat-input-2']`),
  };
  this.btnEntrar = By.xpath(`//*[@class='mat-raised-button mat-button-base mat-primary']`);

  this.preencherCpf = function (cpf) {
    return element(this.input.cpf).sendKeys(cpf);
  };

  this.preencherSenha = function (senha) {
    return element(this.input.senha).sendKeys(senha);
  };

  this.selecionarPrimeiraUnidade = async function () {
    await element(this.input.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await util.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);

    return element(primeiraUnidade).click();
  };

  this.clicarBotaoEntrar = function () {
    return element(this.btnEntrar).click();
  };
};

module.exports = ArboControlLoginPage;
