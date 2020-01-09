const By = require('protractor').By;
const element = require('protractor').element;
const Util = require('../utility');

const GoogleAccount = function (browser) {
    this.botoes = {
        proximo_email: By.xpath('//*[@id="identifierNext"]'),
        proximo_senha: By.xpath('//*[@id="passwordNext"]')
    };
    this.input = {
        email: By.xpath('//*[@name="identifier"]'),
        senha: By.xpath('//*[@name="password"]')
    };

    this.login = async function (email, senha) {
        await this.preencherEmail(email);
        const util = new Util();
        util.waitVisibility(this.input.senha);
        util.waitClick(this.botoes.proximo_senha);
        browser.sleep(3000);
        await this.preencherSenha(senha);
    }

    this.preencherEmail = async function (email) {
        await element(this.input.email).sendKeys(email);
        return element(this.botoes.proximo_email).click();
    }

    this.preencherSenha = async function (senha) {
        await element(this.input.senha).sendKeys(senha);
        return element(this.botoes.proximo_senha).click();
    }
};

module.exports = GoogleAccount;
