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
 * abstração das informações necessárias para um Perfil de Usuario.
 */
export class PerfilUsuario {
  dadosBasicos: DadosBasicosPerfilUsuario;
  recursos: ControleRecurso[] = [];
  formularios: ControleFormulario[] = [];

  constructor() {
    this.dadosBasicos = {
      nome: 'none',
      descricao: 'none',
    };
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
  setDadosBasicos(dadosBasicosData: { [campo: string]: string }) {
    this.dadosBasicos = {
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
  setRecursos(recursosData: Array<{ [campo: string]: string }>) {
    this.recursos = recursosData.map(r => {
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
  setFormularios(equipesData: Array<{ [campo: string]: string }>) {
    this.formularios = equipesData.map(f => {
      return {
        formulario: f['formulario'],
        autoridade: f['autoridade'].toUpperCase(),
      };
    });
  }
}
