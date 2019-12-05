const loginPage = require('../pages/Login')
const homePage = require('../pages/Inicial')
const config = require('../config/config.json')

describe('HomePage', () => {
  const login_page = new loginPage();
  const home_page = new homePage()

  beforeEach(async () => {
    const login_form = config.login_form
    await login_page.get()
    await browser.waitForAngular('esperando terminar de renderizar a pagina')
    await login_page.login(login_form.sucesso.cpf, login_form.sucesso.senha)
  });

  it('deve ser possível navegar entra as opções', async () => {
    await home_page.formularios()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/formularios', 'deveria ter acessado os formularios')
    
    await home_page.relatorios()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/relatorios-indices', 'deveria ter acessado os relatorios e indices')

    await home_page.exportacao()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/exportar', 'deveria ter acessado a exportação de dados')

    await home_page.importacao()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/processo-importacao', 'deveria ter acessado os processo de importacao')

    await home_page.demandas()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/demandas', 'deveria ter acessado as demandas')

    await home_page.listasDeTrabalho()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/lista-trabalho', 'deveria ter acessado as listas de trabalho')

    await home_page.atividades()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/atividades', 'deveria ter acessado as atividades')

    await home_page.imoveis()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/imoveis', 'deveria ter acessado os imoveis')

    await home_page.territorios()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/territorios', 'deveria ter acessado os territorios')

    await home_page.areasDeGestao()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/areas-gestao', 'deveria ter acessado as areas de gestao')

    await home_page.unidadesOrganizacionais()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/unidades', 'deveria ter acessado os unidades organizacionais')

    await home_page.pessoas()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/pessoas', 'deveria ter acessado as pessoas')

    await home_page.equipes()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/equipes', 'deveria ter acessado as equipes')

    await home_page.perfisDeUsuario()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/perfis-usuarios', 'deveria ter acessado os perfis de usuarios')

    await home_page.usuariosDaUnidade()
    expect(await browser.getCurrentUrl()).toEqual('https://admin.arbocontrol.com/perfil-usuario-unidade', 'deveria ter acessado os perfiis de usuario da unidade')

  });
});

// formularios
// BDD - GWT