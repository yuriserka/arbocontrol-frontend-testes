const LoginPage = require('../pages/Login')
const config = require('../config/config.json')

describe('LoginPage', () => {
  const login_page = new LoginPage();
  const login_form = config.login_form

  beforeEach(async () => {
    await login_page.get()
  });

  it('deve ser possível fazer login no sistema se o usuario ja estiver cadastrado', async () => {
    await login_page.login(login_form.sucesso.cpf, login_form.sucesso.senha)

    await browser.waitForAngular('esperando terminar de renderizar a pagina')
    expect(await element(By.xpath("//mat-card-title")).getText()).toBe('Yuri Serka do Carmo rodrigues')

    // element(By.xpath("//button[@class='mat-button mat-button-base ng-star-inserted']")).click()
  });

  // O Caso de falha é bem mais complicado, pois não aparece a lista de unidades para selecionar, ent tem que ver como fazer
  // it('não deve ser possível fazer login no sistema se o usuario não estiver cadastrado', async () => {
  //   await login_page.login(login_form.falha.cpf, login_form.falha.senha)
  //   expect(await element(By.xpath("//*[@class='mat-raised-button mat-button-base mat-primary']")).isEnabled()).toBeFalse()
  //   // expect(await element(By.xpath("//*[@class='mat-error-2']")).getText()).toBe('Credenciais inválidas')
  // });
});