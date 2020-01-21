import reporter = require('cucumber-html-reporter');
import fs = require('fs');
import mkdirp = require('mkdirp');

export class Reporter {
  static createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  }

  static createHTMLReport() {
    try {
      reporter.generate({
        theme: 'bootstrap',
        jsonFile: 'results.json',
        output: 'logs/resultados/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
      });
    } catch (err) {
      throw new Error('Failed to save cucumber test results to json file.');
    }
  }
}
