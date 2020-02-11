import reporter = require('cucumber-html-reporter');
import fs = require('fs');
import mkdirp = require('mkdirp');
import path = require('path');

let outDir: string;

/**
 * classe Responsavel por exportar relatorios do cucumber
 */
export class Reporter {
  /**
   * Assegura que o diretório no qual será salvo os resultados existe
   * @param diretorio
   */
  static criarDiretorio(diretorio: string) {
    if (!fs.existsSync(diretorio)) {
      mkdirp.sync(diretorio);
    }
    outDir = diretorio;
  }

  /**
   * gera um relatorio html apresentando as funcionalidades que foram testadas
   */
  static gerarRelatorioCucumber() {
    try {
      reporter.generate({
        theme: 'bootstrap',
        jsonFile: path.join(outDir, 'results.json'),
        output: path.join(outDir, 'cucumber_report.html'),
        reportSuiteAsScenarios: true,
        launchReport: false,
      });
    } catch (err) {
      throw new Error(
        'Falha ao salvar arquivo com resultado dos testes do Cucumber.'
      );
    }
  }
}
