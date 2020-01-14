/**
 * @fileoverview
 */

import {expect} from 'chai';
import {Given, setDefaultTimeout, Then, When} from 'cucumber';
import {browser, By} from 'protractor';
import {CssEditor} from '../helpers/css_editor';
import {Recorder} from '../helpers/recorder';
import {HomePage} from '../pages/home.po';
import {LoginPage} from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage(browser);
const homePage = new HomePage(browser);
const recorder = new Recorder(browser);
const cssEditor = new CssEditor(browser);
let recording = false;

Given(
    'que eu desejo obter um script de carga para a funcionalidade {string}',
    (funcionalidade) => {
      recorder.nome_arquivo =
          `Fun_${funcionalidade}_`.concat(recorder.nome_arquivo);
    });

Given('que eu navego até o site {string}', async (url) => {
  await browser.get(url);
  await browser.waitForAngular();
  if (recording) {
    await cssEditor.change(
        By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'), 'display',
        'none');
  }
});

When('eu entro com meu cpf {string}', async (val) => {
  await loginPage.preencherCpf(val);
});

When('eu entro com minha senha {string}', async (val) => {
  await loginPage.preencherSenha(val);
});

When('seleciono a primeira opção de unidade', async () => {
  await loginPage.selecionarPrimeiraUnidade();
});

Then('eu clico para entrar', async () => {
  await loginPage.clicarBotaoEntrar();
  await browser.waitForAngular();
});

Then('meu nome {string} deve estar visível na página inicial', async (nome) => {
  expect(await homePage.getUsuarioLogado()).to.be.equal(nome);
});

Then('eu faço Logoff', async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});

Then('eu inicio uma gravação do BlazeMeter', async () => {
  await recorder.startRecording();
  recording = true;
});

Then('paro a gravação do BlazeMeter', async () => {
  await recorder.stopRecording();
});
