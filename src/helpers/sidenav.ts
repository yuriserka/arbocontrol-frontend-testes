import { By, element, browser } from 'protractor';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from './smart_waiter';

/**
 * Permite o acesso à todas as páginas do sistema
 */
export class SideNav {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    this.botoes_ = {
      formularios: By.xpath('//a[@routerlink="formularios"]'),
      relatorios_indices: By.xpath('//a[@routerlink="relatorios-indices"]'),
      exportar: By.xpath('//a[@routerlink="exportar"]'),
      processo_importacao: By.xpath('//a[@routerlink="processo-importacao"]'),
      demandas: By.xpath('//a[@routerlink="demandas"]'),
      lista_trabalho: By.xpath('//a[@routerlink="lista-trabalho"]'),
      atividades: By.xpath('//a[@routerlink="atividades"]'),
      imoveis: By.xpath('//a[@routerlink="imoveis"]'),
      territorios: By.xpath('//a[@routerlink="territorios"]'),
      rede_de_saude: By.xpath('(//mat-list-item)[1]'),
      areas_gestao: By.xpath('//a[@routerlink="areas-gestao"]'),
      unidades: By.xpath('//a[@routerlink="unidades"]'),
      pessoas: By.xpath('//a[@routerlink="pessoas"]'),
      equipes: By.xpath('//a[@routerlink="equipes"]'),
      perfis_usuarios: By.xpath('//a[@routerlink="perfis-usuarios"]'),
      perfil_usuario_unidade: By.xpath(
        '//a[@routerlink="perfil-usuario-unidade"]'
      ),
      tabelas_basicas: By.xpath('(//mat-list-item)[2]'),
      vetores: By.xpath('//a[@routerlink="gerenciar/vetor"]'),
      situacao_atividade: By.xpath('//a[@routerlink="situacoes-atividade"]'),
      tipos_de_atividade: By.xpath('//a[@routerlink="tipos-atividades"]'),
      tipos_de_vinculo: By.xpath('//a[@routerlink="gerenciar/tipo-vinculo"]'),
      cargos: By.xpath('//a[@routerlink="cargos"]'),
      niveis_de_gestao: By.xpath('//a[@routerlink="niveis-gestao"]'),
      fluxos_de_trabalho: By.xpath('//a[@routerlink="fluxos-trabalho"]'),
      visoes: By.xpath('//a[@routerlink="visoes"]'),
      tipos_de_territorio: By.xpath(
        '//a[@routerlink="gerenciar/tipo-territorio"]'
      ),
      imoveis_tabelas: By.xpath('(//mat-list-item)[3]'),
      tipos_de_imovel: By.xpath('//a[@routerlink="gerenciar/tipo-imovel"]'),
      tipos_de_ponto_estrategico: By.xpath(
        '//a[@routerlink="gerenciar/tipo-ponto-estrategico"]'
      ),
      demandas_tabelas: By.xpath('(//mat-list-item)[4]'),
      solicitantes: By.xpath('//a[@routerlink="gerenciar/solicitante"]'),
      origens_demanda: By.xpath('//a[@routerlink="gerenciar/origem-demanda"]'),
      categoria_demanda: By.xpath(
        '//a[@routerlink="gerenciar/categoria-demanda"]'
      ),
      abrangencias: By.xpath('//a[@routerlink="gerenciar/abrangencia"]'),
      prioridade_demanda: By.xpath(
        '//a[@routerlink="gerenciar/prioridade-demanda"]'
      ),
      situacao_demanda: By.xpath(
        '//a[@routerlink="gerenciar/situacao-demanda"]'
      ),
    };
  }

  /**
   * Se a barra de navegação lateral não estiver sendo exibida,
   * então é clicado no botão para exibi-la, caso contrário não faz nada
   *
   */
  async exibir() {
    if (await this.isNavBarExibida()) {
      return;
    }
    const btnNavBarLateral = By.xpath(
      '//mat-toolbar//button/span/mat-icon[text()="menu"]'
    );
    await browser
      .actions()
      .mouseMove(await element(btnNavBarLateral).getWebElement())
      .perform();
    await element(btnNavBarLateral).click();
  }

  /**
   * checa se a barra de navegação está sendo exibida
   */
  private async isNavBarExibida() {
    return (
      await element(By.xpath('(//mat-sidenav)[1]')).getAttribute('class')
    ).includes('mat-drawer-opened');
  }

  /**
   * acessa a página de "Formulários" a partir da barra de
   * navegação lateral
   */
  async acessarFormularios() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.formularios);
    await SmartWaiter.waitClick(this.botoes_.formularios);
    await element(this.botoes_.formularios).click();
  }

  /**
   * acessa a página de "Relatórios e Índices" a partir da barra de
   * navegação lateral
   */
  async acessarRelatorios() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.relatorios_indices);
    await SmartWaiter.waitClick(this.botoes_.relatorios_indices);
    await element(this.botoes_.relatorios_indices).click();
  }

  /**
   * acessa a página de "Exportação" a partir da barra de navegação
   * lateral
   */
  async acessarExportacao() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.exportar);
    await SmartWaiter.waitClick(this.botoes_.exportar);
    await element(this.botoes_.exportar).click();
  }

  /**
   * acessa a página de "Importação" a partir da barra de navegação
   * lateral
   */
  async acessarImportacao() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.processo_importacao);
    await SmartWaiter.waitClick(this.botoes_.processo_importacao);
    await element(this.botoes_.processo_importacao).click();
  }

  /**
   * acessa a página de "Demandas" a partir da barra de navegação
   * lateral
   */
  async acessarDemandas() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.demandas);
    await SmartWaiter.waitClick(this.botoes_.demandas);
    await element(this.botoes_.demandas).click();
  }

  /**
   * acessa a página de "Lista de Trabalho" a partir da barra de
   * navegação lateral
   */
  async acessarListasDeTrabalho() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.lista_trabalho);
    await SmartWaiter.waitClick(this.botoes_.lista_trabalho);
    await element(this.botoes_.lista_trabalho).click();
  }

  /**
   * acessa a página de "Atividades" a partir da barra de navegação
   * lateral
   */
  async acessarAtividades() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.atividades);
    await SmartWaiter.waitClick(this.botoes_.atividades);
    await element(this.botoes_.atividades).click();
  }

  /**
   * acessa a página de "Imóveis" a partir da barra de navegação
   * lateral
   */
  async acessarImoveis() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.imoveis);
    await SmartWaiter.waitClick(this.botoes_.imoveis);
    await element(this.botoes_.imoveis).click();
  }

  /**
   * acessa a página de "Territórios" a partir da barra de
   * navegação lateral
   */
  async acessarTerritorios() {
    await this.exibir();
    await SmartWaiter.waitVisibility(this.botoes_.territorios);
    await SmartWaiter.waitClick(this.botoes_.territorios);
    await element(this.botoes_.territorios).click();
  }

  /**
   * acessa a página de "Áreas de Gestão" a partir da barra de
   * navegação lateral
   */
  async acessarAreasDeGestao() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.areas_gestao);
    await SmartWaiter.waitClick(this.botoes_.areas_gestao);
    await element(this.botoes_.areas_gestao).click();
  }

  /**
   * acessa a página de "Unidades Organizacionais" a partir da
   * barra de navegação lateral
   */
  async acessarUnidadesOrganizacionais() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.unidades);
    await SmartWaiter.waitClick(this.botoes_.unidades);
    await element(this.botoes_.unidades).click();
  }

  /**
   * acessa a página de "Pessoas" a partir da barra de navegação
   * lateral
   */
  async acessarPessoas() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.pessoas);
    await SmartWaiter.waitClick(this.botoes_.pessoas);
    await element(this.botoes_.pessoas).click();
  }

  /**
   * acessa a página de "Equipes" a partir da barra de navegação
   * lateral
   */
  async acessarEquipes() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.equipes);
    await SmartWaiter.waitClick(this.botoes_.equipes);
    await element(this.botoes_.equipes).click();
  }

  /**
   * acessa a página de "Perfis de Usuário" a partir da barra de
   * navegação lateral
   */
  async acessarPerfisDeUsuario() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.perfis_usuarios);
    await SmartWaiter.waitClick(this.botoes_.perfis_usuarios);
    await element(this.botoes_.perfis_usuarios).click();
  }

  /**
   * acessa a página de "Usuários da Unidade" a partir da barra de
   * navegação lateral
   */
  async acessarUsuariosDaUnidade() {
    await this.expandirRedeSaude();
    await SmartWaiter.waitVisibility(this.botoes_.perfil_usuario_unidade);
    await SmartWaiter.waitClick(this.botoes_.perfil_usuario_unidade);
    await element(this.botoes_.perfil_usuario_unidade).click();
  }

  async acessarVetores() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.vetores);
    await SmartWaiter.waitClick(this.botoes_.vetores);
    await element(this.botoes_.vetores).click();
  }

  async acessarSituacaoAtividade() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.situacao_atividade);
    await SmartWaiter.waitClick(this.botoes_.situacao_atividade);
    await element(this.botoes_.situacao_atividade).click();
  }

  async acessarTiposDeAtividades() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.tipos_de_atividade);
    await SmartWaiter.waitClick(this.botoes_.tipos_de_atividade);
    await element(this.botoes_.tipos_de_atividade).click();
  }

  async acessarTiposDeVinculos() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.tipos_de_vinculo);
    await SmartWaiter.waitClick(this.botoes_.tipos_de_vinculo);
    await element(this.botoes_.tipos_de_vinculo).click();
  }

  async acessarCargos() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.cargos);
    await SmartWaiter.waitClick(this.botoes_.cargos);
    await element(this.botoes_.cargos).click();
  }

  async acessarNiveisDeGestao() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.niveis_de_gestao);
    await SmartWaiter.waitClick(this.botoes_.niveis_de_gestao);
    await element(this.botoes_.niveis_de_gestao).click();
  }

  async acessarFluxosDeTrabalho() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.fluxos_de_trabalho);
    await SmartWaiter.waitClick(this.botoes_.fluxos_de_trabalho);
    await element(this.botoes_.fluxos_de_trabalho).click();
  }

  async acessarVisoes() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.visoes);
    await SmartWaiter.waitClick(this.botoes_.visoes);
    await element(this.botoes_.visoes).click();
  }

  async acessarTiposDeTerritorio() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.waitVisibility(this.botoes_.tipos_de_territorio);
    await SmartWaiter.waitClick(this.botoes_.tipos_de_territorio);
    await element(this.botoes_.tipos_de_territorio).click();
  }

  async acessarTiposDeImovel() {
    await this.expandirImoveisTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.tipos_de_imovel);
    await SmartWaiter.waitClick(this.botoes_.tipos_de_imovel);
    await element(this.botoes_.tipos_de_imovel).click();
  }

  async acessarTiposDePontoEstrategico() {
    await this.expandirImoveisTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.tipos_de_ponto_estrategico);
    await SmartWaiter.waitClick(this.botoes_.tipos_de_ponto_estrategico);
    await element(this.botoes_.tipos_de_ponto_estrategico).click();
  }

  async acessarSolicitantes() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.solicitantes);
    await SmartWaiter.waitClick(this.botoes_.solicitantes);
    await element(this.botoes_.solicitantes).click();
  }

  async acessarOrigensDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.origens_demanda);
    await SmartWaiter.waitClick(this.botoes_.origens_demanda);
    await element(this.botoes_.origens_demanda).click();
  }

  async acessarCategoriaDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.categoria_demanda);
    await SmartWaiter.waitClick(this.botoes_.categoria_demanda);
    await element(this.botoes_.categoria_demanda).click();
  }

  async acessarAbrangencias() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.abrangencias);
    await SmartWaiter.waitClick(this.botoes_.abrangencias);
    await element(this.botoes_.abrangencias).click();
  }

  async acessarPrioridadeDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.prioridade_demanda);
    await SmartWaiter.waitClick(this.botoes_.prioridade_demanda);
    await element(this.botoes_.prioridade_demanda).click();
  }

  async acessarSituacaoDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.waitVisibility(this.botoes_.situacao_demanda);
    await SmartWaiter.waitClick(this.botoes_.situacao_demanda);
    await element(this.botoes_.situacao_demanda).click();
  }

  /**
   * Se a lista de opções da Rede de Saúde não estiver sendo exibida, então é
   * clicado no botão para exibi-la, caso contrário não faz nada
   */
  private async expandirRedeSaude() {
    await this.exibir();
    if (await this.isRedeSaudeExibida()) {
      return;
    }
    await element(this.botoes_.rede_de_saude)
      .element(By.xpath('./div[@class="mat-list-item-content"]'))
      .click();
  }

  /**
   * Se a lista de opções das Tabelas Basicas não estiver sendo exibida, então é
   * clicado no botão para exibi-la, caso contrário não faz nada
   */
  private async expandirTabelasBasicas() {
    await this.exibir();
    if (await this.isTabelasBasicasExibida()) {
      return;
    }
    await element(this.botoes_.tabelas_basicas)
      .element(By.xpath('./div[@class="mat-list-item-content"]'))
      .click();
  }

  /**
   * Se a lista de opções para Imoveis Tabelas não estiver sendo exibida, então é
   * clicado no botão para exibi-la, caso contrário não faz nada
   */
  private async expandirImoveisTabelas() {
    await this.exibir();
    await this.expandirTabelasBasicas();
    if (await this.isImoveisTabelasExibida()) {
      return;
    }
    await element(this.botoes_.tabelas_basicas)
      .element(By.xpath('./div[@class="mat-list-item-content"]'))
      .click();
  }

  /**
   * Se a lista de opções para Demandas Tabelas não estiver sendo exibida, então é
   * clicado no botão para exibi-la, caso contrário não faz nada
   */
  private async expandirDemandasTabelas() {
    await this.exibir();
    await this.expandirTabelasBasicas();
    if (await this.isDemandasTabelasExibida()) {
      return;
    }
    await element(this.botoes_.tabelas_basicas)
      .element(By.xpath('./div[@class="mat-list-item-content"]'))
      .click();
  }

  /**
   * checa se a lista da Rede de Saúde está sendo exibida
   */
  private async isRedeSaudeExibida() {
    return (
      await element(
        By.xpath('(//div[contains(@class, "submenu")])[1]')
      ).getAttribute('class')
    ).includes('expanded');
  }

  /**
   * checa se a lista das Tabelas Básicas está sendo exibida
   */
  private async isTabelasBasicasExibida() {
    return (
      await element(
        By.xpath('(//div[contains(@class, "submenu")])[2]')
      ).getAttribute('class')
    ).includes('expanded');
  }

  /**
   * checa se a lista para Imoveis Tabelas está sendo exibida
   */
  private async isImoveisTabelasExibida() {
    return (
      await element(
        By.xpath('(//div[contains(@class, "submenu")])[3]')
      ).getAttribute('class')
    ).includes('expanded');
  }

  /**
   * checa se a lista para Demandas Tabelas está sendo exibida
   */
  private async isDemandasTabelasExibida() {
    return (
      await element(
        By.xpath('(//div[contains(@class, "submenu")])[4]')
      ).getAttribute('class')
    ).includes('expanded');
  }
}
