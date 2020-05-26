import { Given, setDefaultTimeout, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { baseUrl } from '../config';
import { HomePage } from '../src/pages/home.po';
import { LoginPage } from '../src/pages/login.po';
import { timeout } from './helpers/common';

setDefaultTimeout(timeout);
const loginPage = new LoginPage();
const homePage = new HomePage();

Given('que eu navego até a url do site do SisVetor', async () => {
  await browser.get(baseUrl);
});

When('eu entro com meu cpf {string}', async (cpf: string) => {
  await loginPage['preencherCpf'](cpf);
});

When('eu entro com minha senha {string}', async (senha: string) => {
  await loginPage['preencherSenha'](senha);
});

When('seleciono a unidade {string}', async (nomeDaUnidade: string) => {
  await loginPage['selecionarUnidade'](nomeDaUnidade);
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
