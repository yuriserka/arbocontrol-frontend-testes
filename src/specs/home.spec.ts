/**
 * @fileoverview
 */

const {
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
  Given,
  When,
  Then
} = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { HomePage } from '../pages/inicial.po';
import { LoginPage } from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const homePage = new HomePage();

BeforeAll(async () => {
  await browser.get('http://localhost/');
});

Given(
  'que estou logado com',
  async (dataTable: any) => {
    const user = dataTable.hashes()[0];
    await loginPage.login(user.cpf, user.senha);
  }
);

When('eu clicar para expandir a barra de navegação', async () => {
  await homePage.mostrarSideNav();
});

When('clicar no botão {string}', async (btn: string) => {
  await homePage.acessar(btn);
});

Then('a url deve ser {string}', async (url: string) => {
  expect(await browser.getCurrentUrl()).to.be.equal(url);
});

AfterAll(async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});
