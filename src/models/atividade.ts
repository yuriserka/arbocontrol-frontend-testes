export interface DadosBasicosAtividade {
  readonly titulo: string;
  readonly descricao?: string;
  readonly dataInicio: string;
  readonly dataFim: string;
  readonly abrangencia: string;
  readonly tipo_de_atividade: string;
}

/**
 * abstração das informações necessárias para uma Atividade.
 */
export class Atividade {
  dadosBasicos: DadosBasicosAtividade;
  demandas: string[] = [];
  equipes: string[] = [];
  imoveis: string[] = [];

  constructor() {
    this.dadosBasicos = {
      titulo: 'none',
      descricao: 'none',
      dataInicio: 'none',
      dataFim: 'none',
      abrangencia: 'none',
      tipo_de_atividade: 'none',
    };
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const dadosBasicosData = {
   *  titulo: string;
   *  descricao?: string;
   *  dataInicio: string;
   *  dataFim: string;
   *  abrangencia: string;
   *  tipo_de_atividade: string;
   * };
   * ```
   */
  setDadosBasicos(dadosBasicosData: { [campo: string]: string }) {
    this.dadosBasicos = {
      titulo: dadosBasicosData['titulo'],
      descricao: dadosBasicosData['descricao'],
      dataInicio: dadosBasicosData['dataInicio'],
      dataFim: dadosBasicosData['dataFim'],
      abrangencia: dadosBasicosData['abrangencia'],
      tipo_de_atividade: dadosBasicosData['tipo_de_atividade'],
    };
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const demandasData = {
   *  número: string;
   * }[];
   * ```
   */
  setDemandas(demandasData: Array<{ [campo: string]: string }>) {
    this.demandas = demandasData.map(d => d['número']);
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const equipesData = {
   *  nome: string;
   * }[];
   * ```
   */
  setEquipes(equipesData: Array<{ [campo: string]: string }>) {
    this.equipes = equipesData.map(e => e['nome']);
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const imoveisData = {
   *  logradouro: string;
   * }[];
   * ```
   */
  setImoveis(imoveisData: Array<{ [campo: string]: string }>) {
    this.imoveis = imoveisData.map(i => i['logradouro']);
  }
}
