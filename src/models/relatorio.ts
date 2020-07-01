export interface Relatorio {
  readonly campos: string[];
  readonly titulo: string;
  /**
   * possíveis valores: 'Relatório' | 'Indice';
   */
  readonly tipo: string;
}

/**
 * retorna um Objeto que contem informações de um Relatório
 * @param relatorioData
 * @param preBuiltValues um objeto que contenha qualquer um dos valores da interface [[Relatorio]] que irá substituir o valor do relatorioData
 */
export function makeRelatorio(
  relatorioData: { [key: string]: string },
  preBuiltValues?: { [campo: string]: string }
): Relatorio {
  const relatorio = {
    campos: relatorioData['campos'].split(', '),
    titulo: relatorioData['titulo'],
    tipo: relatorioData['tipo'],
  };

  return preBuiltValues
    ? {
        ...relatorio,
        ...preBuiltValues,
      }
    : relatorio;
}
