import * as reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

const jsonReports = path.join('./reports/json');
const htmlReports = path.join('./reports/html');
const targetJson = jsonReports + '/cucumber_report.json';

const cucumberReporterOptions: reporter.Options = {
  jsonFile: targetJson,
  output: htmlReports + '/cucumber_reporter.html',
  reportSuiteAsScenarios: true,
  theme: 'bootstrap',
  launchReport: true,
};

export class Reporter {
  public static createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
  }

  public static createHTMLReport() {
    try {
      reporter.generate(cucumberReporterOptions);
    } catch (err) {
      if (err) {
        throw new Error('Failed to save cucumber test results to json file.');
      }
    }
  }
}
