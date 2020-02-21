export interface DadosBasicos {
  readonly titulo: string;
  readonly descricao: string;
  readonly dataInicio: string;
  readonly dataFim: string;
  readonly abrangencia: string;
  readonly tipo_de_atividade: string;
}

export interface Atividade {
  readonly dadosBasicos: DadosBasicos;
  demandas?: string[];
  equipes?: string[];
  imoveis?: string[];
}

/**
 * retorna um Objeto que contem informações de uma Atividade
 * @param dadosBasicosData
 * @param demandasData
 * @param equipesData
 * @param imoveisData
 */
export function makeAtividade(
  dadosBasicosData: { [campo: string]: string },
  demandasData: Array<{ [campo: string]: string }>,
  equipesData: Array<{ [campo: string]: string }>,
  imoveisData: Array<{ [campo: string]: string }>
): Atividade {
  return {
    dadosBasicos: {
      titulo: dadosBasicosData['titulo'],
      descricao: dadosBasicosData['descricao'],
      dataInicio: dadosBasicosData['dataInicio'],
      dataFim: dadosBasicosData['dataFim'],
      abrangencia: dadosBasicosData['abrangencia'],
      tipo_de_atividade: dadosBasicosData['tipo_de_atividade'],
    },
    demandas: demandasData.map(d => d['número']),
    equipes: equipesData.map(e => e['nome']),
    imoveis: imoveisData.map(i => i['logradouro']),
  };
}
