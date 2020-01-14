/**
 * @fileoverview
 */

import {By, element} from 'protractor';
import {Utility} from '../helpers/utility';

const util = new Utility();

/**
 *
 */
export class LoginPage {
  constructor() {
    this.input = {
      cpf: By.xpath(`//*[@id='mat-input-0']`),
      senha: By.xpath(`//*[@id='mat-input-1']`),
      unidade: By.xpath(`//*[@id='mat-input-2']`),
    };

    this.btnEntrar =
        By.xpath(`//*[@class='mat-raised-button mat-button-base mat-primary']`);
  }

  /**
   *
   * @param {*} cpf
   * @param {*} senha
   */
  async login(cpf, senha) {
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarPrimeiraUnidade();
    return this.clicarBotaoEntrar();
  };

  /**
   *
   * @param {*} cpf
   */
  preencherCpf(cpf) {
    return element(this.input.cpf).sendKeys(cpf);
  };

  /**
   *
   * @param {*} senha
   */
  preencherSenha(senha) {
    return element(this.input.senha).sendKeys(senha);
  };

  /**
   *
   */
  async selecionarPrimeiraUnidade() {
    await element(this.input.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await util.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);

    return element(primeiraUnidade).click();
  };

  /**
   *
   */
  clicarBotaoEntrar() {
    return element(this.btnEntrar).click();
  };
};
