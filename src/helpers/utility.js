const protractor = require('protractor');
var EC = protractor.ExpectedConditions;

const utility = function() {
  this.waitClick = async function(path) {
    await EC.elementToBeClickable(element(path))
  }

  this.waitUrl = async function(url) {
    await EC.urlIs(element(url))
  }
  
  this.waitVisibility = async function(path) {
    await EC.visibilityOf(element(path))
  }

  this.pressEnter = async function() {
    await browser.actions().sendKeys(protractor.Key.Enter).perform();
  }
}

module.exports = utility;