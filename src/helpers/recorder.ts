/**
 * @fileoverview
 */

import moment = require('moment');
import { browser, By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { BlazeMeter } from './pages/blazemeter.po';
import { SmartWaiter } from './smart_waiter';

/**
 * Responsável pelas interações com a extensão do Blaze Meter
 */
export class Recorder {
  /**
   * botões que necessitam de ser clicados
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   */
  private campos_: { [key: string]: SeleniumBy };
  /**
   * data de geração do arquivo .jmx exportado
   */
  private nomeArquivo_: string;

  /**
   * @param funcionalidade nome da funcionalidade que será gravada
   */
  constructor(funcionalidade = 'null') {
    this.botoes_ = {
      parar: By.css('#stop > input'),
      pausar: By.css('#record-off > div > input'),
      gravar: By.css('#record > div > input'),
      reset: By.css('#reset> input'),
      salvar: By.css('#button-download > div.button_container > input'),
      login: By.css('#sign-block > div > a.login'),
    };
    this.campos_ = {
      nome_arquivo: By.css('#name'),
    };
    this.nomeArquivo_ = `func ${funcionalidade} generated at ${moment().format(
      'lll'
    )}`.replace(/[:\s*,]/g, '_');
  }

  /**
   * Acessa a página principal de configuração da extensão
   */
  private async get_() {
    await browser.get(
      'chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html'
    );
  }

  /**
   * Realiza todo o procedimento necessário para começar uma
   * gravação e então inicia ela.
   */
  async iniciar() {
    await browser.waitForAngularEnabled(false);
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    await this.get_();
    await this.login(false);
    await this.gravar();

    // retorna para a primeira aba aberta, para que os testes continuem
    await browser.switchTo().window(handles[0]);
    await browser.waitForAngularEnabled(true);
  }

  /**
   * Realiza todo o procedimento necessário para parar uma gravação
   * e então salva o arquivo .jmx gerado.
   */
  async terminar() {
    await browser.waitForAngularEnabled(false);
    await this.get_();
    await this.parar();
    await this.salvar();
  }

  /**
   * A partir da tela inicial da extensão, acessa a página de login
   * e faz o login
   * @param comGoogle
   */
  private async login(comGoogle: boolean) {
    const blazeConfigPage = await browser.getWindowHandle();
    await element(this.botoes_.login).click();

    const handles = await browser.getAllWindowHandles();
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[2]);

    const blaze = new BlazeMeter();
    comGoogle ? await blaze.loginGoogle() : await blaze.login();

    await SmartWaiter.waitUrl(
      'https://a.blazemeter.com/app/#/welcome-screen',
      5000
    );
    await browser.switchTo().window(blazeConfigPage);
    await browser.navigate().refresh();
  }

  /**
   * inicia a gravação do script
   */
  private async gravar() {
    await element(this.campos_.nome_arquivo).sendKeys(this.nomeArquivo_);
    await element(this.botoes_.gravar).click();
  }

  /**
   * para a gravação do script
   */
  private async parar() {
    await element(this.botoes_.parar).click();
  }

  /**
   * pausa a gravação do script
   */
  private async pause() {
    await element(this.botoes_.pausar).click();
  }

  /**
   * seleciona todos os dominios nos quais houveram requisições e
   * então baixa o arquivo na pasta "Downloads"
   */
  private async salvar() {
    await element(this.botoes_.salvar).click();
    await element(By.css('#chk-jmx')).click();

    element.all(By.name('domains')).each(async domain => {
      if (!domain) {
        return;
      }
      const isSelected = await domain.isSelected();
      if (isSelected) {
        return;
      }
      await domain.click();
    });

    await browser.sleep(1000);
    const btnDownload = By.css(
      '#run-overlay > div.download-body.body > div.button.download-button'
    );
    await SmartWaiter.waitClick(btnDownload);
    await element(btnDownload).click();

    // depois é melhor criar uma função que checa se o arquivo terminou de ser
    // baixado
    await browser.sleep(10000);
  }
}
