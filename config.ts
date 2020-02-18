import dotenv = require('dotenv');
dotenv.config();

export const baseUrl = process.env.VM_URL || 'http://localhost';

export const blazeMeterAccount = {
  email: process.env.BLAZE_METER_EMAIL || 'none',
  senha: process.env.BLAZE_METER_SENHA || 'none',
};

export const googleAccount = {
  email: process.env.GOOGLE_EMAIL || 'none',
  senha: process.env.GOOGLE_SENHA || 'none',
};
