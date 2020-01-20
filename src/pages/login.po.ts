/**
 * @fileoverview
 */

import {By, element} from 'protractor';

import {SmartWaiter} from '../helpers/smart_waiter';

const waiter = new SmartWaiter();

/**
 * @description Abstração da página de login
 * @category Páginas do sistema
 */
export class LoginPage {
  botoes_: any;
  campos_: any;
  
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.botoes_ = {
      entrar: By.css(
          'body > app-root > app-main-nav > mat-sidenav-container > mat-sidenav-content > div > app-login-2 > div > mat-card > mat-card-content > form > div:nth-child(4) > button'),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!string, !Locator>}
     */
    this.campos_ = {
      cpf: By.id('mat-input-0'),
      senha: By.id('mat-input-1'),
      unidade: By.id('mat-input-2'),
    };
  }

  /**
   * @description Preenche os campos de cpf e senha, seleciona a primeira
   * unidade e então faz login
   * @async
   * @param {!string} cpf
   * @param {!string} senha
   */
  async login(cpf: string, senha: string) {
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarPrimeiraUnidade();
    await this.clicarBotaoEntrar();
  }

  /**
   * @description preenche o cpf
   * @example const cpf = "111.111.111-11"
   * @async
   * @param {!string} cpf
   */
  async preencherCpf(cpf: string) {
    await element(this.campos_.cpf).sendKeys(cpf);
  }

  /**
   * @description preenche a senha
   * @async
   * @param {!string} senha
   */
  async preencherSenha(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
  }

  /**
   * @description Seleciona a primeira unidade da lista
   * @async
   */
  async selecionarPrimeiraUnidade() {
    await element(this.campos_.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await waiter.waitVisibility(listaUnidades);
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
