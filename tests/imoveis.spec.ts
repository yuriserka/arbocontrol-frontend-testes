import { setDefaultTimeout, Then, When } from 'cucumber';
import { expect } from 'chai';
import { browser } from 'protractor';
import { TableDefinition } from 'cucumber';
import { baseUrl } from '../src/common';
import { ImoveisPage } from '../src/pages/imoveis.po';
import { assertImovelExiste } from './helpers/asserts/imovel';
import { makeImovel } from '../src/models/imovel';
import { timeout } from './helpers/common';
import { territorio } from './helpers/background.steps';

setDefaultTimeout(timeout);
const imovelPage = new ImoveisPage();

When('eu acessar a pagina dos imoveis', async () => {
  await imovelPage.get();
});

Then(
  'eu vou cadastrar o imovel no territorio criado',
  async (dataTable: TableDefinition) => {
    const imovel = makeImovel(dataTable.hashes()[0], {
      território: territorio.nome,
    });
    await imovelPage.cadastrarImovel(imovel);
    expect(await browser.driver.getCurrentUrl()).to.be.equal(
      `${baseUrl}/imoveis`
    );

    expect(await assertImovelExiste(imovel.logradouro)).to.be.equal(true);
  }
);

Then(
  'eu vou excluir o imovel que possui logradouro igual a {string}',
  async (logradouro: string) => {
    await imovelPage.excluirImovel(logradouro);
    expect(await assertImovelExiste(logradouro)).to.be.equal(false);
  }
);
