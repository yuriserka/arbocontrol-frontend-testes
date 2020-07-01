import dotenv = require('dotenv');
dotenv.config();

/**
 * URL usada como base para os testes
 */
export const baseUrl = process.env.URL_TO_TEST || 'http://localhost';

/**
 * conta do blazemeter utilizada
 */
export const blazeMeterAccount = {
  email: process.env.BLAZE_METER_EMAIL || 'none',
  senha: process.env.BLAZE_METER_SENHA || 'none',
};

/**
 * conta do Google para fazer login no Blazemeter, usado caso a opção de
 * login seja com o Google
 */
export const googleAccount = {
  email: process.env.GOOGLE_EMAIL || 'none',
  senha: process.env.GOOGLE_SENHA || 'none',
};
