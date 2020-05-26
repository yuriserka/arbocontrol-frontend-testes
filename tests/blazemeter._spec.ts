import { Given, setDefaultTimeout, Then, When } from 'cucumber';
import { browser } from 'protractor';
import { Recorder } from '../src/helpers/recorder';
import { LoginPage } from '../src/pages/login.po';
import { Usuario } from '../src/models/usuario';
import { timeout } from './helpers/common';

setDefaultTimeout(timeout);
const blazeRecorder = new Recorder();
let baseTab: string;

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

When(
  'eu acessar a página de configuração {string}',
  async (blazeUrl: string) => {
    await browser.get(blazeUrl);
  }
);

Then('farei login com os dados disponibilizados', async () => {
  await blazeRecorder['BlazeMeterlogin']();
});

When('eu acionar o botão de gravação', async () => {
  await blazeRecorder['gravar']();
});

Then('navegarei até o site {string}', async (url: string) => {
  await browser.switchTo().window(baseTab);
  await browser.waitForAngularEnabled(true);
  await browser.get(url);
});

Then('farei login', async () => {
  const user: Usuario = {
    cpf: '111.111.111-11',
    senha: '12345678',
    unidade: 'SES - AM',
  };
  await new LoginPage().login(user);
  await browser.waitForAngular();
});

Then(
  'acessarei novamente a página de configuração {string}',
  async (blazeUrl: string) => {
    await browser.waitForAngularEnabled(false);
    await browser.get(blazeUrl);
  }
);

Then('pararei a gravação', async () => {
  await blazeRecorder['parar']();
});

Then('clicarei para salvar e o arquivo será exportado', async () => {
  await browser.waitForAngularEnabled(false);
  await blazeRecorder['salvar']();
});
