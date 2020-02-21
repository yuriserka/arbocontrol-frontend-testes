export interface Usuario {
  readonly cpf: string;
  readonly senha: string;
  readonly unidade: string;
}

/**
 * retorna um Objeto que contem informações de um usuario
 * @param usuarioData
 */
export function makeUsuario(usuarioData: { [campo: string]: string }): Usuario {
  return {
    cpf: usuarioData['cpf'],
    senha: usuarioData['senha'],
    unidade: usuarioData['unidade'],
  };
}
