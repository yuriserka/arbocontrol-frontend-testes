/**
 * @fileoverview
 */

import {expect} from 'chai';
import {AfterAll, BeforeAll, setDefaultTimeout, Then, When} from 'cucumber';
import {browser} from 'protractor';
import {HomePage} from '../pages/home.po';
import {LoginPage} from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage();
const homePage = new HomePage();

BeforeAll(async () => {
  await browser.get('http://localhost/');
  await loginPage.login('111.111.111-11', '12345678');
});

When('eu clicar para expandir a barra de navegação', async () => {
  await homePage.mostrarSideNav();
});

When('clicar no botão {string}', async (btn) => {
  await homePage.acessar(btn);
});

Then('a url deve ser {string}', async (url) => {
  expect(await browser.getCurrentUrl()).to.be.equal(url);
});

AfterAll(async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});
