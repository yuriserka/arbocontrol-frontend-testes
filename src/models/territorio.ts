export interface Territorio {
  readonly tipo_de_territorio?: string;
  readonly nome: string;
  readonly polígono?: string;
  readonly código_legado?: string;
  readonly territorio_superior?: string;
  readonly tipo_de_zona?: string;
  readonly área_de_gestão?: string;
  readonly latitude?: string;
  readonly longitude?: string;
  readonly altitude?: string;
  readonly google_plus_clode?: string;
  readonly sequência_do_quarteirão?: string;
  readonly número_do_quarteirão?: string;
  readonly versão?: string;
  readonly croqui?: string;
  readonly data_de_criação_formal?: string;
  readonly data_de_alteracao_formal?: string;
}

/**
 * retorna um Objeto que contem informações de um Território
 * @param territorioData
 * @param preBuiltValues um objeto que contenha qualquer um dos valores da interface [[Territorio]] que irá substituir o valor do territorioData
 */
export function makeTerritorio(
  territorioData: { [campo: string]: string },
  preBuiltValues?: { [campo: string]: string }
): Territorio {
  const territorio = {
    tipo_de_territorio: territorioData['tipo_de_territorio'],
    nome: territorioData['nome'],
    polígono: territorioData['polígono'],
    código_legado: territorioData['código_legado'],
    territorio_superior: territorioData['territorio_superior'],
    tipo_de_zona: territorioData['tipo_de_zona'],
    área_de_gestão: territorioData['área_de_gestão'],
    latitude: territorioData['latitude'],
    longitude: territorioData['longitude'],
    altitude: territorioData['altitude'],
    google_plus_clode: territorioData['google_plus_clode'],
    sequência_do_quarteirão: territorioData['sequência_do_quarteirão'],
    número_do_quarteirão: territorioData['número_do_quarteirão'],
    versão: territorioData['versão'],
    croqui: territorioData['croqui'],
    data_de_criação_formal: territorioData['data_de_criação_formal'],
    data_de_alteracao_formal: territorioData['data_de_alteracao_formal'],
  };

  return preBuiltValues
    ? {
        ...territorio,
        ...preBuiltValues,
      }
    : territorio;
}
