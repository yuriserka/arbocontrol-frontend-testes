/**
 * @fileoverview
 */

import { By, element, browser } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { DataTable } from '../helpers/data_table';
import { SmartWaiter } from '../helpers/smart_waiter'

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

  /**
   * 
   */
  async get() {
    await this.navbar_.acessarEquipes();
  }

  /**
   * 
   * @param nome 
   */
  async criarEquipe(nome: string) {
    await element(this.botoes_.cadastrar).click();
    await element(By.xpath('//*[@formcontrolname="nome"]')).sendKeys(nome);
    await element(
      By.xpath('//*[@class = "mat-raised-button mat-button-base mat-primary"]')
    ).click();
  }

  /**
   * 
   * @param equipe 
   * @param usuarios 
   */
  async adicionarPessoas(equipe: string, usuarios: Array<{ nome: string, cargo: string }>) {
    const linkEquipeAlvo = await DataTable.findTextIn(By.xpath('//tbody//tr//td//span[@class="span-link"]'), equipe);
    await linkEquipeAlvo.click();
    for (const [idx, usuario] of usuarios.entries()) {
      const campoNomeUsuario = By.xpath('//input[@placeholder="Agente a Adicionar"]');
      await element(campoNomeUsuario).click();
      await element(campoNomeUsuario).sendKeys(usuario.nome);
      const opcoesUsuarios = '//mat-option';
      await SmartWaiter.waitVisibility(By.xpath(`(${opcoesUsuarios})[${(await element.all(By.xpath(opcoesUsuarios))).length}]`));
      const username = await DataTable.findTextIn(By.xpath(`${opcoesUsuarios}//span//span`), usuario.nome);
      await username.click();
      const botaoAdicionar = By.xpath('(//button[@color="primary"])[1]');
      await element(botaoAdicionar).click();
      const userRow = await DataTable.findTextIn(By.xpath('//tbody//tr'), usuario.nome, By.xpath(`(//td[contains(@class, "cdk-column-vinculo")]//a)[${idx + 1}]`));
      await userRow.findElement(By.xpath(`(//td[contains(@class, "cdk-column-${usuario.cargo}")]//div[@class="mat-slide-toggle-thumb"])[${idx + 1}]`)).click();
      await element(campoNomeUsuario).clear();
    }
    await element(By.xpath('//div[@class="linha-botoes"]//button[@color="primary"]')).click();
  }
}
