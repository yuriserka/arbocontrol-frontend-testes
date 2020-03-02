/**
 * @packageDocumentation
 */

import { By, element, browser } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../../config';
import { Atividade, DadosBasicos } from '../models/atividade';
import { CssEditor } from '../helpers/css_editor';

interface CampoDeDado {
  tipo: string;
  role: string;
  formcontrolname: string;
  cucumberLabel: string;
  placeholder: string;
}

/**
 * Abstração da página de gerenciamento de equipes
 * @category Páginas do sistema
 */
export class AtividadesPage extends Page {
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
      pesquisar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
  }

  /**
   * Acessa a página relativa ao gerenciamento de equipes
   */
  async get() {
    await this.navbar_.acessarAtividades();
  }

  /**
   * cadastra uma atividade partindo da página de gerenciamento de atividades
   * @param atividade
   */
  async cadastrarAtividade(atividade: Atividade) {
    await this.cadastroBasico(atividade);
    await this.atribuirDemandas(atividade);
    await this.atribuirImoveis(atividade);
    await this.atribuirEquipes(atividade);
    await this.salvar();
  }

  async cadastroBasico(atividade: Atividade) {
    await element(this.botoes_.cadastrar).click();

    const campos = await this.getCamposDadosBasicos(atividade);

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      if (campo.role) {
        await this.preencherSelectDadosBasicos(campo, atividade.dadosBasicos);
      } else {
        campo.tipo === 'input'
          ? await this.preencherInputDadosBasicos(campo, atividade.dadosBasicos)
          : await this.preencherTextAreaDadosBasicos(
            campo,
            atividade.dadosBasicos
          );
      }
      await browser.sleep(500);
    }

    await this.salvar();
  }

  /**
   * a partir da página de edição de uma atividade atribui as demandas
   * @param atividade
   */
  async atribuirDemandas(atividade: Atividade) {
    await this.selecionarAba('Demandas');
    await this.expandirHeaderVinculo();

    for (let i = 0; i < atividade.demandas.length; ++i) {
      const numDemanda = atividade.demandas[i];
      await SmartWaiter.waitVisibility(
        By.xpath(`(//app-demanda-listagem//tbody//tr)[${i + 1}]`)
      );
      const imovelRow = await getNodeWithText(
        By.xpath('//app-demanda-listagem//tbody//tr'),
        numDemanda,
        By.xpath('.//td[contains(@class, "cdk-column-id")]//span[@class="span-link"]')
      );

      await imovelRow
        .element(By.xpath('.//td[contains(@class, "acoes")]//button'))
        .click();
      await this.confirmar();
    }
  }

  /**
   * a partir da página de edição de uma atividade atribui os imoveis
   * @param atividade
   */
  async atribuirImoveis(atividade: Atividade) {
    await this.selecionarAba('Imóveis');
    await this.expandirHeaderVinculo();

    for (let i = 0; i < atividade.imoveis.length; ++i) {
      const logradouroImovel = atividade.imoveis[i];
      await SmartWaiter.waitVisibility(
        By.xpath(`(//app-imovel-listagem//tbody//tr)[${i + 1}]`)
      );
      const imovelRow = await getNodeWithText(
        By.xpath('//app-imovel-listagem//tbody//tr'),
        logradouroImovel,
        By.xpath(
          './/td[contains(@class, "logradouro")]//span[@class="span-link"]'
        )
      );

      await imovelRow
        .element(By.xpath('.//td[contains(@class, "acoes")]//button'))
        .click();
      await this.confirmar();
    }
  }

  /**
   * a partir da página de edição de uma atividade atribui as equipes
   * @param atividade
   */
  async atribuirEquipes(atividade: Atividade) {
    await this.selecionarAba('Equipe');
    await this.expandirHeaderVinculo();

    for (let i = 0; i < atividade.equipes.length; ++i) {
      const nomeEquipe = atividade.equipes[i];
      await SmartWaiter.waitVisibility(
        By.xpath(`(//app-equipe-tabela//tbody//tr)[${i + 1}]`)
      );
      const equipeRow = await getNodeWithText(
        By.xpath('//app-equipe-tabela//tbody//tr'),
        nomeEquipe,
        By.xpath('.//td[contains(@class, "nome")]//span[@class="span-link"]')
      );

      await equipeRow
        .element(By.xpath('.//td[contains(@class, "acoes")]//button'))
        .click();
      await this.confirmar();
    }
  }

  private async getCamposDadosBasicos(atividade: Atividade) {
    const campos: CampoDeDado[] = await element
      .all(
        By.xpath(
          '//app-atividade-cadastrar-editar//*[@formcontrolname] | //app-atividade-cadastrar-editar//*[contains(@role, "box")]'
        )
      )
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          role: elm?.getAttribute('role'),
          formcontrolname: elm?.getAttribute('formcontrolname'),
          cucumberLabel: elm?.getAttribute('formcontrolname'),
          placeholder: elm
            ?.getAttribute('placeholder')
            .then((val: string) =>
              val ? val.toLowerCase().replace(/\s+/g, '_') : null
            ),
        };
      });

    return campos.filter(c => {
      const keys = Object.keys(atividade.dadosBasicos);
      return keys.includes(c.cucumberLabel) || keys.includes(c.placeholder);
    });
  }

  /**
   *
   * @param campo
   * @param dadosBasicos
   */
  private async preencherInputDadosBasicos(
    campo: CampoDeDado,
    dadosBasicos: DadosBasicos
  ) {
    const path = `//${campo.tipo}[@formcontrolname="${campo.formcontrolname}"]`;
    const input = By.xpath(path);
    if (await element(input).isEnabled()) {
      await element(input).sendKeys(dadosBasicos[campo.cucumberLabel]);
    }
  }

  /**
   *
   * @param campo
   * @param dadosBasicos
   */
  private async preencherSelectDadosBasicos(
    campo: CampoDeDado,
    dadosBasicos: DadosBasicos
  ) {
    const path = `//app-atividade-cadastrar-editar//*[@role="${campo.role}"]`;
    await element(By.xpath(path)).click();

    let prop = campo.cucumberLabel;
    if (!campo.cucumberLabel) {
      await element(By.xpath(path)).sendKeys(dadosBasicos[campo.placeholder]);
      prop = campo.placeholder;
    }

    await selectFrom(
      By.xpath('//span[@class="mat-option-text"]'),
      dadosBasicos[prop]
    );
  }

  /**
   *
   * @param campo
   * @param dadosBasicos
   */
  private async preencherTextAreaDadosBasicos(
    campo: CampoDeDado,
    dadosBasicos: DadosBasicos
  ) {
    const path = `//${campo.tipo}[@formcontrolname="${campo.formcontrolname}"]`;
    const input = By.xpath(path);
    await element(input).click();
    await element(input).sendKeys(dadosBasicos[campo.cucumberLabel]);
  }

  /**
   * salva o registro que está sendo criado
   */
  private async salvar() {
    await element(By.xpath('//button[@color="primary"]')).click();
    await browser.sleep(1000);
    const url = `${baseUrl}/atividades`;
    await SmartWaiter.waitUrlContain(url);
  }

  private async expandirHeaderVinculo() {
    await SmartWaiter.waitVisibility(
      By.xpath('(//mat-expansion-panel-header)[1]')
    );
    await browser.sleep(1000);
    await element(By.xpath('(//mat-expansion-panel-header)[1]')).click();
  }

  private async confirmar() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    const botaoConfirmacao = By.xpath('(//mat-dialog-actions//button)[1]');
    await SmartWaiter.waitVisibility(botaoConfirmacao);
    await SmartWaiter.waitClick(botaoConfirmacao);
    await element(botaoConfirmacao).click();
    await browser.sleep(1000);
  }

  private async selecionarAba(nome: string) {
    return selectFrom(
      By.xpath(
        '//div[@cdkmonitorelementfocus]//div[@class="mat-tab-label-content"]'
      ),
      nome
    );
  }
}
