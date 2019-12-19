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
    this.nome_arquivo = ('generated at ' + moment().format('lll')).replace(/[:| *|,]/g, '_');

    this.get = function () {
        return browser.get('chrome-extension://mbopgmdnpcbohhpnfglgohlbhfongabi/html/popup.html');
    }

    this.login = async function (withGoogle) {
        const blazeConfigPage = await browser.getWindowHandle()
        await element(this.botoes.login).click();
        browser.getAllWindowHandles().then(async (handles) => {
            await browser.switchTo().window(handles[2]);
            const blaze = new BlazePage(browser);
            if (withGoogle) {
                await blaze.loginGoogle();
            }
            await blaze.login();
        });
        await browser.switchTo().window(blazeConfigPage);
    }

    this.register = async function () {
        await element(this.botoes.login).click();
        const blaze = new BlazePage(browser);
        blaze.cadastrar();
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
        await element(By.xpath('//*[@id="domain-gleytonlima.com"]')).click();
        await element(By.xpath('//div[@class="button download-button"]')).click();
        await browser.sleep(20000);
    }
}

module.exports = Recorder;