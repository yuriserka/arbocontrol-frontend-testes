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
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { HomePage } from '../src/pages/home.po';
import { LoginPage } from '../src/pages/login.po';
import { makeUsuario } from '../src/models/usuario';

setDefaultTimeout(60 * 1000);
const homePage = new HomePage();
const loginPage = new LoginPage();

BeforeAll(async () => {
  await browser.get(baseUrl);
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await loginPage.login(user);
});

When('eu clicar para expandir a barra de navegação', async () => {
  await homePage.mostrarSideNav();
});

When('clicar no botão {string}', async (btn: string) => {
  await homePage.acessar(btn);
});

Then('a url deve ser {string}', async (url: string) => {
  const realUrl = url.replace('<env.url>', baseUrl);
  expect(await browser.getCurrentUrl()).to.be.equal(realUrl);
});
