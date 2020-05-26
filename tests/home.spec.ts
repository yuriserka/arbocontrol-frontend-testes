import { setDefaultTimeout, When, Then } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { baseUrl } from '../config';
import { HomePage } from '../src/pages/home.po';
import { timeout } from './helpers/common';

setDefaultTimeout(timeout);
const homePage = new HomePage();

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
