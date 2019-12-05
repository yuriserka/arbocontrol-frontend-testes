const FormularioPage = require('../pages/Formulario')
const LoginPage = require('../pages/Login')
const HomePage = require('../pages/Inicial')
const config = require('../config/config.json')

describe('Formulario', () => {
  const login_page = new LoginPage();
  const home_page = new HomePage();
  const form_page = new FormularioPage();
  const palavra_para_pesquisar = "Lab";

  beforeEach(async () => {
    const login_form = config.login_form
    await login_page.get()
    await browser.waitForAngular('esperando terminar de renderizar a pagina')
    await login_page.login(login_form.sucesso.cpf, login_form.sucesso.senha)
  });
  
  it('deve ser possível pesquisar por formulários', async () => {
    await home_page.formularios()
    await browser.waitForAngular('esperando terminar de renderizar a pagina')
    const titulos = await form_page.pesquisar(palavra_para_pesquisar);
    for (titulo in titulos) {
      expect(titulo.contains(palavra_para_pesquisar)).toBeTrue()
    }
  });
});