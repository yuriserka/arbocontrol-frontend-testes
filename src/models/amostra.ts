export interface Amostra {
  número: string;
  tipo_de_criadouro: string;
  espécie: string;
  fase: string;
  quantidade: string;
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
