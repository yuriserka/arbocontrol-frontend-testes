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

export const xenAccount = {
  username: process.env.XEN_ORCHESTRA_USERNAME || 'none',
  senha: process.env.XEN_ORCHESTRA_SENHA || 'none',
};

export const ftpAccount = {
  username: process.env.VM_FTP_USERNAME || 'none',
  senha: process.env.VM_FTP_SENHA || 'none',
};
