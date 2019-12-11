// const LoginPage = require('../pages/Login');
// const HomePage = require('../pages/Inicial');
// const config = require('../config/config.json');
// const protractor = require('protractor');
// const browser = protractor.browser;

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

// // formularios
// // BDD - GWT
