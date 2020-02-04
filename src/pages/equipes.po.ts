/**
 * @fileoverview
 */

import { By, element } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { DataTable } from '../helpers/data_table';
import { CssEditor } from '../helpers/css_editor';
import { SmartWaiter } from '../helpers/smart_waiter';

/**
 * Abstração da página de gerenciamento de equipes
 * @category Páginas do sistema
 */
export class EquipesPage extends Page {
  /**
   * mapeamento do nome dos botões para a função que deve ser
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
   * exclui uma equipe do sistema
   * @param nome nome da equipe
   */
  async excluirEquipe(nome: string) {
    await this.desvincularUsuarios(nome);
    await element(
      By.xpath('//div[@class="linha-botoes"]//button[@color="warn"]')
    ).click();
    await this.confirmarExclusao();
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
    for (let i = 0; i < usuarios.length; i++) {
      const usuario = usuarios[i];
      await this.vincularUsuario(usuario);
    }
    await element(
      By.xpath('//div[@class="linha-botoes"]//button[@color="primary"]')
    ).click();
  }

  /**
   * desvincula os usuarios da equipe que foi selecionada anteriormente
   * @param nomes array contendo o nome dos usuarios que devem ser excluidos, caso nenhum nome seja passado, todos serão excluidos
   */
  async desvincularUsuarios(nomeEquipe: string, nomes?: string[]) {
    await this.selecionarEquipe(nomeEquipe);

    let usernames: string[] = await DataTable.getAllRows(
      By.xpath('//tbody//tr//td[contains(@class, "cdk-column-vinculo")]//a')
    ).map(usernameLink => usernameLink?.getText());

    if (nomes) {
      usernames = usernames.filter(u => nomes.includes(u));
    }

    for (let i = 0; i < usernames.length; i++) {
      await this.desvincularUsuario(usernames[i]);
    }

    if (nomes) {
      await element(
        By.xpath('//div[@class="linha-botoes"]//button[@color="primary"]')
      ).click();
    }
  }

  /**
   * Vincula uma lista de usuários à equipe selecionada
   * @param equipe nome da equipe onde serão vinculados os usuários
   * @param usuarios array de usuário contendo informação sobre nome e cargo
   */
  private async desvincularUsuario(nome: string) {
    const userRow = await this.getUsuarioRow(nome);
    await userRow
      .element(By.xpath(`.//td[contains(@class, "cdk-column-acoes")]//button`))
      .click();
    await this.confirmarExclusao();
  }

  /**
   * Seleciona uma equipe da lista de equipes na página de gerenciamento de equipes
   * @param equipe nome da equipe
   */
  private async selecionarEquipe(equipe: string) {
    const linkEquipeAlvo = await DataTable.findTextIn(
      By.xpath('//tbody//tr//td//span[@class="span-link"]'),
      equipe
    );
    await linkEquipeAlvo.click();
  }

  /**
   * vincula um usuario à equipe previamente selecionada
   * @param usuario contém informação sobre o nome e o cargo
   */
  private async vincularUsuario(usuario: { [header: string]: string }) {
    await this.adicionarUsuario(usuario['nome']);
    await this.setCargo(usuario);
  }

  /**
   * adiciona um usuario à equipe
   * @param nome nome do usuario
   */
  private async adicionarUsuario(nome: string) {
    const campoNomeUsuario = By.xpath(
      '//input[@placeholder="Agente a Adicionar"]'
    );
    await element(campoNomeUsuario).click();
    await element(campoNomeUsuario).sendKeys(nome);
    const username = await DataTable.findTextIn(
      By.xpath('//mat-option//span//span'),
      nome
    );
    await username.click();
    const botaoAdicionar = By.xpath('(//button[@color="primary"])[1]');
    await element(botaoAdicionar).click();
    await element(campoNomeUsuario).clear();
  }

  /**
   * retorna a linha que contém as informações do usuario
   * @param nome nome do usuario
   */
  private async getUsuarioRow(nome: string) {
    return DataTable.findTextIn(
      By.xpath('//tbody//tr'),
      nome,
      By.xpath(`//td[contains(@class, "cdk-column-vinculo")]//a`)
    );
  }

  /**
   * atribui um cargo ao usuario
   * @param usuario estrutura que contém informação sobre nome e cargo
   */
  private async setCargo(usuario: { [header: string]: string }) {
    const userRow = await this.getUsuarioRow(usuario['nome']);
    await userRow
      .element(
        By.xpath(
          `.//td[contains(@class, "cdk-column-${usuario['cargo']}")]//div[@class="mat-slide-toggle-thumb"]`
        )
      )
      .click();
  }

  /**
   * função auxiliar para a confirmação de exclusão tanto para a remoção de usuários quanto da equipe
   */
  private async confirmarExclusao() {
    await CssEditor.alterar(
      By.xpath('//div[contains(@class, "cdk-overlay-backdrop")]'),
      [{ atributo: 'display', valor: 'none' }]
    );

    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    const botaoConfirmacao = By.xpath('(//mat-dialog-actions//button)[1]');
    await SmartWaiter.waitVisibility(botaoConfirmacao);
    await SmartWaiter.waitClick(botaoConfirmacao);
    await element(botaoConfirmacao).click();
  }
}
