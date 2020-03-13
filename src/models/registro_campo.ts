// export interface RegistroDeCampo {
//   readonly agente: string;
//   readonly supervisor: string;
//   readonly latitude_atual: string;
//   readonly longitude_atual: string;
//   readonly tipo_de_atividade: string;
//   readonly ciclo: string;
//   readonly data_inspeção: string;
//   readonly hora_da_entrada: string;
//   readonly hora_da_saída: string;
//   readonly tipo_de_visita: string;
//   readonly tipo_de_tratamento: string;
//   readonly pendência: string;

//   readonly a1_inspecionado: string;
//   readonly a1_positivo: string;
//   readonly a1_eliminado: string;
//   readonly a2_inspecionado: string;
//   readonly a2_positivo: string;
//   readonly a2_eliminado: string;
//   readonly b_inspecionado: string;
//   readonly b_positivo: string;
//   readonly b_eliminado: string;
//   readonly c_inspecionado: string;
//   readonly c_positivo: string;
//   readonly c_eliminado: string;
//   readonly d1_inspecionado: string;
//   readonly d1_positivo: string;
//   readonly d1_eliminado: string;
//   readonly d2_inspecionado: string;
//   readonly d2_positivo: string;
//   readonly d2_eliminado: string;
//   readonly e_inspecionado: string;
//   readonly e_positivo: string;
//   readonly e_eliminado: string;

//   readonly numero_inicial: string;
//   readonly número_final: string;
//   readonly qtde_tubitos: string;

//   readonly tipo_1: string;
//   readonly qtde_tipo_1_g: string;
//   readonly qtde_tratados_1: string;
//   readonly tipo_2: string;
//   readonly qtde_tipo_2_g: string;
//   readonly qtde_tratados_2: string;

//   readonly tipo_adulticida: string;
//   readonly quantidade_cargas: string;
// }

// /**
//  * retorna um Objeto que contem informações de um Registro de Campo
//  * @param registroData
//  */
// export function makeRegistroDeCampo(registroData: {
//   [capo: string]: string;
// }): RegistroDeCampo {
//   return {
//     agente: registroData['agente'],
//     supervisor: registroData['supervisor'],
//     latitude_atual: registroData['latitude_atual'],
//     longitude_atual: registroData['longitude_atual'],
//     tipo_de_atividade: registroData['tipo_de_atividade'],
//     ciclo: registroData['ciclo'],
//     data_inspeção: registroData['data_inspeção'],
//     hora_da_entrada: registroData['hora_da_entrada'],
//     hora_da_saída: registroData['hora_da_saída'],
//     tipo_de_visita: registroData['tipo_de_visita'],
//     tipo_de_tratamento: registroData['tipo_de_tratamento'],
//     pendência: registroData['pendência'],

//     a1_inspecionado: registroData['a1_inspecionado'],
//     a1_positivo: registroData['a1_positivo'],
//     a1_eliminado: registroData['a1_eliminado'],
//     a2_inspecionado: registroData['a2_inspecionado'],
//     a2_positivo: registroData['a2_positivo'],
//     a2_eliminado: registroData['a2_eliminado'],
//     b_inspecionado: registroData['b_inspecionado'],
//     b_positivo: registroData['b_positivo'],
//     b_eliminado: registroData['b_eliminado'],
//     c_inspecionado: registroData['c_inspecionado'],
//     c_positivo: registroData['c_positivo'],
//     c_eliminado: registroData['c_eliminado'],
//     d1_inspecionado: registroData['d1_inspecionado'],
//     d1_positivo: registroData['d1_positivo'],
//     d1_eliminado: registroData['d1_eliminado'],
//     d2_inspecionado: registroData['d2_inspecionado'],
//     d2_positivo: registroData['d2_positivo'],
//     d2_eliminado: registroData['d2_eliminado'],
//     e_inspecionado: registroData['e_inspecionado'],
//     e_positivo: registroData['e_positivo'],
//     e_eliminado: registroData['e_eliminado'],

//     numero_inicial: registroData['numero_inicial'],
//     número_final: registroData['número_final'],
//     qtde_tubitos: registroData['qtde_tubitos'],

//     tipo_1: registroData['tipo_1'],
//     qtde_tipo_1_g: registroData['qtde_tipo_1_(g)'],
//     qtde_tratados_1: registroData['qtde_tratados_1'],
//     tipo_2: registroData['tipo_2'],
//     qtde_tipo_2_g: registroData['qtde_tipo_2_(g)'],
//     qtde_tratados_2: registroData['qtde_tratados_2'],

//     tipo_adulticida: registroData['tipo_adulticida'],
//     quantidade_cargas: registroData['quantidade_cargas'],
//   };
// }
