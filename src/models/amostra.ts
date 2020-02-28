export interface Amostra {
  readonly número: string;
  readonly tipo_de_criadouro: string;
  readonly espécie: string;
  readonly fase: string;
  readonly quantidade: string;
}

/**
 * retorna um Objeto que contem informações de uma Amostra
 * @param amostra 
 */
export function makeAmostra(amostra: { [key: string]: string }): Amostra {
  return {
    número: amostra['número'],
    tipo_de_criadouro: amostra['tipo_de_criadouro'],
    espécie: amostra['espécie'],
    fase: amostra['fase'],
    quantidade: amostra['quantidade'],
  };
}
