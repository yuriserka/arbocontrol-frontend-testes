import reporter = require('cucumber-html-reporter');
import fs = require('fs');
import mkdirp = require('mkdirp');
import path = require('path');

let out_dir_: string;

export class Reporter {

  static createDirectory(dir: string) {
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir);
    }
    out_dir_ = dir;
  }

  static createHTMLReport() {
    try {
      reporter.generate({
        theme: 'bootstrap',
        jsonFile: path.join(out_dir_, 'results.json'),
        output: path.join(out_dir_, 'cucumber_report.html'),
        reportSuiteAsScenarios: true,
        launchReport: false,
      });
    } catch (err) {
      throw new Error('Failed to save cucumber test results to json file.');
    }
  }
}
