const Utility = require('./utility');
const element = require('protractor').element;
const By = require('protractor').By;

const util = new Utility();

class NavBar {
  constructor(browser) {
    this.browser = browser;

    this.botoes = {
      formularios: By.xpath('//a[@routerlink="formularios"]'),
      relatorios_indices: By.xpath('//a[@routerlink="relatorios-indices"]'),
      exportar: By.xpath('//a[@routerlink="exportar"]'),
      processo_importacao: By.xpath('//a[@routerlink="processo-importacao"]'),
      demandas: By.xpath('//a[@routerlink="demandas"]'),
      lista_trabalho: By.xpath('//a[@routerlink="lista-trabalho"]'),
      atividades: By.xpath('//a[@routerlink="atividades"]'),
      imoveis: By.xpath('//a[@routerlink="imoveis"]'),
      territorios: By.xpath('//a[@routerlink="territorios"]'),
      rede_de_saude: By.xpath(
        '(//mat-list-item[@class="parent mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted"])[1]',
      ),
      areas_gestao: By.xpath('//a[@routerlink="areas-gestao"]'),
      unidades: By.xpath('//a[@routerlink="unidades"]'),
      pessoas: By.xpath('//a[@routerlink="pessoas"]'),
      equipes: By.xpath('//a[@routerlink="equipes"]'),
      perfis_usuarios: By.xpath('//a[@routerlink="perfis-usuarios"]'),
      perfil_usuario_unidade: By.xpath('//a[@routerlink="perfil-usuario-unidade"]'),
      tabelas_basicas: By.xpath(
        '(//mat-list-item[@class="parent mat-list-item mat-list-item-avatar mat-list-item-with-avatar ng-star-inserted"])[2]',
      ),
    };
  }

  async exibir() {
    const navBarExibida = await this.isNavBarExibida();
    if (navBarExibida) {
      return;
    }

    const btnNavBarLateral = By.xpath('(//*[@class="mat-icon notranslate material-icons mat-icon-no-color"])[1]');
    await element(btnNavBarLateral).click();
    // tentativa de fazer esperar o ultimo item da lista aparecer pra interagir
    await util.waitVisibility(this.botoes.tabelas_basicas);
    await util.waitClick(this.botoes.tabelas_basicas);
    await this.browser.sleep(1500);
  };

  async expandirRedeSaude() {
    this.exibir();
    const redeSaudeExibida = await this.isRedeSaudeExpandida();
    if (redeSaudeExibida) {
      return;
    }
    await element(this.botoes.rede_de_saude)
      .element(By.xpath('.//div[@class="mat-list-item-content"]'))
      .click();
    // tentativa de fazer esperar o ultimo item da lista aparecer pra interagir
    await util.waitVisibility(this.botoes.perfil_usuario_unidade);
    await util.waitClick(this.botoes.perfil_usuario_unidade);
    await this.browser.sleep(1500);
  };

  async isNavBarExibida() {
    const displayed = await element(
      By.xpath('/html/body/app-root/app-main-nav/mat-sidenav-container/mat-sidenav/div'),
    ).isDisplayed();
    return displayed;
  };

  async isRedeSaudeExpandida() {
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

  async acessarFormularios() {
    await this.exibir();
    await util.waitVisibility(this.botoes.formularios);
    await util.waitClick(this.botoes.formularios);
    await element(this.botoes.formularios).click();
  };

  async acessarRelatorios() {
    await this.exibir();
    await util.waitVisibility(this.botoes.relatorios_indices);
    await util.waitClick(this.botoes.relatorios_indices);
    await element(this.botoes.relatorios_indices).click();
  };

  async acessarExportacao() {
    await this.exibir();
    await util.waitVisibility(this.botoes.exportar);
    await util.waitClick(this.botoes.exportar);
    await element(this.botoes.exportar).click();
  };

  async acessarImportacao() {
    await this.exibir();
    await util.waitVisibility(this.botoes.processo_importacao);
    await util.waitClick(this.botoes.processo_importacao);
    await element(this.botoes.processo_importacao).click();
  };

  async acessarDemandas() {
    await this.exibir();
    await util.waitVisibility(this.botoes.demandas);
    await util.waitClick(this.botoes.demandas);
    await element(this.botoes.demandas).click();
  };

  async acessarListasDeTrabalho() {
    await this.exibir();
    await util.waitVisibility(this.botoes.lista_trabalho);
    await util.waitClick(this.botoes.lista_trabalho);
    await element(this.botoes.lista_trabalho).click();
  };

  async acessarAtividades() {
    await this.exibir();
    await util.waitVisibility(this.botoes.atividades);
    await util.waitClick(this.botoes.atividades);
    await element(this.botoes.atividades).click();
  };

  async acessarImoveis() {
    await this.exibir();
    await util.waitVisibility(this.botoes.imoveis);
    await util.waitClick(this.botoes.imoveis);
    await element(this.botoes.imoveis).click();
  };

  async acessarTerritorios() {
    await this.exibir();
    await util.waitVisibility(this.botoes.territorios);
    await util.waitClick(this.botoes.territorios);
    await element(this.botoes.territorios).click();
  };

  async acessarAreasDeGestao() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.areas_gestao);
    await util.waitClick(this.botoes.areas_gestao);
    await element(this.botoes.areas_gestao).click();
  };

  async acessarUnidadesOrganizacionais() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.unidades);
    await util.waitClick(this.botoes.unidades);
    await element(this.botoes.unidades).click();
  };

  async acessarPessoas() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.pessoas);
    await util.waitClick(this.botoes.pessoas);
    await element(this.botoes.pessoas).click();
  };

  async acessarEquipes() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.equipes);
    await util.waitClick(this.botoes.equipes);
    await element(this.botoes.equipes).click();
  };

  async acessarPerfisDeUsuario() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.perfis_usuarios);
    await util.waitClick(this.botoes.perfis_usuarios);
    await element(this.botoes.perfis_usuarios).click();
  };

  async acessarUsuariosDaUnidade() {
    await this.expandirRedeSaude();
    await util.waitVisibility(this.botoes.perfil_usuario_unidade);
    await util.waitClick(this.botoes.perfil_usuario_unidade);
    await element(this.botoes.perfil_usuario_unidade).click();
  };
};

module.exports = NavBar;
