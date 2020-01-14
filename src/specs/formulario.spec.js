// const LoginPage = require('../pages/Login');
// const HomePage = require('../pages/Inicial');
// const FormularioPage = require('../pages/Formulario');
// const config = require('../config/config.json');
// const protractor = require('protractor');
// const browser = protractor.browser;

// describe('Formulario', () => {
//   const loginPage = new LoginPage();
//   const homePage = new HomePage(browser);
//   const formPage = new FormularioPage(browser);
//   const palavraParaPesquisar = 'Lab';

//   beforeEach(async () => {
//     const loginForm = config.login_form;
//     await loginPage.get();
//     await browser.waitForAngular('esperando terminar de renderizar a
//     pagina'); await loginPage.login(loginForm.sucesso.cpf,
//     loginForm.sucesso.senha);
//   });

//   it('deve ser possível pesquisar por formulários', async () => {
//     await homePage.formularios();
//     await browser.waitForAngular('esperando terminar de renderizar a
//     pagina'); const titulos = await formPage.pesquisar(palavraParaPesquisar);
//     titulos.forEach((titulo) => {
//       console.log(titulo);
//     });
//   });
// });
