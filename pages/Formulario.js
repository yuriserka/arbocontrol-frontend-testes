const Utility = require('../helpers/utility')

const ArboControl_Formulario_Page = function () {
  const util = new Utility()
  this.input = {
    filtro: By.xpath("/html/body/app-root/app-main-nav/mat-sidenav-container/mat-sidenav-content/div/app-formulario-listar/app-formulario-listagem/div/div/mat-form-field/div/div[1]/div/input")

  }
  this.botoes = {
    cadastrar: By.xpath("//*[@class='mat-raised-button mat-button-base mat-primary']"),
    filtro: By.xpath("//*[@class='mat-raised-button mat-button-base ng-star-inserted']")
  }

  this.get = async function () {
    await browser.get('https://admin.arbocontrol.com/formularios');
  };

  this.pesquisar = async function (palavra) {
    await util.waitVisibility(this.input.filtro)
    await element(this.input.filtro).sendKeys(palavra)
    await util.waitClick(this.botoes.filtro)
    await element(this.botoes.filtro).click()
    // await util.pressEnter()

    const itens = await element.all(By.xpath("//tr[@class='mat-row ng-star-inserted']"))
    const titulos_retornados = []
    for (item in itens) {
      console.log(item);
      const coluna_titulo = await item.element(By.xpath(".//td[@class='mat-cell cdk-column-titulo mat-column-titulo ng-star-inserted']"))
      const titulo = await coluna_titulo.element(By.xpath(".//span[@class='span-link']")).getText()
      titulos_retornados.push(titulo)
    }

    return titulos_retornados
  }
};

module.exports = ArboControl_Formulario_Page;