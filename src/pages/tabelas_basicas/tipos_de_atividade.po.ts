import { SystemPage } from '../page.po';
import { element, browser } from 'protractor';
import { By } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../../helpers/selectors';
import { SmartWaiter } from '../../helpers/smart_waiter';
import { baseUrl } from '../../common';
import { By as SeleniumBy } from 'selenium-webdriver';

export class TiposDeAtividadesPage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {};
  }

  /**
   * acessa a página de gerenciamento de tipos de atividades
   */
  async get() {
    await this.navbar_.acessarTiposDeAtividades();
  }

  /**
   * Adiciona um formulario previamente criado às atividades do tipo especificado
   * @param tipo
   * @param nomeFormulario
   * @param principal
   */
  async adicionarFormularioAoTipo(
    tipo: string,
    nomeFormulario: string,
    principal: boolean
  ) {
    await this.selecionarTipo(tipo);
    await this.selecionarAba('Formulários');
    await this.expandirDefinirFormularios();

    const formRow = await getNodeWithText(
      By.xpath('//app-formulario-listagem//tbody//tr'),
      nomeFormulario,
      By.xpath('./td[contains(@class, "titulo")]')
    );

    const btn = formRow.element(
      By.xpath('./td[contains(@class, "cdk-column-acoes")]/button')
    );
    await browser
      .actions()
      .mouseMove(btn.getWebElement())
      .perform();
    await btn.click();
    await this.confirmarAcao();

    if (principal) {
      await getNodeWithText(
        By.xpath('//app-tipo-atividade-formulario-tabela//tbody//tr'),
        nomeFormulario,
        By.xpath('./td[contains(@class, "titulo")]')
      ).then(async el =>
        el
          .element(
            By.xpath(
              './td[contains(@class, "cdk-column-principal")]/mat-slide-toggle'
            )
          )
          .click()
      );
    }
    await this.salvar();
  }

  /**
   * remove o formulario previamente vinculado às atividades do tipo passado
   * @param tipo
   * @param nomeFormulario
   */
  async removerFormularioDoTipo(tipo: string, nomeFormulario: string) {
    await this.selecionarTipo(tipo);
    await this.selecionarAba('Formulários');

    const formRow = await getNodeWithText(
      By.xpath('//app-tipo-atividade-formulario-tabela//tbody//tr'),
      nomeFormulario,
      By.xpath('./td[contains(@class, "titulo")]')
    );

    const btn = formRow.element(
      By.xpath('./td[contains(@class, "cdk-column-acoes")]/button')
    );
    await browser
      .actions()
      .mouseMove(btn.getWebElement())
      .perform();
    await btn.click();

    await this.confirmarAcao();
    await this.salvar();
  }

  /**
   * seleciona o tipo de atividade partindo da pagina de gerenciamento de
   * tipos de atividade
   * @param tipo nome do tipo de atividade
   */
  async selecionarTipo(tipo: string) {
    await selectFrom(
      By.xpath(
        '//app-atividade-listar//tbody//tr/td[contains(@class, "nome")]'
      ),
      tipo
    );
  }

  /**
   * Troca entre as abas
   * @param nome
   */
  private async selecionarAba(nome: string) {
    await selectFrom(
      By.xpath(
        '//div[@cdkmonitorelementfocus]//div[@class="mat-tab-label-content"]'
      ),
      nome
    );
    await SmartWaiter.waitOneSecond();
  }

  /**
   * expande o menu para vincular os formularios
   */
  private async expandirDefinirFormularios() {
    await SmartWaiter.waitVisibility(
      By.xpath('(//mat-expansion-panel-header)[1]')
    );
    await element(By.xpath('(//mat-expansion-panel-header)[1]')).click();
    await SmartWaiter.waitOneSecond();
  }

  /**
   * ao clicar para adicionar o formulario é necessário confirmar a operação
   * de adição
   */
  private async confirmarAcao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }

  /**
   * salva o que foi editado
   */
  private async salvar() {
    // é necessário voltar à aba dos dados básicos para poder salvar
    await this.selecionarAba('Dados Básicos');
    const botaoSalvar = By.xpath('//button[@color="primary"]');
    await SmartWaiter.waitClick(botaoSalvar);
    await element(botaoSalvar).click();
    await SmartWaiter.waitUrlContain(`${baseUrl}/tipos-atividades`);
  }
}
