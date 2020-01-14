/**
 * @fileoverview
 */

import moment from 'moment';
import {browser, By, element} from 'protractor';
import {BlazeMeter} from './pages/blazemeter.po';
import {Utility} from './utility';

const util = new Utility();

/**
 *
 */
export class Recorder {
  constructor() {
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

    this.nome_arquivo =
        ('generated at ' + moment().format('lll')).replace(/[:\s*,]/g, '_');
  }

  /**
   *
   */
  get() {
    return browser.get(
        'chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html');
  };

  /**
   *
   */
  async startRecording() {
    await browser.waitForAngularEnabled(false);
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles();
    await browser.switchTo().window(handles[1]);
    await this.get();
    await this.login(true);
    await this.start();
    await browser.switchTo().window(handles[0]);
    await browser.waitForAngularEnabled(true);
  };

  /**
   *
   */
  async stopRecording() {
    await browser.waitForAngularEnabled(false);
    await this.get();
    await this.stop();
    await this.save();
  };

  /**
   *
   * @param {*} withGoogle
   */
  async login(withGoogle) {
    const blazeConfigPage = await browser.getWindowHandle();
    await element(this.botoes.login).click();
    const handles = await browser.getAllWindowHandles();
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[2]);
    const blaze = new BlazeMeter();
    withGoogle ? await blaze.loginGoogle() : await blaze.login();
    await browser.switchTo().window(blazeConfigPage);
  };

  /**
   *
   */
  async start() {
    await element(this.input.nome_arquivo).sendKeys(this.nome_arquivo);
    return element(this.botoes.gravar).click();
  };

  /**
   *
   */
  async stop() {
    return element(this.botoes.parar).click();
  };

  /**
   *
   */
  async pause() {
    return element(this.botoes.pausar).click();
  };

  /**
   *
   */
  async save() {
    await element(this.botoes.salvar).click();
    await element(By.xpath('//input[@name="chk-jmx"]')).click();
    // ta dando errado aqui
    element.all(By.xpath('//input[@name="domains"]')).each(async (domain) => {
      const isSelected = await domain.isSelected();
      if (isSelected) {
        return;
      }
      await domain.click();
    });
    const saveBtn = By.xpath('//div[@class="button download-button"]');
    await util.waitClick(saveBtn);
    await element(saveBtn).click();
    await browser.sleep(10000);
  };
};
