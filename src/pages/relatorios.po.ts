import { By, element, browser } from 'protractor';
import { SystemPage } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../helpers/selectors';
import { Relatorio } from '../models/relatorio';

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
        '//app-formulario-listar//tbody/tr/td[contains(@class, "titulo")]'
      ),
      formulario
    );
    await element(By.xpath('(//button[@color="primary"])[1]')).click();
    for (let i = 0; i < relatorio.campos.length; ++i) {
      const campoRow = await getNodeWithText(
        By.xpath('//app-formulario-seletor-campos//tbody//tr/'),
        relatorio.campos[i],
        By.xpath('./td[contains(@class, "titulo")]')
      );
      await campoRow
        .element('./td[contains(@class, "select")]/mat-checkbox')
        .click();
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
   * seleciona um relatorio partindo da pagina de gerenciamento de relatorios
   * @param titulo
   */
  async selecionarRelatorio(titulo: string) {
    await selectFrom(
      By.xpath(
        '//app-relatorio-tabela//tbody//tr/td[contains(@class, "titulo")]'
      ),
      titulo
    );
  }
}
