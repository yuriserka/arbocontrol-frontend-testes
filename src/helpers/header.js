const By = require('protractor').By;
const element = require('protractor').element;

const Header = function () {
  this.botoes = {
      sair: By.xpath('//button[@class="mat-button mat-button-base ng-star-inserted"]')
  }

  this.mostrarBarraDeNavegacao = function () {
    return require('./navbar').exibir();
  }

  this.logout = function() {
    return element(this.botoes.sair).click();
  }
}

module.exports = Header;