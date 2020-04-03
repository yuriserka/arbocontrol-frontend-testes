export interface DadosBasicosPerfilUsuario {
  readonly nome: string;
  readonly descricao?: string;
}

export interface ControleRecurso {
  readonly recurso: string;
  /**
   * possíveis valores: 'INSERIR' | 'VISUALIZAR' | 'DELETAR' | 'EDITAR' | 'TODAS AÇÕES';
   */
  readonly autoridade: string;
}

export interface ControleFormulario {
  readonly formulario: string;
  /**
   * possiveis valores: 'VISUALIZAR' | 'EDITAR';
   */
  readonly autoridade: string;
}

/**
 * abstração das informações necessárias para um Perfil de Usuario
 *
 *
 * os únicos setters válidos sao os *Data, porém nao possuem getter
 * dado que o TS não permite que o set e get tenham tipos diferentes.
 * desta forma a aplicação desta classe faz-se
 * ```ts
 * const perfil = new PerfilUsuario();
 *
 * // setters
 * perfil.recursosData = { nomeRecurso: string; autoridade: 'INSERIR' | 'VISUALIZAR' | 'DELETAR' | 'EDITAR' | 'TODAS AÇÕES' }[];
 * perfil.formulariosData = { nomeFormulario: string; autoridade: 'VISUALIZAR' | 'EDITAR' }[];
 *
 * // getters
 * recursos: ControleRecurso[] = perfil.recursos;
 * forms: ControleFormulario[] = perfil.formularios;
 * ```
 */
export class PerfilUsuario {
  private _dadosBasicos: DadosBasicosPerfilUsuario;
  private _recursos: ControleRecurso[] = [];
  private _formularios: ControleFormulario[] = [];

  constructor() {
    this._dadosBasicos = {
      nome: 'none',
      descricao: 'none',
    };
  }

  get dadosBasicosData() {
    throw new Error('invalid getter');
  }

  get recursosData() {
    throw new Error('invalid getter');
  }

  get formulariosData() {
    throw new Error('invalid getter');
  }

  set dadosBasicos(dados: DadosBasicosPerfilUsuario) {
    throw new Error('invalid setter');
  }

  set recursos(dados: ControleRecurso[]) {
    throw new Error('invalid setter');
  }

  set formularios(dados: ControleFormulario[]) {
    throw new Error('invalid setter');
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const dadosBasicosData = {
   *  nome: string;
   *  descricao?: string;
   * };
   * ```
   */
  set dadosBasicosData(dadosBasicosData: { [campo: string]: string }) {
    this._dadosBasicos = {
      nome: dadosBasicosData['nome'],
      descricao: dadosBasicosData['descricao'],
    };
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const recursosData = {
   *  nome_recurso: string;
   *  autoridade: 'INSERIR' | 'VISUALIZAR' | 'DELETAR' | 'EDITAR' | 'TODAS AÇÕES';
   * }[];
   * ```
   */
  set recursosData(recursosData: Array<{ [campo: string]: string }>) {
    this._recursos = recursosData.map(r => {
      return {
        recurso: r['recurso'],
        autoridade: r['autoridade'].toUpperCase(),
      };
    });
  }

  /**
   * os dados de entrada devem estar no formato:
   * ```ts
   * const equipesData = {
   *  formulario: string;
   *  autoridade: 'VISUALIZAR' | 'EDITAR';
   * }[];
   * ```
   */
  set formulariosData(equipesData: Array<{ [campo: string]: string }>) {
    this._formularios = equipesData.map(f => {
      return {
        formulario: f['formulario'],
        autoridade: f['autoridade'].toUpperCase(),
      };
    });
  }

  /**
   * retorna um objeto representando a interface [[`DadosBasicosPerfilUsuario]]
   */
  get dadosBasicos() {
    return this._dadosBasicos;
  }

  /**
   * retorna um [[Array<ControleRecurso>]] representando o recurso e a autoridade sobre ele
   */
  get recursos() {
    return this._recursos;
  }

  /**
   * retorna um [[Array<ControleFormulario>]] representando o formulario e a autoridade sobre ele
   */
  get formularios() {
    return this._formularios;
  }
}
