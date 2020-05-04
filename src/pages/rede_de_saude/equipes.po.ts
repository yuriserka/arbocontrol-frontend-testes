import { By, element, browser } from 'protractor';
import { SystemPage } from '../page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../../helpers/selectors';
import { SmartWaiter } from '../../helpers/smart_waiter';

/**
 * Abstração da página de gerenciamento de equipes
 * @category Páginas do sistema
 */
export class EquipesPage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {
      filtrar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
  }

  /**
   * Acessa a página relativa ao gerenciamento de equipes
   */
  async get() {
    await this.navbar_.acessarEquipes();
  }

  /**
   * Cadastra uma equipe com os usuarios passados
   *
   * ```ts
   * // os usuarios devem vir no formato
   * const usuarios: {
   *   nome: string;
   *   cargo: string;
   * }[]
   * ```
   * @param nome
   * @param usuarios
   */
  async cadastrarEquipe(
    nome: string,
    usuarios: Array<{ [col: string]: string }>
  ) {
    await this.criarEquipe(nome);
    await this.vincularUsuarios(nome, usuarios);
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
   * desvincula os usuarios da equipe passada
   * @param nomes array contendo o nome dos usuarios que devem ser excluidos,
   * caso nenhum nome seja passado, todos serão excluidos
   */
  async desvincularUsuarios(nomeEquipe: string, nomes?: string[]) {
    await this.selecionarEquipe(nomeEquipe);

    const usernames: string[] = nomes
      ? nomes
      : await element
          .all(
            By.xpath('//tbody//tr/td[contains(@class, "cdk-column-vinculo")]/a')
          )
          .map(link => link?.getText());

    for (let i = 0; i < usernames.length; ++i) {
      await this.desvincularUsuario(usernames[i]);
    }

    if (nomes) {
      await this.salvar();
    }
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
    for (let i = 0; i < usuarios.length; ++i) {
      const usuario = usuarios[i];
      await this.vincularUsuario(usuario);
    }
    await this.salvar();
  }

  /**
   * Seleciona uma equipe da lista de equipes na página de gerenciamento de equipes
   * @param nomeEquipe
   */
  async selecionarEquipe(nomeEquipe: string) {
    await SmartWaiter.waitVisibility(By.xpath('//app-equipe-tabela//tbody'));
    await selectFrom(
      By.xpath('//app-equipe-tabela//tbody//tr/td/span[@class="span-link"]'),
      nomeEquipe
    );
  }

  /**
   * Cadastra uma equipe no sistema sem nenhum usuário vinculado
   * @param nome nome da equipe
   */
  private async criarEquipe(nome: string) {
    await SmartWaiter.waitVisibility(this.botoes_.cadastrar);
    await element(this.botoes_.cadastrar).click();
    const campoNome = By.xpath('//input[@formcontrolname="nome"]');
    await SmartWaiter.waitVisibility(campoNome);
    await element(campoNome).sendKeys(nome);
    await element(By.xpath('//button[@color="primary"]')).click();
  }

  /**
   * vincula um usuario à equipe previamente selecionada
   * @param usuario contém informação sobre o nome e o cargo
   */
  private async vincularUsuario(usuario: { [key: string]: string }) {
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
    await selectFrom(By.xpath('//mat-option//span//span'), nome);
    const botaoAdicionar = By.xpath('(//button[@color="primary"])[1]');
    await element(botaoAdicionar).click();
    await element(campoNomeUsuario).clear();
  }

  /**
   * atribui um cargo ao usuario
   * @param usuario estrutura que contém informação sobre nome e cargo
   */
  private async setCargo(usuario: { [key: string]: string }) {
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
   * Desvincula um usuário da equipe
   * @param nome
   */
  private async desvincularUsuario(nome: string) {
    const userRow = await this.getUsuarioRow(nome);
    await userRow
      .element(By.xpath('.//td[contains(@class, "cdk-column-acoes")]//button'))
      .click();
    await this.confirmarExclusao();
  }

  /**
   * função auxiliar para a confirmação de exclusão tanto para a remoção de
   * usuários quanto da equipe
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    const botaoConfirmacao = By.xpath('(//mat-dialog-actions//button)[1]');
    await SmartWaiter.waitVisibility(botaoConfirmacao);
    await SmartWaiter.waitClick(botaoConfirmacao);
    await element(botaoConfirmacao).click();
    await browser.sleep(1000);
  }

  /**
   * clica para salvar as alterações na equipe
   */
  private async salvar() {
    await element(
      By.xpath('//div[@class="linha-botoes"]//button[@color="primary"]')
    ).click();
  }

  /**
   * retorna a linha que contém as informações do usuario
   * @param nome nome do usuario
   */
  private async getUsuarioRow(nome: string) {
    return getNodeWithText(
      By.xpath('//tbody//tr'),
      nome,
      By.xpath('.//td[contains(@class, "cdk-column-vinculo")]//a')
    );
  }
}
