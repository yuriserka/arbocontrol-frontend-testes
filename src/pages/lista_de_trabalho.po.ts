/**
 * @fileoverview
 */

import { By as SeleniumBy } from 'selenium-webdriver';
import { Page } from './page.po';
import { DataTable } from '../helpers/data_table';
import { element, By, browser } from 'protractor';
import { Selector } from '../helpers/selector';

let contadorQtdeTratados = 1;

interface CampoDeDado {
  tipo: string;
  ariaLabel: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de login
 * @category Páginas do sistema
 */
export class ListaDeTrabalhoPage extends Page {
  /**
   * botões que necessitam de ser clicados
   * @private
   * @constant
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   * @private
   * @constant
   */
  private campos_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {};
    this.campos_ = {};
  }

  /**
   *
   */
  async get() {
    await this.navbar_.acessarListasDeTrabalho();
  }

  /**
   *
   * @param numeroAtividade
   * @param codigoImovel
   * @param registro
   */
  async inserirRegistro(
    numeroAtividade: string,
    codigoImovel: string,
    registro: { [campo: string]: string }
  ) {
    await this.selecionarAtividade(numeroAtividade);
    await browser.sleep(1000);
    await this.selecionarImovel(codigoImovel);
    await this.preencherCampoDeDados(registro);
  }

  /**
   *
   * @param numero
   */
  private async selecionarAtividade(numero: string) {
    const linkAtividade = await DataTable.findTextIn(
      By.xpath(
        '//app-atividade-tabela-simples//tbody//tr//td[contains(@class, "cdk-column-numero")]//span[@class="span-link"]'
      ),
      numero
    );
    await linkAtividade.click();
  }

  /**
   *
   * @param codigo
   */
  private async selecionarImovel(codigo: string) {
    const linkImovel = await DataTable.findTextIn(
      By.xpath(
        '//app-imovel-tabela-simples//tbody//tr//td[contains(@class, "cdk-column-id")]//span[@class="span-link"]'
      ),
      codigo
    );
    await linkImovel.click();
  }

  /**
   *
   * @param registro
   */
  private async preencherCampoDeDados(registro: { [campo: string]: string }) {
    await element(By.xpath('//button[@color="primary"]')).click();
    let campos: CampoDeDado[] = await element
      .all(By.xpath('//*[@aria-label]'))
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          ariaLabel: elm?.getAttribute('aria-label'),
          cucumberLabel: elm
            ?.getAttribute('aria-label')
            .then((val: string) => val.toLowerCase().replace(/\s+/g, '_')),
        };
      });

    campos = campos.filter(c =>
      Object.keys(registro).includes(c.cucumberLabel)
    );

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      campo.tipo === 'input'
        ? await this.preencherInput(campo, registro)
        : await this.preencherSelect(campo, registro);
    }

    await element(By.xpath('//button[@color="primary"]')).click();
  }

  /**
   *
   * @param campo
   * @param registro
   */
  private async preencherInput(
    campo: CampoDeDado,
    registro: { [campo: string]: string }
  ) {
    let path = `//input[@aria-label="${campo.ariaLabel}"]`;
    if ((await element.all(By.xpath(path))).length > 1) {
      path = `(${path})[${contadorQtdeTratados++}]`
    }
    const input = By.xpath(path);
    if (await element(input).isEnabled()) {
      await element(input).sendKeys(registro[campo.cucumberLabel]);
    }
  }

  /**
   *
   * @param campo
   * @param registro
   */
  private async preencherSelect(
    campo: CampoDeDado,
    registro: { [campo: string]: string }
  ) {
    await Selector.selectFrom(
      By.xpath(`//select[@aria-label="${campo.ariaLabel}"]`),
      registro[campo.cucumberLabel]
    );
  }
}
