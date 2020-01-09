const { setDefaultTimeout, Given, Then, When } = require('cucumber');
const browser = require('protractor').browser;
const chai = require('chai');
const LoginPage = require('../pages/login.po');
const Recorder = require('../helpers/recorder');
chai.use(require('chai-as-promised'));

setDefaultTimeout(60 * 1000);
const blazeRecorder = new Recorder(browser);
let base_tab;

Given('que a extensão do Blaze Meter está instalada no Chrome', async function () {
    await browser.waitForAngularEnabled(false);
    return;
});

Then('abrirei uma nova aba', async function () {
    base_tab = await browser.getWindowHandle();
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles()
    await browser.waitForAngularEnabled(false);
    await browser.switchTo().window(handles[1]);
});

When('eu acessar a página de configuração {string}', async function (blaze_url) {
    await browser.get(blaze_url);
});

Then('farei login com os dados disponibilizados', async function () {
    await blazeRecorder.login(false);
});

When('eu acionar o botão de gravação', async function () {
    await blazeRecorder.start();
});

Then('navegarei até o site {string}', async function (url) {
    await browser.switchTo().window(base_tab);
    await browser.waitForAngularEnabled(true);
    await browser.get(url);
});

Then('farei login', async function () {
    const loginPage = new LoginPage(browser);
    await loginPage.preencherCpf('055.232.031-57');
    await loginPage.preencherSenha('12345678');
    await loginPage.selecionarPrimeiraUnidade();
    await loginPage.clicarBotaoEntrar();
    await browser.waitForAngular();
});

Then('acessarei novamente a página de configuração {string}', async function (blaze_url) {
    await browser.waitForAngularEnabled(false);
    await browser.get(blaze_url);
});

Then('pararei a gravação', async function () {
    await blazeRecorder.stop();
});

Then('clicarei para salvar e o arquivo será exportado', async function () {
    await browser.waitForAngularEnabled(false);
    await blazeRecorder.save();
});
