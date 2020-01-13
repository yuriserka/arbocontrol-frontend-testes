const element = require('protractor').element;

class CssEditor {
  constructor(browser) {
    this.browser = browser;
  }

  change(xpath, prop, val) {
    return this.browser.executeScript(`arguments[0].style.${prop} = "${val}"`, element(xpath).getWebElement());
  };
};

module.exports = CssEditor;
