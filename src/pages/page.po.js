/**
 * @fileoverview
 */

import {browser} from 'protractor';
import {Header} from '../helpers/header';
import {NavBar} from '../helpers/navbar';

/**
 *
 */
export class Page {
  constructor() {
    this.header = new Header();
    this.navbar = new NavBar(browser);
  }

  /**
   *
   */
  logout() {
    return this.header.logout();
  };

  /**
   *
   */
  async mostarBarraNavegacao() {
    await this.navbar.exibir();
  };
};
