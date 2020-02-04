/**
 * @fileoverview
 */

const { Given, setDefaultTimeout, Then, When } = require('cucumber');
import { expect } from 'chai';
import { browser, By } from 'protractor';
import { CssEditor } from '../helpers/css_editor';
import { Recorder } from '../helpers/recorder';
import { HomePage } from '../pages/home.po';
import { LoginPage } from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const homePage = new HomePage();
let recorder: Recorder;
let recording = false;

Given(
  'que eu desejo obter um script de carga para a funcionalidade {string}',
  (funcionalidade: string) => {
    recorder = new Recorder(funcionalidade);
  }
);

Given('que eu navego até o site {string}', async (url: string) => {
  await browser.get(url);
  await browser.waitForAngular();
  if (recording) {
    await CssEditor.alterar(
      By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'),
      [{ atributo: 'display', valor: 'none' }]
    );
  }
});

When('eu entro com meu cpf {string}', async (cpf: string) => {
  await loginPage['preencherCpf'](cpf);
});

When('eu entro com minha senha {string}', async (senha: string) => {
  await loginPage['preencherSenha'](senha);
});

When('seleciono a primeira opção de unidade', async () => {
  await loginPage['selecionarPrimeiraUnidade']();
});

Then('eu clico para entrar', async () => {
  await loginPage['clicarBotaoEntrar']();
  await browser.waitForAngular();
});

Then(
  'meu nome {string} deve estar visível na página inicial',
  async (nome: string) => {
    expect(await homePage.getUsuarioLogado()).to.be.equal(nome);
  }
);

Then('eu faço Logoff', async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});

Then('eu inicio uma gravação do BlazeMeter', async () => {
  await recorder.iniciar();
  recording = true;
});

Then('paro a gravação do BlazeMeter', async () => {
  await recorder.terminar();
});
