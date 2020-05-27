import { By, element, browser } from 'protractor';
import { SystemPage } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../helpers/selectors';
import { Relatorio } from '../models/relatorio';
import { SmartWaiter } from '../helpers/smart_waiter';

/**
 * Abstração da página de gerenciamento de relatórios
 * @category Páginas do sistema
 */
export class RelatoriosPage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {
      pesquisar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
  }

  /**
   * acessa a página de gerenciamento dos relatorios
   */
  async get() {
    await this.navbar_.acessarRelatorios();
  }

  /**
   * cadastra um relatorio dado que existem dados para tal
   * @param relatorio
   * @param formulario
   */
  async cadastrarRelatorio(relatorio: Relatorio, formulario: string) {
    await element(this.botoes_.cadastrar).click();
    await selectFrom(
      By.xpath(
        '//app-formulario-listar//tbody/tr/td[contains(@class, "titulo")]/a'
      ),
      formulario
    );
    await element(By.xpath('(//button[@color="primary"])[1]')).click();
    await SmartWaiter.waitOneSecond();
    await SmartWaiter.waitTableRows(
      By.xpath('//app-formulario-seletor-campos//tbody//tr'),
      10000
    );
    for (let i = 0; i < relatorio.campos.length; ++i) {
      const campoRow = await getNodeWithText(
        By.xpath('//app-formulario-seletor-campos//tbody//tr'),
        relatorio.campos[i],
        By.xpath('./td[contains(@class, "titulo")]')
      );
      const btn = campoRow.element(
        By.xpath('./td[contains(@class, "select")]/mat-checkbox')
      );
      await browser
        .actions()
        .mouseMove(btn.getWebElement())
        .perform();
      await btn.click();
    }
    await element(By.xpath('(//button[@color="primary"])[1]')).click();
    await element(By.xpath('(//button[@color="primary"])[2]')).click();
    await element(By.xpath('//*[@formcontrolname="titulo"]')).sendKeys(
      relatorio.titulo
    );
    await element(By.xpath('//mat-select')).click();
    await selectFrom(By.xpath('//mat-option/span'), relatorio.tipo);
    await element(By.xpath('(//button[@color="primary"])[3]')).click();
  }

  /**
   * pesquisa o relatorio para o intervalo de data passado
   * @param dataInicio
   * @param dataFim
   */
  async pesquisar(dataInicio: string, dataFim: string) {
    await element(By.xpath('//input[@formcontrolname="dataInicio"]')).sendKeys(
      dataInicio
    );
    const dataFimInput = By.xpath('//input[@formcontrolname="dataFim"]');
    await element(dataFimInput).click();
    await element(dataFimInput).sendKeys(dataFim);
    await element(By.xpath('(//button[@color="primary"])[1]')).click();
  }

  async excluirRelatorio(titulo: string, formulario: string) {
    await element(this.botoes_.cadastrar).click();
    await selectFrom(
      By.xpath(
        '//app-formulario-listar//tbody/tr/td[contains(@class, "titulo")]/a'
      ),
      formulario
    );
    const relatorioRow = await getNodeWithText(
      By.xpath('//app-relatorio-listar//tbody//tr'),
      titulo,
      By.xpath('./td[contains(@class, "titulo")]/a')
    );
    const btn = relatorioRow.element(
      By.xpath('./td[contains(@class, "cdk-column-acoes")]/button')
    );

    await browser
      .actions()
      .mouseMove(btn.getWebElement())
      .perform();
    await btn.click();

    await element(By.xpath('(//*[@role="menuitem"])[2]')).click();
    await this.confirmarExclusao();
  }

  /**
   * seleciona um relatorio partindo da pagina de gerenciamento de relatorios
   * @param titulo
   */
  async selecionarRelatorio(titulo: string) {
    await selectFrom(
      By.xpath(
        '//app-relatorio-tabela//tbody//tr/td[contains(@class, "titulo")]/a'
      ),
      titulo
    );
  }

  /**
   * função auxiliar para a confirmação de exclusão da atividade
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }
}
