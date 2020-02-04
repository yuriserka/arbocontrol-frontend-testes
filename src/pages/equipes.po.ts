/**
 * @fileoverview
 */

import { By, element } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { DataTable } from '../helpers/data_table';

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
   * Acessa a página relativa ao gerenciamento de equipes
   */
  async get() {
    await this.navbar_.acessarEquipes();
  }

  /**
   * Cadastra uma equipe no sistema sem nenhum usuário vinculado
   * @param nome nome da equipe
   */
  async criarEquipe(nome: string) {
    await element(this.botoes_.cadastrar).click();
    await element(By.xpath('//*[@formcontrolname="nome"]')).sendKeys(nome);
    await element(
      By.xpath('//*[@class = "mat-raised-button mat-button-base mat-primary"]')
    ).click();
  }

  /**
   * Seleciona uma equipe da lista de equipes na página de gerenciamento de equipes
   * @param equipe nome da equipe
   */
  async selecionarEquipe(equipe: string) {
    const linkEquipeAlvo = await DataTable.findTextIn(
      By.xpath('//tbody//tr//td//span[@class="span-link"]'),
      equipe
    );
    await linkEquipeAlvo.click();
  }

  /**
   * Vincula uma lista de usuários à equipe selecionada
   * @param equipe nome da equipe onde serão vinculados os usuários
   * @param usuarios array de usuário contendo informação sobre nome e cargo
   */
  async vincularUsuarios(
    equipe: string,
    usuarios: Array<{ [col: string]: string }>
  ) {
    await this.selecionarEquipe(equipe);
    for (const [idx, usuario] of usuarios.entries()) {
      await this.vincularUsuario(usuario, idx + 1);
    }
    await element(
      By.xpath('//div[@class="linha-botoes"]//button[@color="primary"]')
    ).click();
  }

  /**
   * vincula um usuario à equipe previamente selecionada
   * @param usuario contém informação sobre o nome e o cargo
   * @param index posição no qual aparece
   */
  private async vincularUsuario(
    usuario: { [header: string]: string },
    index: number
  ) {
    const campoNomeUsuario = By.xpath(
      '//input[@placeholder="Agente a Adicionar"]'
    );
    await element(campoNomeUsuario).click();
    await element(campoNomeUsuario).sendKeys(usuario['nome']);
    const username = await DataTable.findTextIn(
      By.xpath('//mat-option//span//span'),
      usuario['nome']
    );
    await username.click();
    const botaoAdicionar = By.xpath('(//button[@color="primary"])[1]');
    await element(botaoAdicionar).click();
    const userRow = await DataTable.findTextIn(
      By.xpath('//tbody//tr'),
      usuario['nome'],
      By.xpath(`(//td[contains(@class, "cdk-column-vinculo")]//a)[${index}]`)
    );
    await userRow
      .findElement(
        By.xpath(
          `(//td[contains(@class, "cdk-column-${usuario['cargo']}")]//div[@class="mat-slide-toggle-thumb"])[${index}]`
        )
      )
      .click();
    await element(campoNomeUsuario).clear();
  }
}
