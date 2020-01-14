/**
 * @fileoverview
 */

import {browser, element, ExpectedConditions as EC} from 'protractor';

/**
 *
 */
export class Utility {
  constructor() {
    this.timeout = 5000;
  }
  /**
   *
   * @param {*} path
   */
  async waitClick(path) {
    await browser.wait(EC.elementToBeClickable(element(path)), this.timeout);
  };

  /**
   *
   * @param {*} url
   */
  async waitUrl(url) {
    await browser.wait(EC.urlIs(element(url)), this.timeout);
  };

  /**
   *
   * @param {*} path
   */
  async waitVisibility(path) {
    await browser.wait(EC.visibilityOf(element(path)), this.timeout);
  };
};
