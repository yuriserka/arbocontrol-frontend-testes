import { By as SeleniumBy } from 'selenium-webdriver';
import { SystemPage } from './page.po';
import { By, element } from 'protractor';
import { selectFrom } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../common';
import { Territorio } from '../models/territorio';

/**
 * interface que sintetiza informações dos campos que devem ser preenchidos na
 * hora de se fazer o cadastro de um Imóvel
 */
interface CampoDeDado {
  tipo: string;
  role: string;
  placeholder: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de gerenciamento de territórios
 * @category Páginas do sistema
 */
export class TerritoriosPage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {
      filtrar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
  }

  /**
   * acessa a página de gerenciamento dos territórios
   */
  async get() {
    await this.navbar_.acessarTerritorios();
  }

  /**
   * cadastra um imóvel partindo da página de gerenciamento de territórios
   * @param territorio
   */
  async cadastrarTerritorio(territorio: Territorio) {
    await element(this.botoes_.cadastrar).click();
    const campos = await this.getCampos(territorio);

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      if (campo.tipo === 'input') {
        campo.role
          ? await this.preencherSelect(campo, territorio)
          : await this.preencherInput(campo, territorio);
      } else {
        await this.preencherTextArea(campo, territorio);
      }
      await SmartWaiter.waitOneSecond();
    }

    await element(By.xpath('//button[@color="primary"]')).click();
    await SmartWaiter.waitUrl(`${baseUrl}/territorios`);
  }

  /**
   * exclui um territorio a partir da pagina de gerenciamento de territorios
   * @param nome
   */
  async exluirTerritorio(nome: string) {
    await this.selecionarTerritorio(nome);
    await element(By.xpath('//button[@color="warn"]')).click();
    await this.confirmarExclusao();
  }

  /**
   * seleciona um territorio baseado no nome que é mostrado na pagina de
   * gerenciamento de territorios
   * @param nome
   */
  async selecionarTerritorio(nome: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-territorio-listagem//tbody')
    );
    await selectFrom(
      By.xpath(
        '//app-territorio-listagem//tbody//tr/td[contains(@class, "nome")]/span'
      ),
      nome
    );
  }

  /**
   * mapeia quais são as informações que serão necessárias para que todos os
   * campos do registro sejam preenchidos de forma correta e os filtra para
   * serem apenas os quais deverão ser preenchidos
   * @param territorio
   */
  private async getCampos(territorio: Territorio) {
    const campos: CampoDeDado[] = await element
      .all(By.xpath('(//input|//textarea)[@placeholder]'))
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          role: elm?.getAttribute('role'),
          placeholder: elm?.getAttribute('placeholder'),
          cucumberLabel: elm?.getAttribute('placeholder').then((val: string) =>
            val
              .toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/[\(\)]/g, '')
          ),
        };
      });

    return campos
      .filter(c => Object.keys(territorio).includes(c.cucumberLabel))
      .filter(c => territorio[c.cucumberLabel])
      .filter(c => territorio[c.cucumberLabel] !== '');
  }

  /**
   * preenche o nó do tipo \<input\> com o valor apropriado
   * @param campo
   * @param territorio
   */
  private async preencherInput(campo: CampoDeDado, territorio: Territorio) {
    const path = `//${campo.tipo}[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    if (await element(input).isEnabled()) {
      await element(input).sendKeys(territorio[campo.cucumberLabel]);
    }
  }

  /**
   * preenche nós que precisam que algum item seja selecionado (role=option)
   * com o valor apropriado
   * @param campo
   * @param territorio
   */
  private async preencherSelect(campo: CampoDeDado, territorio: Territorio) {
    await this.preencherInput(campo, territorio);
    await selectFrom(
      By.xpath(`//*[@role="option"]//span//span`),
      territorio[campo.cucumberLabel]
    );
  }

  /**
   * preenche o nó do tipo \<textarea\> com o valor apropriado
   * @param campo
   * @param territorio
   */
  private async preencherTextArea(campo: CampoDeDado, territorio: Territorio) {
    const path = `//${campo.tipo}[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    await element(input).click();
    await element(input).sendKeys(territorio[campo.cucumberLabel]);
  }

  /*
   * função auxiliar para a confirmação de exclusão do territorio
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }
}
