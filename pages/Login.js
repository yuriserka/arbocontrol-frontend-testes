const Utility = require('../helpers/utility')

const ArboControl_Login_Page = function () {
  this.input = {
    cpf: By.xpath("//*[@id='mat-input-0']"),
    senha: By.xpath("//*[@id='mat-input-1']"),
    unidade: By.xpath("//*[@id='mat-input-2']"),
  }
  const util = new Utility()
  this.btn_entrar = By.xpath("//*[@class='mat-raised-button mat-button-base mat-primary']")

  this.get = async function () {
    await browser.get('https://admin.arbocontrol.com/login');
  };

  this.login = async function (cpf, senha) {
    await element(this.input.cpf).sendKeys(cpf)
    await element(this.input.senha).sendKeys(senha)

    await element(this.input.unidade).click()
    const lista_unidades = By.xpath("//*[@class='mat-option ng-star-inserted']");
    await util.waitVisibility(lista_unidades)
    const primeira_unidade = By.xpath("//*[@id=\"mat-option-0\"]");
    await element(primeira_unidade).click();

    await element(this.btn_entrar).click()
  }
};

module.exports = ArboControl_Login_Page;