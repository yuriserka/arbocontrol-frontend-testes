const By = require('protractor').By;
const element = require('protractor').element;

const CssEditor = function (browser) {
    this.change = function (xpath, prop, val) {
        return browser.executeScript(`arguments[0].style.${prop} = "${val}"`,
            element(xpath).getWebElement());
    }
}

module.exports = CssEditor;