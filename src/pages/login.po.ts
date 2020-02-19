/**
 * @packageDocumentation
 */

import { By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom } from '../helpers/selectors';

/**
 * Abstração da página de login
 * @category Páginas do sistema
 */
export class LoginPage {
  /**
   * botões que necessitam de ser clicados
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   */
  private campos_: { [key: string]: SeleniumBy };

  /**
   * guarda o estado atual para evitar tentar fazer login novamente não estando na página correta
   */
  private logado_: boolean;

  constructor() {
    this.botoes_ = {
      entrar: By.css(
        'body > app-root > app-main-nav > mat-sidenav-container > mat-sidenav-content > div > app-login-2 > div > mat-card > mat-card-content > form > div:nth-child(4) > button'
      ),
    };
    this.campos_ = {
      cpf: By.xpath('//input[@formcontrolname="cpf"]'),
      senha: By.xpath('//input[@formcontrolname="password"]'),
      unidade: By.xpath('//input[@formcontrolname="unidade"]'),
    };
    this.logado_ = false;
  }

  /**
   * Preenche os campos de cpf e senha, seleciona a primeira
   * unidade e então faz login
   * @param cpf
   * @param senha
   * @param unidade
   */
  async login(cpf: string, senha: string, unidade: string) {
    if (this.logado_) {
      return;
    }
    await this.preencherCpf(cpf);
    await this.preencherSenha(senha);
    await this.selecionarUnidade(unidade);
    await this.clicarBotaoEntrar();
    this.logado_ = true;
  }

  /**
   * preenche o cpf
   * @example const cpf = "111.111.111-11"
   * @param cpf
   */
  private async preencherCpf(cpf: string) {
    await element(this.campos_.cpf).sendKeys(cpf);
  }

  /**
   * preenche a senha
   * @param senha
   */
  private async preencherSenha(senha: string) {
    await element(this.campos_.senha).sendKeys(senha);
  }

  private async selecionarUnidade(nome: string) {
    await element(this.campos_.unidade).click();
    await selectFrom(By.xpath('//*[@role="option"]//span//span'), nome);
  }

  /**
   * clica no botao pra fazer o login
   */
  private async clicarBotaoEntrar() {
    await element(this.botoes_.entrar).click();
  }
}
