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
      painel: By.xpath('//a[@routerlink="/painel"]'),
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
   * acessa a página de "Painel" a partir da barra de
   * navegação lateral
   */
  async acessarPainel() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.painel);
  }

  /**
   * acessa a página de "Formulários" a partir da barra de
   * navegação lateral
   */
  async acessarFormularios() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.formularios);
  }

  /**
   * acessa a página de "Relatórios e Índices" a partir da barra de
   * navegação lateral
   */
  async acessarRelatorios() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.relatorios_indices);
  }

  /**
   * acessa a página de "Exportação" a partir da barra de navegação
   * lateral
   */
  async acessarExportacao() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.exportar);
  }

  /**
   * acessa a página de "Importação" a partir da barra de navegação
   * lateral
   */
  async acessarImportacao() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.processo_importacao);
  }

  /**
   * acessa a página de "Demandas" a partir da barra de navegação
   * lateral
   */
  async acessarDemandas() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.demandas);
  }

  /**
   * acessa a página de "Lista de Trabalho" a partir da barra de
   * navegação lateral
   */
  async acessarListasDeTrabalho() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.lista_trabalho);
  }

  /**
   * acessa a página de "Atividades" a partir da barra de navegação
   * lateral
   */
  async acessarAtividades() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.atividades);
  }

  /**
   * acessa a página de "Imóveis" a partir da barra de navegação
   * lateral
   */
  async acessarImoveis() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.imoveis);
  }

  /**
   * acessa a página de "Territórios" a partir da barra de
   * navegação lateral
   */
  async acessarTerritorios() {
    await this.exibir();
    await SmartWaiter.safeClick(this.botoes_.territorios);
  }

  /**
   * acessa a página de "Áreas de Gestão" a partir da barra de
   * navegação lateral
   */
  async acessarAreasDeGestao() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.areas_gestao);
  }

  /**
   * acessa a página de "Unidades Organizacionais" a partir da
   * barra de navegação lateral
   */
  async acessarUnidadesOrganizacionais() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.unidades);
  }

  /**
   * acessa a página de "Pessoas" a partir da barra de navegação
   * lateral
   */
  async acessarPessoas() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.pessoas);
  }

  /**
   * acessa a página de "Equipes" a partir da barra de navegação
   * lateral
   */
  async acessarEquipes() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.equipes);
  }

  /**
   * acessa a página de "Perfis de Usuário" a partir da barra de
   * navegação lateral
   */
  async acessarPerfisDeUsuario() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.perfis_usuarios);
  }

  /**
   * acessa a página de "Usuários da Unidade" a partir da barra de
   * navegação lateral
   */
  async acessarUsuariosDaUnidade() {
    await this.expandirRedeSaude();
    await SmartWaiter.safeClick(this.botoes_.perfil_usuario_unidade);
  }

  async acessarVetores() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.vetores);
  }

  async acessarSituacaoAtividade() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.situacao_atividade);
  }

  async acessarTiposDeAtividades() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.tipos_de_atividade);
  }

  async acessarTiposDeVinculos() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.tipos_de_vinculo);
  }

  async acessarCargos() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.cargos);
  }

  async acessarNiveisDeGestao() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.niveis_de_gestao);
  }

  async acessarFluxosDeTrabalho() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.fluxos_de_trabalho);
  }

  async acessarVisoes() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.visoes);
  }

  async acessarTiposDeTerritorio() {
    await this.expandirTabelasBasicas();
    await SmartWaiter.safeClick(this.botoes_.tipos_de_territorio);
  }

  async acessarTiposDeImovel() {
    await this.expandirImoveisTabelas();
    await SmartWaiter.safeClick(this.botoes_.tipos_de_imovel);
  }

  async acessarTiposDePontoEstrategico() {
    await this.expandirImoveisTabelas();
    await SmartWaiter.safeClick(this.botoes_.tipos_de_ponto_estrategico);
  }

  async acessarSolicitantes() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.solicitantes);
  }

  async acessarOrigensDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.origens_demanda);
  }

  async acessarCategoriaDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.categoria_demanda);
  }

  async acessarAbrangencias() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.abrangencias);
  }

  async acessarPrioridadeDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.prioridade_demanda);
  }

  async acessarSituacaoDemanda() {
    await this.expandirDemandasTabelas();
    await SmartWaiter.safeClick(this.botoes_.situacao_demanda);
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
    await element(this.botoes_.imoveis_tabelas)
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
    await element(this.botoes_.demandas_tabelas)
      .element(By.xpath('./div[@class="mat-list-item-content"]'))
      .click();
  }

  /**
   * checa se a lista da Rede de Saúde está sendo exibida
   */
  private async isRedeSaudeExibida() {
    try {
      const redeSaudeClass = await element(
        By.xpath('(//div[contains(@class, "submenu")])[1]')
      ).getAttribute('class');
      return redeSaudeClass.includes('expanded');
    } catch (err) {
      return false;
    }
  }

  /**
   * checa se a lista das Tabelas Básicas está sendo exibida
   */
  private async isTabelasBasicasExibida() {
    try {
      const tabelasBasicasClass = await element(
        By.xpath('(//div[contains(@class, "submenu")])[2]')
      ).getAttribute('class');
      return tabelasBasicasClass.includes('expanded');
    } catch (err) {
      return false;
    }
  }

  /**
   * checa se a lista para Imoveis Tabelas está sendo exibida
   */
  private async isImoveisTabelasExibida() {
    try {
      const imoveisTabelaClass = await element(
        By.xpath('(//div[contains(@class, "submenu")])[3]')
      ).getAttribute('class');
      return imoveisTabelaClass.includes('expanded');
    } catch (err) {
      return false;
    }
  }

  /**
   * checa se a lista para Demandas Tabelas está sendo exibida
   */
  private async isDemandasTabelasExibida() {
    try {
      const demandasTabelaClass = await element(
        By.xpath('(//div[contains(@class, "submenu")])[4]')
      ).getAttribute('class');
      return demandasTabelaClass.includes('expanded');
    } catch (err) {
      return false;
    }
  }
}
