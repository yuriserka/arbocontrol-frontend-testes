const By = require('protractor').By;
const element = require('protractor').element;
const BlazePage = require('./pages/blazemeter.po');
const moment = require('moment');

const Recorder = function (browser) {
    this.botoes = {
        parar: By.xpath('//*[@id="stop"]/input'),
        pausar: By.xpath('//input[@title="Pause recording"]'),
        gravar: By.xpath('//input[@title="Start recording"]'),
        reset: By.xpath('//*[@id="reset"]/input'),
        salvar: By.xpath('//*[@id="button-download"]/div[1]/input'),
        login: By.xpath('//*[@id="sign-block"]/div/a[1]'),
    };
    this.input = {
        nome_arquivo: By.xpath('//input[@id="name"]')
    };
    this.nome_arquivo = ('generated at ' + moment().format('lll')).replace(/[:\s*,]/g, '_');

    this.get = function () {
        return browser.get('chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html');
    }

    this.startRecording = async function () {
        await browser.waitForAngularEnabled(false);
        await browser.executeScript('window.open()');
        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[1]);
        await this.get();
        await this.login(true);
        await this.start();
        await browser.switchTo().window(handles[0]);
        await browser.waitForAngularEnabled(true);
    }

    this.stopRecording = async function () {
        await browser.waitForAngularEnabled(false);
        await this.get();
        await this.stop();
        await this.save();
    }

    this.login = async function (withGoogle) {
        const blazeConfigPage = await browser.getWindowHandle()
        await element(this.botoes.login).click();
        browser.getAllWindowHandles().then(async (handles) => {
            await browser.waitForAngularEnabled(false);
            await browser.switchTo().window(handles[2]);
            const blaze = new BlazePage(browser);
            withGoogle ? await blaze.loginGoogle() : await blaze.login();
        });
        await browser.switchTo().window(blazeConfigPage);
    }

    this.start = async function () {
        await element(this.input.nome_arquivo).sendKeys(this.nome_arquivo);
        return element(this.botoes.gravar).click();
    }

    this.stop = async function () {
        return element(this.botoes.parar).click();
    }

    this.pause = async function () {
        return element(this.botoes.pausar).click();
    }

    this.save = async function () {
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
        await browser.sleep(20000);
    }
}

module.exports = Recorder;