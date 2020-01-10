const Utility = require('./utility');
const util = new Utility();
const element = require('protractor').element;
const By = require('protractor').By;

const NavBar = function () {
  this.botoes = {
    formularios: By.xpath('//a[@routerlink="formularios"]'),
    relatorios_e_indices: By.xpath('//a[@routerlink="relatorios-indices"]'),
    exportacao: By.xpath('//a[@routerlink="exportar"]'),
    importacao: By.xpath('//a[@routerlink="processo-importacao"]'),
    demandas: By.xpath('//a[@routerlink="demandas"]'),
    listas_trabalho: By.xpath('//a[@routerlink="lista-trabalho"]'),
    atividades: By.xpath('//a[@routerlink="atividades"]'),
    imoveis: By.xpath('//a[@routerlink="imoveis"]'),
    territorios: By.xpath('//a[@routerlink="territorios"]'),
    rede_de_saude: By.xpath(
      '(//mat-list-item[@class="parent mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted"])[1]',
    ),
    areas_gestao: By.xpath('//a[@routerlink="areas-gestao"]'),
    unidades_oraganizacionais: By.xpath('//a[@routerlink="unidades"]'),
    pessoas: By.xpath('//a[@routerlink="pessoas"]'),
    equipes: By.xpath('//a[@routerlink="equipes"]'),
    perfis_usuario: By.xpath('//a[@routerlink="perfis-usuarios"]'),
    usuarios_da_unidade: By.xpath('//a[@routerlink="perfil-usuario-unidade"]'),
  };

  this.exibir = async function () {
    const navBarExibida = await this.isNavBarExibida();
    if (navBarExibida) {
      return;
    }

    const btnNavBarLateral = By.xpath('(//*[@class="mat-icon notranslate material-icons mat-icon-no-color"])[1]');
    await element(btnNavBarLateral).click();
  };

  this.expandirRedeSaude = async function () {
    this.exibir();
    const redeSaudeExibida = await this.isRedeSaudeExpandida();
    if (redeSaudeExibida) {
      return;
    }
    await element(this.botoes.rede_de_saude)
      .element(By.xpath('.//div[@class="mat-list-item-content"]'))
      .click();
  };

  this.isNavBarExibida = async function () {
    const displayed = await element(
      By.xpath('/html/body/app-root/app-main-nav/mat-sidenav-container/mat-sidenav/div'),
    ).isDisplayed();
    return displayed;
  };

  this.isRedeSaudeExpandida = async function () {
    // isso nao ta funcionando, tenho ideia do pq, mas ainda nao sei rsolver...
    // potencial erro:
    //     o element, mesmo com o try parece nao lançar uma exceção, apenas encerra o programa do nada
    try {
      const classAttr = await element(
        By.xpath('(//div[contains(@class, "submenu ng-star-inserted")])[1]'),
      ).getAttribute('class');
      if (classAttr.includes('expanded')) {
        return true;
      }
    } catch (err) {
      return false;
    }
    return false;
    // const present = el.isPresent().then(p => {
    //   if (p) {
    //     return true;
    //   }
    // }).catch(err => {
    //   return false
    // });
    // if (present) {
    //   const displayed = el.isDisplayed().then(d => {
    //     if (d) {
    //       return true;
    //     }
    //   }).catch(err => {
    //     return false
    //   });
    // }
    // return false;
  };

  this.acessarFormularios = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.formularios);
    await util.waitClick(this.botoes.formularios);
    await element(this.botoes.formularios).click();
  };

  this.acessarRelatorios = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.relatorios_e_indices);
    await util.waitClick(this.botoes.relatorios_e_indices);
    await element(this.botoes.relatorios_e_indices).click();
  };

  this.acessarExportacao = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.exportacao);
    await util.waitClick(this.botoes.exportacao);
    await element(this.botoes.exportacao).click();
  };

  this.acessarImportacao = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.importacao);
    await util.waitClick(this.botoes.importacao);
    await element(this.botoes.importacao).click();
  };

  this.acessarDemandas = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.demandas);
    await util.waitClick(this.botoes.demandas);
    await element(this.botoes.demandas).click();
  };

  this.acessarListasDeTrabalho = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.listas_trabalho);
    await util.waitClick(this.botoes.listas_trabalho);
    await element(this.botoes.listas_trabalho).click();
  };

  this.acessarAtividades = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.atividades);
    await util.waitClick(this.botoes.atividades);
    await element(this.botoes.atividades).click();
  };

  this.acessarImoveis = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.imoveis);
    await util.waitClick(this.botoes.imoveis);
    await element(this.botoes.imoveis).click();
  };

  this.acessarTerritorios = async function () {
    await this.exibir();
    await util.waitVisibility(this.botoes.territorios);
    await util.waitClick(this.botoes.territorios);
    await element(this.botoes.territorios).click();
  };

  this.acessarAreasDeGestao = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.areas_gestao);
    await util.waitClick(this.botoes.areas_gestao);
    await element(this.botoes.areas_gestao).click();
  };

  this.acessarUnidadesOrganizacionais = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.unidades_oraganizacionais);
    await util.waitClick(this.botoes.unidades_oraganizacionais);
    await element(this.botoes.unidades_oraganizacionais).click();
  };

  this.acessarPessoas = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.pessoas);
    await util.waitClick(this.botoes.pessoas);
    await element(this.botoes.pessoas).click();
  };

  this.acessarEquipes = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.equipes);
    await util.waitClick(this.botoes.equipes);
    await element(this.botoes.equipes).click();
  };

  this.acessarPerfisDeUsuario = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.perfis_usuario);
    await util.waitClick(this.botoes.perfis_usuario);
    await element(this.botoes.perfis_usuario).click();
  };

  this.acessarUsuariosDaUnidade = async function () {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.usuarios_da_unidade);
    await util.waitClick(this.botoes.usuarios_da_unidade);
    await element(this.botoes.usuarios_da_unidade).click();
  };
};

module.exports = NavBar;
