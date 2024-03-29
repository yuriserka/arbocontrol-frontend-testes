import { SystemPage } from '../page.po';
import { element } from 'protractor';
import { By } from 'selenium-webdriver';
import { selectFrom } from '../../helpers/selectors';
import { By as SeleniumBy } from 'selenium-webdriver';
import { SmartWaiter } from '../../helpers/smart_waiter';

export class SituacoesDeAtividadePage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {};
  }

  /**
   * acessa a página de gerenciamento de situação das atividades
   */
  async get() {
    await this.navbar_.acessarSituacaoAtividade();
  }

  /**
   * clica no checkbox para liberar a edição para a situação passada
   * @param situacao
   */
  async checkLiberadaParaEdicao(situacao: string) {
    await this.selecionarSituacao(situacao);
    await element(
      By.xpath('//mat-checkbox[@formcontrolname="liberadaParaEdicao"]')
    ).click();
    await element(By.xpath('//button[@color="primary"]')).click();
  }

  /**
   * clica no checkbox para exigir justificativa para a situação passada
   * @param situacao
   */
  async checkExigeJustificativa(situacao: string) {
    await this.selecionarSituacao(situacao);
    await element(
      By.xpath('//mat-checkbox[@formcontrolname="exigeJustificativa"]')
    ).click();
    await element(By.xpath('//button[@color="primary"]')).click();
  }

  /**
   * seleciona a situação partindo da lista de situações na página de
   * gerenciamento de situações de atividades
   * @param situacao
   */
  async selecionarSituacao(situacao: string) {
    await element(By.xpath('//mat-paginator//mat-select')).click();
    await selectFrom(By.xpath('//mat-option/span'), '30');
    await SmartWaiter.waitOneSecond();
    await selectFrom(
      By.xpath(
        '//app-area-gestao-tabela//tbody//tr/td[contains(@class, "nome")]/a'
      ),
      situacao
    );
  }
}
