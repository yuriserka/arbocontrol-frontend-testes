/**
 * @fileoverview
 */

import {Given, setDefaultTimeout, Then, When} from 'cucumber';
import {browser} from 'protractor';
import {Recorder} from '../helpers/recorder';
import {LoginPage} from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const blazeRecorder = new Recorder();
let baseTab;

Given('que a extensão do Blaze Meter está instalada no Chrome', async () => {
  await browser.waitForAngularEnabled(false);
});

Then('abrirei uma nova aba', async () => {
  baseTab = await browser.getWindowHandle();
  await browser.executeScript('window.open()');
  const handles = await browser.getAllWindowHandles();
  await browser.waitForAngularEnabled(false);
  await browser.switchTo().window(handles[1]);
});

When('eu acessar a página de configuração {string}', async (blazeUrl) => {
  await browser.get(blazeUrl);
});

Then('farei login com os dados disponibilizados', async () => {
  await blazeRecorder.login(true);
});

When('eu acionar o botão de gravação', async () => {
  await blazeRecorder.start();
});

Then('navegarei até o site {string}', async (url) => {
  await browser.switchTo().window(baseTab);
  await browser.waitForAngularEnabled(true);
  await browser.get(url);
});

Then('farei login', async () => {
  const loginPage = new LoginPage();
  await loginPage.preencherCpf('055.232.031-57');
  await loginPage.preencherSenha('12345678');
  await loginPage.selecionarPrimeiraUnidade();
  await loginPage.clicarBotaoEntrar();
  await browser.waitForAngular();
});

Then(
    'acessarei novamente a página de configuração {string}',
    async (blazeUrl) => {
      await browser.waitForAngularEnabled(false);
      await browser.get(blazeUrl);
    });

Then('pararei a gravação', async () => {
  await blazeRecorder.stop();
});

Then('clicarei para salvar e o arquivo será exportado', async () => {
  await browser.waitForAngularEnabled(false);
  await blazeRecorder.save();
});
