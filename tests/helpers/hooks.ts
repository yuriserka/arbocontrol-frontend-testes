const { BeforeAll, After } = require('cucumber');
import { getTestPage, logout } from './common';

/**
 * Roda somente uma vez e acessa a URL a ser testada
 */
BeforeAll(async () => {
  await getTestPage();
});

/**
 * faz logout depois de cada cenário do arquivo de feature
 */
After(async () => {
  await logout();
});
