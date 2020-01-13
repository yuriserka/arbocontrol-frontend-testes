const protractor = require('protractor');
const EC = protractor.ExpectedConditions;
const element = require('protractor').element;
const browser = require('protractor').browser;

class Utility {
  async waitClick(path) {
    await EC.elementToBeClickable(element(path));
  };

  async waitUrl(url) {
    await EC.urlIs(element(url));
  };

  async waitVisibility(path) {
    await EC.visibilityOf(element(path));
  };

  async pressEnter() {
    await browser
      .actions()
      .sendKeys(protractor.Key.Enter)
      .perform();
  };

  async fileToBase64(filename, filepath) {
    return new Promise(resolve => {
      var file = new File([filename], filepath);
      var reader = new FileReader();

      reader.onload = function (event) {
        resolve(event.target.result);
      };

      reader.readAsDataURL(file);
    });
  };

};

module.exports = Utility;
