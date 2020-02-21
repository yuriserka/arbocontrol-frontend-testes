export interface Imovel {
  readonly código: string;
  readonly versão: string;
  readonly território: string;
  readonly tipo_de_imovel: string;
  readonly logradouro: string;
  readonly número: string;
  readonly sequência: string;
  readonly complemento: string;
  readonly ponto_de_referência: string;
  readonly cep: string;
  readonly polígono: string;
  readonly lado_do_quarteirão: string;
}

/**
 * retorna um Objeto que contem informações de um Imovel
 * @param imovelData
 */
export function makeImovel(imovelData: { [campo: string]: string }): Imovel {
  return {
    código: imovelData['código'],
    versão: imovelData['versão'],
    território: imovelData['território'],
    tipo_de_imovel: imovelData['tipo_de_imovel'],
    logradouro: imovelData['logradouro'],
    número: imovelData['número'],
    sequência: imovelData['sequência'],
    complemento: imovelData['complemento'],
    ponto_de_referência: imovelData['ponto_de_referência'],
    cep: imovelData['cep'],
    polígono: imovelData['polígono'],
    lado_do_quarteirão: imovelData['lado_do_quarteirão'],
  };
}
