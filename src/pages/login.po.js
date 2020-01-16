/**
 * @fileoverview
 */

import {By, element} from 'protractor';
import {Utility} from '../helpers/utility';

const util = new Utility();

/**
 * @description Abstração da página de login
 */
export class LoginPage {
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
      entrar: By.xpath(
          `//*[@class='mat-raised-button mat-button-base mat-primary']`),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.campos_ = {
      cpf: By.xpath(`//*[@id='mat-input-0']`),
      senha: By.xpath(`//*[@id='mat-input-1']`),
      unidade: By.xpath(`//*[@id='mat-input-2']`),
    };
  }

  /**
   * @description Preenche os campos de cpf e senha, seleciona a primeira
   * unidade e então faz login
   * @async
   * @param {!String} cpf
   * @param {!String} senha
   */
  async login(cpf, senha) {
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarPrimeiraUnidade();
    await this.clicarBotaoEntrar();
  }

  /**
   * @description preenche o cpf
   * @example "111.111.111-11"
   * @async
   * @param {!String} cpf
   */
  async preencherCpf(cpf) {
    await element(this.campos_.cpf).sendKeys(cpf);
  }

  /**
   * @description preenche a senha
   * @async
   * @param {!String} senha
   */
  async preencherSenha(senha) {
    await element(this.campos_.senha).sendKeys(senha);
  }

  /**
   * @description Seleciona a primeira unidade da lista
   * @async
   */
  async selecionarPrimeiraUnidade() {
    await element(this.campos_.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await util.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);
    await element(primeiraUnidade).click();
  }

  /**
   * @description clica no botao pra fazer o login
   * @async
   */
  async clicarBotaoEntrar() {
    await element(this.botoes_.entrar).click();
  }
}
