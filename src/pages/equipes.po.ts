/**
 * @fileoverview
 */

import { By, element, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';

/**
 * @description Abstração da página de gerenciamento de equipes
 * @category Páginas do sistema
 */
export class EquipesPage extends Page {
  /**
   * @description mapeamento do nome dos botões para a função que deve ser
   * chamada
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {
      filtrar: By.xpath(
        '(//*[@class = "mat-raised-button mat-button-base mat-primary"])[1]'
      ),
      cadastrar: By.xpath(
        '(//*[@class = "mat-raised-button mat-button-base mat-primary"])[2]'
      ),
    };
  }

  async get() {
    await this.navbar_.acessarEquipes();
  }

  async criarEquipe(nome: string) {
    await element(this.botoes_.cadastrar).click();
    await element(By.xpath('//*[@formcontrolname="nome"]')).sendKeys(nome);
    await element(
      By.xpath('//*[@class = "mat-raised-button mat-button-base mat-primary"]')
    ).click();
  }

  async adicionarPessoas(equipe: string, usuarios: { nome: string, role: string }[]) {
    const rows = await element.all(By.xpath('//tbody//tr'));
    rows.forEach(async (row?: ElementFinder) => {
      const nome = await row?.element(By.xpath('.//td//span[@class="span-link"]')).getText();
      console.log({nome})
      console.log(nome === equipe);
    });
    // equipeAlvo.click();
    await browser.sleep(5000);
    usuarios.forEach(u => console.log(`${u.nome} sera adicionado a equipe ${equipe} como ${u.role}`));
  }
}
