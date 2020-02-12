export interface RegistroDeCampo {
  readonly agente: string;
  readonly supervisor: string;
  readonly latitude_atual: string;
  readonly longitude_atual: string;
  readonly tipo_de_atividade: string;
  readonly ciclo: string;
  readonly data_inspeção: string;
  readonly hora_da_entrada: string;
  readonly hora_da_saída: string;
  readonly tipo_de_visita: string;
  readonly tipo_de_tratamento: string;
  readonly pendência: string;
  readonly a1_inspecionado: string;
  readonly a1_positivo: string;
  readonly a1_eliminado: string;
  readonly a2_inspecionado: string;
  readonly a2_positivo: string;
  readonly a2_eliminado: string;
  readonly b_inspecionado: string;
  readonly b_positivo: string;
  readonly b_eliminado: string;
  readonly c_inspecionado: string;
  readonly c_positivo: string;
  readonly c_eliminado: string;
  readonly d1_inspecionado: string;
  readonly d1_positivo: string;
  readonly d1_eliminado: string;
  readonly d2_inspecionado: string;
  readonly d2_positivo: string;
  readonly d2_eliminado: string;
  readonly e_inspecionado: string;
  readonly e_positivo: string;
  readonly e_eliminado: string;
  readonly numero_inicial: string;
  readonly número_final: string;
  readonly qtde_tubitos: string;
  readonly tipo_1: string;
  readonly qtde_tipo_1_g: string;
  readonly qtde_tratados_1g: string;
  readonly tipo_2: string;
  readonly qtde_tipo_2_: string;
  readonly qtde_tratados_2: string;
  readonly tipo_adulticida: string;
  readonly quantidade_cargas: string;
}

/**
 *
 * @param registro
 */
export function makeRegistroDeCampo(registro: {
  [capo: string]: string;
}): RegistroDeCampo {
  return {
    agente: registro['agente'],
    supervisor: registro['supervisor'],
    latitude_atual: registro['latitude_atual'],
    longitude_atual: registro['longitude_atual'],
    tipo_de_atividade: registro['tipo_de_atividade'],
    ciclo: registro['ciclo'],
    data_inspeção: registro['data_inspeção'],
    hora_da_entrada: registro['hora_da_entrada'],
    hora_da_saída: registro['hora_da_saída'],
    tipo_de_visita: registro['tipo_de_visita'],
    tipo_de_tratamento: registro['tipo_de_tratamento'],
    pendência: registro['pendência'],
    a1_inspecionado: registro['a1_inspecionado'],
    a1_positivo: registro['a1_positivo'],
    a1_eliminado: registro['a1_eliminado'],
    a2_inspecionado: registro['a2_inspecionado'],
    a2_positivo: registro['a2_positivo'],
    a2_eliminado: registro['a2_eliminado'],
    b_inspecionado: registro['b_inspecionado'],
    b_positivo: registro['b_positivo'],
    b_eliminado: registro['b_eliminado'],
    c_inspecionado: registro['c_inspecionado'],
    c_positivo: registro['c_positivo'],
    c_eliminado: registro['c_eliminado'],
    d1_inspecionado: registro['d1_inspecionado'],
    d1_positivo: registro['d1_positivo'],
    d1_eliminado: registro['d1_eliminado'],
    d2_inspecionado: registro['d2_inspecionado'],
    d2_positivo: registro['d2_positivo'],
    d2_eliminado: registro['d2_eliminado'],
    e_inspecionado: registro['e_inspecionado'],
    e_positivo: registro['e_positivo'],
    e_eliminado: registro['e_eliminado'],
    numero_inicial: registro['numero_inicial'],
    número_final: registro['número_final'],
    qtde_tubitos: registro['qtde_tubitos'],
    tipo_1: registro['tipo_1'],
    qtde_tipo_1_g: registro['qtde_tipo_1_g'],
    qtde_tratados_1g: registro['qtde_tratados_1g'],
    tipo_2: registro['tipo_2'],
    qtde_tipo_2_: registro['qtde_tipo_2_'],
    qtde_tratados_2: registro['qtde_tratados_2'],
    tipo_adulticida: registro['tipo_adulticida'],
    quantidade_cargas: registro['quantidade_cargas'],
  };
}
