const By = require('protractor').By;
const element = require('protractor').element;
const BlazePage = require('./pages/blazemeter.po');
const moment = require('moment');

class Recorder {
  constructor(browser) {
    this.browser = browser;

    this.botoes = {
      parar: By.xpath('//*[@id="stop"]/input'),
      pausar: By.xpath('//input[@title="Pause recording"]'),
      gravar: By.xpath('//input[@title="Start recording"]'),
      reset: By.xpath('//*[@id="reset"]/input'),
      salvar: By.xpath('//*[@id="button-download"]/div[1]/input'),
      login: By.xpath('//*[@id="sign-block"]/div/a[1]'),
    };

    this.input = {
      nome_arquivo: By.xpath('//input[@id="name"]'),
    };

    this.nome_arquivo = ('generated at ' + moment().format('lll')).replace(/[:\s*,]/g, '_');
  }

  get() {
    return this.browser.get('chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html');
  };

  async startRecording() {
    await this.browser.waitForAngularEnabled(false);
    await this.browser.executeScript('window.open()');
    const handles = await this.browser.getAllWindowHandles();
    await this.browser.switchTo().window(handles[1]);
    await this.get();
    await this.login(true);
    await this.start();
    await this.browser.switchTo().window(handles[0]);
    await this.browser.waitForAngularEnabled(true);
  };

  async stopRecording() {
    await this.browser.waitForAngularEnabled(false);
    await this.get();
    await this.stop();
    await this.save();
  };

  async login(withGoogle) {
    const blazeConfigPage = await this.browser.getWindowHandle();
    await element(this.botoes.login).click();
    const handles = await this.browser.getAllWindowHandles();
    // await this.browser.waitForAngularEnabled(false);
    await this.browser.switchTo().window(handles[2]);
    const blaze = new BlazePage(this.browser);
    withGoogle ? await blaze.loginGoogle() : await blaze.login();
    await this.browser.switchTo().window(blazeConfigPage);
  };

  async start() {
    await element(this.input.nome_arquivo).sendKeys(this.nome_arquivo);
    return element(this.botoes.gravar).click();
  };

  async stop() {
    return element(this.botoes.parar).click();
  };

  async pause() {
    return element(this.botoes.pausar).click();
  };

  async save() {
    await element(this.botoes.salvar).click();
    await element(By.xpath('//input[@name="chk-jmx"]')).click();
    const domains = await element.all(By.xpath('//input[@name="domains"]'));
    // nao testado ainda
    if (domains.length > 1) {
      domains.each(async (domain) => {
        await domain.click();
        console.log(await domain.getText());
      });
    }
    await element(By.xpath('//div[@class="button download-button"]')).click();
    await this.browser.sleep(20000);
  };
};

module.exports = Recorder;
