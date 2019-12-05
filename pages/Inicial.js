const NavBar = require('../helpers/navbar');

const ArboControlHomePage = function(browser) {
  const navbar = new NavBar();
  this.get = async function() {
    await browser.get('https://admin.arbocontrol.com/');
  };

  this.formularios = async function() {
    await navbar.acessarFormularios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.relatorios = async function() {
    await navbar.acessarRelatorios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.exportacao = async function() {
    await navbar.acessarExportacao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.importacao = async function() {
    await navbar.acessarImportacao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.demandas = async function() {
    await navbar.acessarDemandas();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.listasDeTrabalho = async function() {
    await navbar.acessarListasDeTrabalho();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.atividades = async function() {
    await navbar.acessarAtividades();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.imoveis = async function() {
    await navbar.acessarImoveis();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.territorios = async function() {
    await navbar.acessarTerritorios();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.areasDeGestao = async function() {
    await navbar.acessarAreasDeGestao();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.unidadesOrganizacionais = async function() {
    await navbar.acessarUnidadesOrganizacionais();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.pessoas = async function() {
    await navbar.acessarPessoas();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.equipes = async function() {
    await navbar.acessarEquipes();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.perfisDeUsuario = async function() {
    await navbar.acessarPerfisDeUsuario();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };

  this.usuariosDaUnidade = async function() {
    await navbar.acessarUsuariosDaUnidade();
    await browser.waitForAngular('esperando terminar de renderizar a pagina');
  };
};

module.exports = ArboControlHomePage;
