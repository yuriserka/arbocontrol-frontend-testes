/**
 * @fileoverview
 */

import {browser, element} from 'protractor';

/**
 *
 */
export class CssEditor {
  /**
   *
   * @param {*} xpath
   * @param {*} prop
   * @param {*} val
   */
  change(xpath, prop, val) {
    return browser.executeScript(
        `arguments[0].style.${prop} = "${val}"`,
        element(xpath).getWebElement());
  };
};
