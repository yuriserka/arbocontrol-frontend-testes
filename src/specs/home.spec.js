const { setDefaultTimeout, Given, Then, When, AfterAll, BeforeAll } = require('cucumber');
const browser = require('protractor').browser;
const chai = require('chai');
chai.use(require('chai-as-promised'));
const expect = chai.expect;

const LoginPage = require('../pages/login.po');
const HomePage = require('../pages/home.po');
// const Recorder = require('../helpers/recorder');
// const CssEditor = require('../helpers/css_editor');

setDefaultTimeout(60 * 1000);

const loginPage = new LoginPage(browser);
const homePage = new HomePage(browser);
// const recorder = new Recorder(browser);
// const cssEditor = new CssEditor(browser);
// let recording = false;

BeforeAll(async () => {
  await browser.get('http://localhost/');
  await loginPage.login('111.111.111-11', '12345678');
});

// Given('que estou logado', function () {
//   return;
// });

When('eu clicar para expandir a barra de navegação', async function () {
  await homePage.showNavBar();
});

When('clicar no botão {string}', async function (routerlink_name) {
  await homePage.btnFuncMap[routerlink_name]();
});

Then('a url deve ser {string}', async function (url) {
  expect(await browser.getCurrentUrl()).to.be.equal(url);
});

// Then('eu faço Logoff', () => {
//   return;
// });

AfterAll(async () => {
  await homePage.logout();
  await browser.waitForAngular();
  expect(await browser.getCurrentUrl()).to.be.equal('http://localhost/login');
});

// describe('HomePage', () => {
//   const loginPage = new LoginPage(browser);
//   const homePage = new HomePage(browser);

//   beforeEach(async () => {
//     const loginForm = config.login_form;
//     await loginPage.get();
//     await browser.waitForAngular('esperando terminar de renderizar a pagina');
//     await loginPage.login(loginForm.sucesso.cpf, loginForm.sucesso.senha);
//   });

//   it('deve ser possível navegar entra as opções', async () => {
//     await homePage.formularios();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/formularios', 'deveria ter acessado os formularios');

//     await homePage.relatorios();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/relatorios-indices', 'deveria ter acessado os relatorios e indices');

//     await homePage.exportacao();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/exportar', 'deveria ter acessado a exportação de dados');

//     await homePage.importacao();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/processo-importacao', 'deveria ter acessado os processo de importacao');

//     await homePage.demandas();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/demandas', 'deveria ter acessado as demandas');

//     await homePage.listasDeTrabalho();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/lista-trabalho', 'deveria ter acessado as listas de trabalho');

//     await homePage.atividades();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/atividades', 'deveria ter acessado as atividades');

//     await homePage.imoveis();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/imoveis', 'deveria ter acessado os imoveis');

//     await homePage.territorios();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/territorios', 'deveria ter acessado os territorios');

//     await homePage.areasDeGestao();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/areas-gestao', 'deveria ter acessado as areas de gestao');

//     await homePage.unidadesOrganizacionais();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/unidades', 'deveria ter acessado os unidades organizacionais');

//     await homePage.pessoas();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/pessoas', 'deveria ter acessado as pessoas');

//     await homePage.equipes();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/equipes', 'deveria ter acessado as equipes');

//     await homePage.perfisDeUsuario();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/perfis-usuarios', 'deveria ter acessado os perfis de usuarios');

//     await homePage.usuariosDaUnidade();
//     expect(await browser.getCurrentUrl())
//       .toEqual('https://admin.arbocontrol.com/perfil-usuario-unidade',
//         'deveria ter acessado os perfiis de usuario da unidade');
//   });
// });
