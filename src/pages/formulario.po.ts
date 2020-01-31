// /**
//  * @fileoverview
//  */

// import {By, element, Locator} from 'protractor';
// import {SmartWaiter} from '../helpers/smart_waiter';
// import {Page} from './page.po';

// const waiter = new SmartWaiter();

// /**
//  * @description Abstração da página de Formulários
//  * @category Páginas do sistema
//  */
// export class FormPage extends Page {
//   constructor() {
//     super();
//     /**
//      * @description botões que necessitam de ser clicados
//      * @private
//      * @constant
//      * @type {!Object<!string, !Locator>}
//      */
//     this.botoes_ = {
//       cadastrar: By.xpath(
//           `//*[@class='mat-raised-button mat-button-base mat-primary']`),
//       filtro: By.xpath(
//           `//*[@class='mat-raised-button mat-button-base
//           ng-star-inserted']`),
//     };

//     /**
//      * @description campos que devem ser preenchidos
//      * @private
//      * @constant
//      * @type {!Object<!string, !Locator>}
//      */
//     this.input_ = {
//       filtro: By.xpath(
//           '(//input[contains(@class, "mat-input-element
//           mat-form-field-autofill-control
//           cdk-text-field-autofill-monitored")])[2]'),
//     };
//   }

//   /**
//    *
//    */
//   async get() {
//     await super.navbar_.acessarFormularios();
//   }

//   /**
//    *
//    * @param {!string} palavra
//    */
//   async pesquisar(palavra: string) {
//     await waiter.waitVisibility(this.input_.filtro);
//     await element(this.input_.filtro).sendKeys(palavra);
//     await waiter.waitClick(this.botoes_.filtro);
//     await element(this.botoes_.filtro).click();

//     const itens =
//         await element.all(By.xpath(`//tr[@class='mat-row
//         ng-star-inserted']`));
//     const titulosRetornados = [];
//     itens.forEach((item) => {
//       console.log(item);
//       // const coluna_titulo = await item.element(By.xpath(
//       // `.//td[@class='mat-cell cdk-column-titulo
//       // mat-column-titulo ng-star-inserted']`));
//       // const titulo = await coluna_titulo.element(By.xpath(
//       // `.//span[@class='span-link']`)).getText();
//       titulosRetornados.push(item);
//     });

//     return titulosRetornados;
//   }
// }
