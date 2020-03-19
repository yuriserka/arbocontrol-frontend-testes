const { BeforeAll, setDefaultTimeout, Given, When, Then } = require('cucumber');
import { expect } from 'chai';
import { browser } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../config';
import { HomePage } from '../src/pages/home.po';
import { makeUsuario } from '../src/models/usuario';
import { login, getTestPage, timeout } from './helpers/common';

setDefaultTimeout(timeout);
const homePage = new HomePage();

BeforeAll(async () => {
  await getTestPage();
});

Given('que estou logado com', async (dataTable: TableDefinition) => {
  const user = makeUsuario(dataTable.hashes()[0]);
  await login(user);
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
