const Utility = require('../helpers/utility');
const By = require('protractor').By;
const element = require('protractor').element;

const ArboControlLoginPage = function(browser) {
  this.input = {
    cpf: By.xpath(`//*[@id='mat-input-0']`),
    senha: By.xpath(`//*[@id='mat-input-1']`),
    unidade: By.xpath(`//*[@id='mat-input-2']`),
  };
  const util = new Utility();
  this.btnEntrar = By.xpath(`//*[@class='mat-raised-button mat-button-base mat-primary']`);

  this.get = async function() {
    await browser.get('https://admin.arbocontrol.com/login');
  };

  this.login = async function(cpf, senha) {
    await element(this.input.cpf).sendKeys(cpf);
    await element(this.input.senha).sendKeys(senha);

    await element(this.input.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await util.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);
    await element(primeiraUnidade).click();

    await element(this.btnEntrar).click();
  };
};

module.exports = ArboControlLoginPage;
