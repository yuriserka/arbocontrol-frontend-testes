export interface RegistroDeLaboratorio {
  data_de_entrada: string;
  observação: string;
  data_da_conclusão: string;
  técnico_responsável: string;
}

/**
 * retorna um Objeto que contem informações de um Registro de Laboratorio
 * @param registro 
 */
export function makeRegistroDeLaboratorio(registro: {
  [key: string]: string;
}): RegistroDeLaboratorio {
  return {
    data_de_entrada: registro['data_de_entrada'],
    observação: registro['observação'],
    data_da_conclusão: registro['data_da_conclusão'],
    técnico_responsável: registro['técnico_responsável'],
  };
}
