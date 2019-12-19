const By = require('protractor').By;
const element = require('protractor').element;
require('dotenv').config();

const BlazeMeter = function (browser) {
    this.botoes = {
        google: By.xpath('//*[@id="zocial-google"]'),
        cadastrar: By.xpath('//*[@id="kc-form-buttons"]/input'),
        login: By.xpath('//*[@id="kc-login"]')
    };

    this.input = {
        email: By.xpath('//*[@id="username"]'),
        senha: By.xpath('//*[@id="password"]')
    };

    this.loginGoogle = async function () {
        await element(this.botoes.google).click();
    };

    this.login = async function () {
        await element(this.input.email).sendKeys(process.env.BLAZE_METER_EMAIL);
        await element(this.input.senha).sendKeys(process.env.BLAZE_METER_SENHA);
        return element(this.botoes.login).click();
    };
};

module.exports = BlazeMeter;
