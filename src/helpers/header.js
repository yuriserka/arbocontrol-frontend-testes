const By = require('protractor').By;
const element = require('protractor').element;

class Header {
  constructor() {
    this.botoes = {
      sair: By.xpath('//button[@class="mat-button mat-button-base ng-star-inserted"]'),
    };
  }

  mostrarBarraDeNavegacao() {
    return require('./navbar').exibir();
  };

  logout() {
    return element(this.botoes.sair).click();
  };
};

module.exports = Header;
