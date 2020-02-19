const {
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
  Given,
  When,
  Then,
} = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { HomePage } from '../src/pages/home.po';
import { LoginPage } from '../src/pages/login.po';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const homePage = new HomePage();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = dataTable.hashes()[0];
  await loginPage.login(user.cpf, user.senha, user.unidade);
});

When('eu clicar para expandir a barra de navegação', async () => {
  await homePage.mostrarSideNav();
});

When('clicar no botão {string}', async (btn: string) => {
  await homePage.acessar(btn);
});

Then('a url deve ser {string}', async (url: string) => {
  const realUrl = url.replace('<baseUrl>', baseUrl);
  expect(await browser.getCurrentUrl()).to.be.equal(realUrl);
});

AfterAll(async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal(`${baseUrl}/login`);
});
