/**
 * @fileoverview
 */

import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from '../helpers/smart_waiter';

/**
 * Abstração da página de login
 * @category Páginas do sistema
 */
export class LoginPage {
  /**
   * botões que necessitam de ser clicados
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   * @private
   * @constant
   */
  private campos_: { [key: string]: SeleniumBy };

  /**
   * guarda o estado atual para evitar tentar fazer login novamente não estando na página correta
   * @private
   */
  private logado_: boolean;

  constructor() {
    this.botoes_ = {
      entrar: By.css(
        'body > app-root > app-main-nav > mat-sidenav-container > mat-sidenav-content > div > app-login-2 > div > mat-card > mat-card-content > form > div:nth-child(4) > button'
      ),
    };
    this.campos_ = {
      cpf: By.id('mat-input-0'),
      senha: By.id('mat-input-1'),
      unidade: By.id('mat-input-2'),
    };
    this.logado_ = false;
  }

  /**
   * Preenche os campos de cpf e senha, seleciona a primeira
   * unidade e então faz login
   * @async
   * @param {!string} cpf
   * @param {!string} senha
   */
  async login(cpf: string, senha: string) {
    if (this.logado_) {
      return;
    }
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarPrimeiraUnidade();
    await this.clicarBotaoEntrar();
    this.logado_ = true;
  }

  /**
   * preenche o cpf
   * @example const cpf = "111.111.111-11"
   * @async
   * @param {!string} cpf
   */
  private async preencherCpf(cpf: string) {
    await element(this.campos_.cpf).sendKeys(cpf);
  }

  /**
   * preenche a senha
   * @async
   * @param {!string} senha
   */
  private async preencherSenha(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
  }

  /**
   * Seleciona a primeira unidade da lista
   * @async
   */
  private async selecionarPrimeiraUnidade() {
    await element(this.campos_.unidade).click();
    const listaUnidades = By.xpath(`//*[@class='mat-option ng-star-inserted']`);
    await SmartWaiter.waitVisibility(listaUnidades);
    const primeiraUnidade = By.xpath(`//*[@id="mat-option-0"]`);
    await element(primeiraUnidade).click();
  }

  /**
   * clica no botao pra fazer o login
   * @async
   */
  private async clicarBotaoEntrar() {
    await element(this.botoes_.entrar).click();
  }
}
