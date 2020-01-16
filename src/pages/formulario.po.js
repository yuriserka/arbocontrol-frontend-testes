/**
 * @fileoverview
 */

import {By, element, Locator} from 'protractor';
import Utility from '../helpers/utility';
import {Page} from './page.po';

const util = new Utility();

/**
 * Abstração da página de Formulários
 */
export class FormPage extends Page {
  constructor() {
    /**
     * @description botões que necessitam de ser clicados
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.botoes_ = {
      cadastrar: By.xpath(
          `//*[@class='mat-raised-button mat-button-base mat-primary']`),
      filtro: By.xpath(
          `//*[@class='mat-raised-button mat-button-base ng-star-inserted']`),
    };

    /**
     * @description campos que devem ser preenchidos
     * @private
     * @constant
     * @type {!Object<!String, !Locator>}
     */
    this.input_ = {
      filtro: By.xpath('(//input[contains(@class, "mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored")])[2]'),
    };
  }

  /**
   *
   */
  async get() {
    await this.navbar_.acessarFormularios();
  }

  /**
   *
   * @param {!String} palavra
   */
  async pesquisar(palavra) {
    await util.waitVisibility(this.input_.filtro);
    await element(this.input_.filtro).sendKeys(palavra);
    await util.waitClick(this.botoes_.filtro);
    await element(this.botoes_.filtro).click();

    const itens =
        await element.all(By.xpath(`//tr[@class='mat-row ng-star-inserted']`));
    const titulosRetornados = [];
    itens.forEach((item) => {
      console.log(item);
      // const coluna_titulo = await item.element(By.xpath(
      // `.//td[@class='mat-cell cdk-column-titulo
      // mat-column-titulo ng-star-inserted']`));
      // const titulo = await coluna_titulo.element(By.xpath(
      // `.//span[@class='span-link']`)).getText();
      titulosRetornados.push(item);
    });

    return titulosRetornados;
  }
}
