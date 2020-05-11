const { setDefaultTimeout, Then } = require('cucumber');
import { expect } from 'chai';
import { TableDefinition } from 'cucumber';
import { RelatoriosPage } from '../src/pages/relatorios.po';
import { Relatorio, makeRelatorio } from '../src/models/relatorio';
import { element, By } from 'protractor';
import { atividades } from './helpers/background.steps';
import { timeout } from './helpers/common';

setDefaultTimeout(timeout);

const relatorioPage = new RelatoriosPage();
let relatorio: Relatorio;

Then(
  'eu vou cadastrar o relatorio para o formulario: {string}',
  async (formularioAlvo: string, dataTable: TableDefinition) => {
    relatorio = makeRelatorio(dataTable.hashes()[0]);
    await relatorioPage.cadastrarRelatorio(relatorio, formularioAlvo);
  }
);

Then(
  'eu vou conferir que há a quantidade de registros cadastrados',
  async () => {
    await relatorioPage.selecionarRelatorio(relatorio.titulo);
    const totalRegistros = +(await element(
      By.xpath('//*[@id="wdr-data-sheet"]/div/div[1]/div[3]/div[1]')
    ).getText());
    expect(Object.keys(atividades).length).to.be.equal(totalRegistros);
  }
);
