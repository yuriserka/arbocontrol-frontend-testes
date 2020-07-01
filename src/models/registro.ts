/**
 * Como os formularios sao dinamicos, entao essa interface permite que os campos
 * possam ser dinamicos
 */
export interface Registro {
  readonly [colname: string]: string;
}
