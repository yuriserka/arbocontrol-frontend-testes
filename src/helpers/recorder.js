/**
 * @fileoverview
 */

import moment from 'moment';
import {browser, By, element} from 'protractor';
import {BlazeMeter} from './pages/blazemeter.po';
import {Utility} from './utility';

const util = new Utility();

/**
 * @description Responsável pelas interações com a extensão do Blaze Meter
 */
export class Recorder {
  /**
   * @param {?String} funcionalidade nome da funcionalidade que será gravada
   */
  constructor(funcionalidade = 'null') {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
      parar: By.xpath('//*[@id="stop"]/input'),
      pausar: By.xpath('//input[@title="Pause recording"]'),
      gravar: By.xpath('//input[@title="Start recording"]'),
      reset: By.xpath('//*[@id="reset"]/input'),
      salvar: By.xpath('//*[@id="button-download"]/div[1]/input'),
      login: By.xpath('//*[@id="sign-block"]/div/a[1]'),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.campos_ = {
      nome_arquivo: By.xpath('//input[@id="name"]'),
    };

    /**
     * @description data de geração do arquivo .jmx exportado
     * @private
     * @constant
     * @type {!String}
     */
    this.nome_arquivo_ =
        (`func ${funcionalidade} generated at ` + moment().format('lll'))
            .replace(/[:\s*,]/g, '_');
  }

  /**
   * @description Acessa a página principal de configuração da extensão
   * @private
   * @async
   */
  async get_() {
    await browser.get(
        'chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html');
  }

  /**
   * @description Realiza todo o procedimento necessário para começar uma
   * gravação e então inicia ela.
   * @async
   */
  async iniciar() {
    await browser.waitForAngularEnabled(false);
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    await this.get_();
    await this.login(true);
    await this.gravar();

    // retorna para a primeira aba aberta, para que os testes continuem
    await browser.switchTo().window(handles[0]);
    await browser.waitForAngularEnabled(true);
  }

  /**
   * @description Realiza todo o procedimento necessário para parar uma gravação
   * e então salva o arquivo .jmx gerado.
   * @async
   */
  async terminar() {
    await browser.waitForAngularEnabled(false);
    await this.get_();
    await this.parar();
    await this.salvar();
  }

  /**
   * @description A partir da tela inicial da extensão, acessa a página de login
   * e faz o login
   * @async
   * @param {Boolean} comGoogle
   */
  async login(comGoogle) {
    const blazeConfigPage = await browser.getWindowHandle();
    await element(this.botoes_.login).click();

    const handles = await browser.getAllWindowHandles();
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[2]);

    const blaze = new BlazeMeter();
    comGoogle ? await blaze.loginGoogle() : await blaze.login();

    await util.waitUrl('https://a.blazemeter.com/app/#/welcome-screen', 5000);
    await browser.switchTo().window(blazeConfigPage);
    await browser.navigate().refresh();
  }

  /**
   * @description inicia a gravação do script
   * @async
   */
  async gravar() {
    await element(this.campos_.nome_arquivo).sendKeys(this.nome_arquivo_);
    await element(this.botoes_.gravar).click();
  }

  /**
   * @description para a gravação do script
   * @async
   */
  async parar() {
    await element(this.botoes_.parar).click();
  }

  /**
   * @description pausa a gravação do script
   * @async
   */
  async pause() {
    await element(this.botoes_.pausar).click();
  }

  /**
   * @description seleciona todos os dominios nos quais houveram requisições e
   * então baixa o arquivo na pasta "Downloads"
   * @async
   */
  async salvar() {
    await element(this.botoes_.salvar).click();
    await element(By.xpath('//input[@name="chk-jmx"]')).click();

    element.all(By.xpath('//input[@name="domains"]')).each(async (domain) => {
      const isSelected = await domain.isSelected();
      if (isSelected) {
        return;
      }
      await domain.click();
    });

    await browser.sleep(1000);
    const btnDownload = By.xpath('//div[@class="button download-button"]');
    await util.waitClick(btnDownload);
    await element(btnDownload).click();

    // depois é melhor criar uma função que checa se o arquivo terminou de ser
    // baixado
    await browser.sleep(10000);
  }
}
