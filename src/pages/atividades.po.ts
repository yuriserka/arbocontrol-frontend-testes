/**
 * @packageDocumentation
 */

import { By, element, browser } from 'protractor';
import { Page } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../../config';

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

  async cadastroBasico(dadosBasicos: { [campo: string]: string }) {
    await element(this.botoes_.cadastrar).click();
    let campos: CampoDeDado[] = await element
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

    campos = campos.filter(c => {
      const keys = Object.keys(dadosBasicos);
      return (keys.includes(c.cucumberLabel) || keys.includes(c.placeholder));
    }
    );

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      if (campo.role) {
        await this.preencherSelect(campo, dadosBasicos);
      } else {
        campo.tipo === 'input'
          ? await this.preencherInput(campo, dadosBasicos)
          : await this.preencherTextArea(campo, dadosBasicos);
      }
      await browser.sleep(500);
    }

    await this.salvar();
  }

  /**
   *
   * @param campo
   * @param dadosBasicos
   */
  private async preencherInput(
    campo: CampoDeDado,
    dadosBasicos: { [campo: string]: string }
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
  private async preencherSelect(
    campo: CampoDeDado,
    dadosBasicos: { [campo: string]: string }
  ) {
    const path = `//app-atividade-cadastrar-editar//*[@role="${campo.role}"]`;
    await element(By.xpath(path)).click();
    
    let prop = campo.cucumberLabel;
    if (!campo.cucumberLabel) {
      await element(By.xpath(path)).sendKeys(dadosBasicos[campo.placeholder])
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
  private async preencherTextArea(
    campo: CampoDeDado,
    dadosBasicos: { [campo: string]: string }
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
}
