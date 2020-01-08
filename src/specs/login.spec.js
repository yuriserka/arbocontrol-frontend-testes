const { setDefaultTimeout, Given, Then, When, BeforeAll, AfterAll } = require('cucumber');
const browser = require('protractor').browser;
const element = require('protractor').element;
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;
const LoginPage = require('../pages/login.po');
const HomePage = require('../pages/home.po');
const Recorder = require('../helpers/recorder');
const CssEditor = require('../helpers/css_editor');

setDefaultTimeout(60 * 1000);

const loginPage = new LoginPage(browser);
const homePage = new HomePage(browser);
const recorder = new Recorder(browser);
const cssEditor = new CssEditor(browser);

BeforeAll(async () => {
  await recorder.startRecording();
});

Given('que eu navego até o site {string}', async (url) => {
  await browser.get(url);
  await browser.waitForAngular();
  await cssEditor.change(By.xpath('//div[@class="ui-draggable ui-draggable-handle"]'), 'display', 'none');
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

Then('eu clico no botão {string}', async (nomeBotao) => {
  await loginPage.clicarBotaoEntrar();
  await browser.waitForAngular();
});

Then('meu nome {string} deve estar visível na página inicial', async (nome) => {
  expect(await homePage.getUsuarioLogado()).to.be.equal(nome);
});

Then('eu faço Logoff', async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal("http://localhost/login");
});

AfterAll(async () => {
  await recorder.stopRecording();
});