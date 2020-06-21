import { By, element } from 'protractor';
import { SystemPage } from './page.po';

/**
 * Abstração da página inicial após login
 * @category Páginas do sistema
 */
export class HomePage extends SystemPage {
  private btn2page_: { [key: string]: () => Promise<void> };

  constructor() {
    super();
    this.btn2page_ = {
      painel: () => this.navbar_.acessarPainel(),
      formularios: () => this.navbar_.acessarFormularios(),
      relatorios_indices: () => this.navbar_.acessarRelatorios(),
      exportar: () => this.navbar_.acessarExportacao(),
      processo_importacao: () => this.navbar_.acessarImportacao(),
      demandas: () => this.navbar_.acessarDemandas(),
      lista_trabalho: () => this.navbar_.acessarListasDeTrabalho(),
      atividades: () => this.navbar_.acessarAtividades(),
      imoveis: () => this.navbar_.acessarImoveis(),
      territorios: () => this.navbar_.acessarTerritorios(),
      areas_gestao: () => this.navbar_.acessarAreasDeGestao(),
      unidades: () => this.navbar_.acessarUnidadesOrganizacionais(),
      pessoas: () => this.navbar_.acessarPessoas(),
      equipes: () => this.navbar_.acessarEquipes(),
      perfis_usuarios: () => this.navbar_.acessarPerfisDeUsuario(),
      perfil_usuario_unidade: () => this.navbar_.acessarUsuariosDaUnidade(),
      gerenciar_vetor: () => this.navbar_.acessarVetores(),
      situacoes_atividade: () => this.navbar_.acessarSituacaoAtividade(),
      tipos_atividades: () => this.navbar_.acessarTiposDeAtividades(),
      gerenciar_tipo_vinculo: () => this.navbar_.acessarTiposDeVinculos(),
      cargos: () => this.navbar_.acessarCargos(),
      niveis_gestao: () => this.navbar_.acessarNiveisDeGestao(),
      fluxos_trabalho: () => this.navbar_.acessarFluxosDeTrabalho(),
      gerenciar_tipo_territorio: () => this.navbar_.acessarTiposDeTerritorio(),
      gerenciar_tipo_imovel: () => this.navbar_.acessarTiposDeImovel(),
      gerenciar_tipo_ponto_estrategico: () =>
        this.navbar_.acessarTiposDePontoEstrategico(),
      gerenciar_solicitante: () => this.navbar_.acessarSolicitantes(),
      gerenciar_origem_demanda: () => this.navbar_.acessarOrigensDemanda(),
      gerenciar_categoria_demanda: () => this.navbar_.acessarCategoriaDemanda(),
      gerenciar_abrangencia: () => this.navbar_.acessarAbrangencias(),
      gerenciar_prioridade_demanda: () =>
        this.navbar_.acessarPrioridadeDemanda(),
      gerenciar_situacao_demanda: () => this.navbar_.acessarSituacaoDemanda(),
    };
  }

  /**
   * Ainda não há como acessar a página inicial do Sistema, apenas quando se
   * entra pela primeira vez
   */
  async get() {
    throw new Error('não é possível acessar a página inicial');
  }

  /**
   * acessa a página especificada pelo nome do botao
   * @param nomeBotao
   */
  async acessar(nomeBotao: string) {
    await this.btn2page_[nomeBotao]();
  }
}
