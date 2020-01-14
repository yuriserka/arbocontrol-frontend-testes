/**
 * @fileoverview
 */

import {By, element} from 'protractor';
import {NavBar} from './navbar';

/**
 *
 */
export class Header {
  constructor() {
    this.botoes = {
      sair: By.xpath(
          '//button[@class="mat-button mat-button-base ng-star-inserted"]'),
    };
  }

  /**
   *
   */
  mostrarBarraDeNavegacao() {
    return new NavBar().exibir();
  };

  /**
   *
   */
  logout() {
    return element(this.botoes.sair).click();
  };
};
