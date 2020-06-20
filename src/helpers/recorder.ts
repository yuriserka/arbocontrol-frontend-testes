const moment = require('moment');
import { browser, By, element } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { BlazeMeterPage } from './pages/blazemeter.po';
import { SmartWaiter } from './smart_waiter';
import * as path from 'path';

/**
 * variavel responsavel por indicar se ja foi feito um login para usar o blazemeter
 */
let logado = false;

/**
 * Responsável pelas interações com a extensão do Blaze Meter
 */
export class Recorder {
  private botoes_: { [key: string]: SeleniumBy };
  private campos_: { [key: string]: SeleniumBy };
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
   * Realiza todo o procedimento necessário para começar uma
   * gravação e então inicia ela.
   */
  async iniciar() {
    await browser.waitForAngularEnabled(false);
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    await this.get();

    // espera 2 segundos para carregar a informação se está logado ou nao
    await SmartWaiter.waitOneSecondPlus(1);

    if (!(await this.isLogado())) {
      await this.BlazeMeterlogin();
    }

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
    await this.get();
    await this.parar();
    await this.salvar();
  }

  /**
   * Acessa a página principal de configuração da extensão
   */
  private async get() {
    await browser.get(
      'chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html'
    );
  }

  /**
   * A partir da tela inicial da extensão, acessa a página de login
   * e faz o login utilizando a conta do BlazeMeter
   */
  private async BlazeMeterlogin() {
    const blazeConfigPage = await browser.getWindowHandle();
    await SmartWaiter.safeClick(this.botoes_.login);

    const handles = await browser.getAllWindowHandles();
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[2]);

    const blaze = new BlazeMeterPage();
    await blaze.login();

    await SmartWaiter.waitUrlContain('https://a.blazemeter.com/app/', 10000);

    await browser.close();
    await browser.switchTo().window(blazeConfigPage);
    await browser.navigate().refresh();
  }

  /**
   * A partir da tela inicial da extensão, acessa a página de login
   * e faz o login utilizando a conta do Google
   */
  private async Googlelogin() {
    const blazeConfigPage = await browser.getWindowHandle();
    await SmartWaiter.safeClick(this.botoes_.login);

    const handles = await browser.getAllWindowHandles();
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[2]);

    const blaze = new BlazeMeterPage();
    await blaze.googleLogin();

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
    const filenameField = element(this.campos_.nome_arquivo);
    await filenameField.clear();
    await filenameField.sendKeys(this.nomeArquivo_);
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
      if (!domain || (await domain.isSelected())) {
        return;
      }
      await domain.click();
    });

    await SmartWaiter.waitOneSecond();
    const btnDownload = By.css(
      '#run-overlay > div.download-body.body > div.button.download-button'
    );
    await SmartWaiter.waitClick(btnDownload);
    await element(btnDownload).click();

    const filename = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'reports',
      'downloads',
      `${this.nomeArquivo_}.jmx`
    );

    await SmartWaiter.waitFile(filename, 10000);
  }

  private async isLogado() {
    if (logado) {
      return true;
    }
    try {
      await element(By.xpath('//div[@class="welcome"]')).getWebElement();
      logado = true;
    } catch (err) {
      console.log({ err });
      logado = false;
    }
    return logado;
  }
}
