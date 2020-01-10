const By = require('protractor').By;
const element = require('protractor').element;
const Page = require('./page.po');

const ArboControlHomePage = function (browser) {
  const basePage = new Page();
  this.card = By.xpath('//mat-card[@class="example-card mat-card"]');

  this.logout = function () {
    return basePage.logout();
  };

  this.getUsuarioLogado = function () {
    return element(By.xpath('.//mat-card-title[@class="mat-card-title"]')).getText();
  };

  this.formularios = async function () {
    await basePage.navbar.acessarFormularios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.relatorios = async function () {
    await basePage.navbar.acessarRelatorios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.exportacao = async function () {
    await basePage.navbar.acessarExportacao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.importacao = async function () {
    await basePage.navbar.acessarImportacao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.demandas = async function () {
    await basePage.navbar.acessarDemandas();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.listasDeTrabalho = async function () {
    await basePage.navbar.acessarListasDeTrabalho();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.atividades = async function () {
    await basePage.navbar.acessarAtividades();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.imoveis = async function () {
    await basePage.navbar.acessarImoveis();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.territorios = async function () {
    await basePage.navbar.acessarTerritorios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.areasDeGestao = async function () {
    await basePage.navbar.acessarAreasDeGestao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.unidadesOrganizacionais = async function () {
    await basePage.navbar.acessarUnidadesOrganizacionais();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.pessoas = async function () {
    await basePage.navbar.acessarPessoas();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.equipes = async function () {
    await basePage.navbar.acessarEquipes();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.perfisDeUsuario = async function () {
    await basePage.navbar.acessarPerfisDeUsuario();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.usuariosDaUnidade = async function () {
    await basePage.navbar.acessarUsuariosDaUnidade();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };
};

module.exports = ArboControlHomePage;
