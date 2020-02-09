/**
 * @fileoverview
 */

import { By as SeleniumBy } from 'selenium-webdriver';
import { Page } from './page.po';
import { By, element } from 'protractor';
import { Selector } from '../helpers/selector';

interface CampoDeDado {
  tipo: string;
  role: string;
  placeholder: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de gerenciamento de imóveis
 * @category Páginas do sistema
 */
export class ImovelPage extends Page {
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
    this.botoes_ = {
      filtrar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
    this.campos_ = {};
  }

  /**
   *
   */
  async get() {
    await this.navbar_.acessarImoveis();
  }

  /**
   *
   * @param imovel
   */
  async cadastrarImovel(imovel: { [campo: string]: string }) {
    await element(this.botoes_.cadastrar).click();
    let campos: CampoDeDado[] = await element
      .all(By.xpath('//input[@placeholder]'))
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          role: elm?.getAttribute('role'),
          placeholder: elm?.getAttribute('placeholder'),
          cucumberLabel: elm
            ?.getAttribute('placeholder')
            .then((val: string) => val.toLowerCase().replace(/\s+/g, '_')),
        };
      });

    campos = campos.filter(c => Object.keys(imovel).includes(c.cucumberLabel));

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i];
      if (campo.tipo === 'input') {
        campo.role
          ? await this.preencherSelect(campo, imovel)
          : await this.preencherInput(campo, imovel);
      } else {
        this.preencherTextArea(campo, imovel);
      }
    }

    await element(By.xpath('//button[@color="primary"]')).click();
  }

  /**
   *
   * @param campo
   * @param imovel
   */
  private async preencherInput(
    campo: CampoDeDado,
    imovel: { [campo: string]: string }
  ) {
    const path = `//input[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    if (await element(input).isEnabled()) {
      await element(input).sendKeys(imovel[campo.cucumberLabel]);
    }
  }

  /**
   *
   * @param campo
   * @param imovel
   */
  private async preencherSelect(
    campo: CampoDeDado,
    imovel: { [campo: string]: string }
  ) {
    this.preencherInput(campo, imovel);
    Selector.selectFrom(
      By.xpath(`//input[@placeholder="${campo.placeholder}"]`),
      imovel[campo.cucumberLabel],
      By.xpath('//span//span'),
      'mat-option'
    );
  }

  /**
   *
   * @param campo
   * @param imovel
   */
  private async preencherTextArea(
    campo: CampoDeDado,
    imovel: { [campo: string]: string }
  ) {
    const path = `//textarea[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    await element(input).sendKeys(imovel[campo.cucumberLabel]);
  }
}
