/**
 * @packageDocumentation
 */

import { By as SeleniumBy } from 'selenium-webdriver';
import { Page } from './page.po';
import { By, element, browser } from 'protractor';
import { selectFrom } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../../config';
import { Imovel } from '../models/imovel';

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
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
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
   * acessa a página de gerenciamento dos imóveis
   */
  async get() {
    await this.navbar_.acessarImoveis();
  }

  /**
   * cadastra um imóvel
   * @param imovel
   */
  async cadastrarImovel(imovel: Imovel) {
    await element(this.botoes_.cadastrar).click();
    const campos = await this.getCampos(imovel);

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      if (campo.tipo === 'input') {
        campo.role
          ? await this.preencherSelect(campo, imovel)
          : await this.preencherInput(campo, imovel);
      } else {
        await this.preencherTextArea(campo, imovel);
      }
      await browser.sleep(500);
    }

    await element(By.xpath('//button[@color="primary"]')).click();
    await SmartWaiter.waitUrl(`${baseUrl}/imoveis`);
  }

  private async getCampos(imovel: Imovel) {
    const campos: CampoDeDado[] = await element
      .all(By.xpath('(//input|//textarea)[@placeholder]'))
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

    return campos.filter(c => Object.keys(imovel).includes(c.cucumberLabel));
  }

  /**
   *
   * @param campo
   * @param imovel
   */
  private async preencherInput(campo: CampoDeDado, imovel: Imovel) {
    const path = `//${campo.tipo}[@placeholder="${campo.placeholder}"]`;
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
  private async preencherSelect(campo: CampoDeDado, imovel: Imovel) {
    await this.preencherInput(campo, imovel);
    await selectFrom(
      By.xpath(`//*[@role="option"]//span//span`),
      imovel[campo.cucumberLabel]
    );
  }

  /**
   *
   * @param campo
   * @param imovel
   */
  private async preencherTextArea(campo: CampoDeDado, imovel: Imovel) {
    const path = `//${campo.tipo}[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    await element(input).click();
    await element(input).sendKeys(imovel[campo.cucumberLabel]);
  }
}
