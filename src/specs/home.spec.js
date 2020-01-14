/**
 * @fileoverview
 */

import {expect} from 'chai';
import {AfterAll, BeforeAll, setDefaultTimeout, Then, When} from 'cucumber';
import {browser} from 'protractor';
import {HomePage} from '../pages/home.po';
import {LoginPage} from '../pages/login.po';

setDefaultTimeout(60 * 1000);
const loginPage = new LoginPage(browser);
const homePage = new HomePage(browser);

BeforeAll(async () => {
  await browser.get('http://localhost/');
  await loginPage.login('111.111.111-11', '12345678');
});

When('eu clicar para expandir a barra de navegação', async function() {
  await homePage.showNavBar();
});

When('clicar no botão {string}', async function(routerlink_name) {
  await homePage.btnFuncMap[routerlink_name]();
});

Then('a url deve ser {string}', async function(url) {
  expect(await browser.getCurrentUrl()).to.be.equal(url);
});

AfterAll(async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});
