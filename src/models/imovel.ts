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
 * Acho que essa abordagem quebraria a flexibilidade que tenho atualmente
 * @param imovel
 */
export function makeImovel(imovel: { [campo: string]: string }): Imovel {
  return {
    código: imovel['código'],
    versão: imovel['versão'],
    território: imovel['território'],
    tipo_de_imovel: imovel['tipo_de_imovel'],
    logradouro: imovel['logradouro'],
    número: imovel['número'],
    sequência: imovel['sequência'],
    complemento: imovel['complemento'],
    ponto_de_referência: imovel['ponto_de_referência'],
    cep: imovel['cep'],
    polígono: imovel['polígono'],
    lado_do_quarteirão: imovel['lado_do_quarteirão'],
  };
}
