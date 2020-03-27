export interface DadosBasicos {
  readonly titulo: string;
  readonly descricao?: string;
  readonly dataInicio: string;
  readonly dataFim: string;
  readonly abrangencia: string;
  readonly tipo_de_atividade: string;
}

/**
 * abstração das informações necessárias para uma Atividade
 *
 *
 * os únicos setters válidos sao os *Data, pois infelizmente não é possivel fazer apenas
 * ```ts
 * set demandas(demandasData: Array<{ [campo: string]: string }>) { ... }
 * get demandas() { ... }
 * ```
 * dado que o TS não permite que o set e get tenham tipos diferentes.
 * desta forma a aplicação desta classe faz-se
 * ```ts
 * const atividade = new Atividade();
 *
 * // setters
 * atividade.demandasData = { número: string; }[]; // mapeia o demandasData -> string[],
 * atividade.equipesData = { nome: string; }[]; // mapeia o equipesData -> string[],
 * atividade.imoveisData = { logradouro: string; }[]; // mapeia o imoveisData -> string[],
 *
 * // getters
 * num_das_ demandas: string[] = atividade.demandas; // o getter retorna ainda o array de strings normalmente
 * nome_das_equipes: string[] = atividade.equipes; // o getter retorna ainda o array de strings normalmente
 * logradouro_dos_imoveis: string[] = atividade.imoveis; // o getter retorna ainda o array de strings normalmente
 * ```
 * também não é possível fazer com que o getters *Data sejam privados a fim de se evitar confusões.
 */
export class Atividade {
  private _dadosBasicos: DadosBasicos;
  private _demandas: string[] = [];
  private _equipes: string[] = [];
  private _imoveis: string[] = [];

  constructor() {
    this._dadosBasicos = {
      titulo: 'none',
      descricao: 'none',
      dataInicio: 'none',
      dataFim: 'none',
      abrangencia: 'none',
      tipo_de_atividade: 'none',
    };
  }

  get dadosBasicosData() {
    throw new Error('invalid getter');
  }

  get demandasData() {
    throw new Error('invalid getter');
  }

  get equipesData() {
    throw new Error('invalid getter');
  }

  get imoveisData() {
    throw new Error('invalid getter');
  }

  set dadosBasicos(dados: DadosBasicos) {
    throw new Error('invalid setter');
  }

  set demandas(dados: string[]) {
    throw new Error('invalid setter');
  }

  set equipes(dados: string[]) {
    throw new Error('invalid setter');
  }

  set imoveis(dados: string[]) {
    throw new Error('invalid setter');
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
  set dadosBasicosData(dadosBasicosData: { [campo: string]: string }) {
    this._dadosBasicos = {
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
  set demandasData(demandasData: Array<{ [campo: string]: string }>) {
    this._demandas = demandasData.map(d => d['número']);
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const equipesData = {
   *  nome: string;
   * }[];
   * ```
   */
  set equipesData(equipesData: Array<{ [campo: string]: string }>) {
    this._equipes = equipesData.map(e => e['nome']);
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const imoveisData = {
   *  logradouro: string;
   * }[];
   * ```
   */
  set imoveisData(imoveisData: Array<{ [campo: string]: string }>) {
    this._imoveis = imoveisData.map(i => i['logradouro']);
  }

  /**
   * retorna um objeto representando a interface [[`DadosBasicos`]]
   */
  get dadosBasicos() {
    return this._dadosBasicos;
  }

  /**
   * retorna um [[Array<string>]] representando o número das demandas da atividade
   */
  get demandas() {
    return this._demandas;
  }

  /**
   * retorna um [[Array<string>]] representando o nome das equipes da atividade
   */
  get equipes() {
    return this._equipes;
  }

  /**
   * retorna um [[Array<string>]] representando o logradouro dos imoveis da atividade
   */
  get imoveis() {
    return this._imoveis;
  }
}
