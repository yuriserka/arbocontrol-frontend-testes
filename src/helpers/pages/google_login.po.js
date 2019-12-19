const By = require('protractor').By;
const element = require('protractor').element;

const GoogleAccount = function (browser) {
    this.botoes = {
        proximo_email: By.xpath('//*[@id="identifierNext"]'),
        proximo_senha: By.xpath('//*[@id="passwordNext"]')
    };
    this.input = {
        email: By.xpath('//*[@id="identifierId"]'),
        senha: By.xpath('//*[@id="password"]/div[1]/div/div[1]/input')
    };

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
