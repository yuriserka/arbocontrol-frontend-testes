import { By as SeleniumBy } from 'selenium-webdriver';
import { SystemPage } from './page.po';
import { By, element } from 'protractor';
import { selectFrom } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../common';
import { Imovel } from '../models/imovel';

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
 * Abstração da página de gerenciamento de imóveis
 * @category Páginas do sistema
 */
export class ImoveisPage extends SystemPage {
  private botoes_: { [key: string]: SeleniumBy };

  constructor() {
    super();
    this.botoes_ = {
      filtrar: By.xpath('(//button[@color="primary"])[1]'),
      cadastrar: By.xpath('(//button[@color="primary"])[2]'),
    };
  }

  /**
   * acessa a página de gerenciamento dos imóveis
   */
  async get() {
    await this.navbar_.acessarImoveis();
  }

  /**
   * cadastra um imóvel partindo da página de gerenciamento de imóveis
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
      await SmartWaiter.waitOneSecond();
    }

    await SmartWaiter.safeClick(By.xpath('//button[@color="primary"]'));
    await SmartWaiter.waitUrl(`${baseUrl}/imoveis`);
  }

  /**
   * exclui um imovel a partir da pagina de gerenciamento de imoveis
   * @param logradouro
   */
  async excluirImovel(logradouro: string) {
    await this.selecionarImovel(logradouro);
    await element(By.xpath('//button[@color="warn"]')).click();
    await this.confirmarExclusao();
  }

  /**
   * seleciona um imovel baseado no logradouro que é mostrado na pagina de
   * gerenciamento de imoveis
   * @param logradouro
   */
  async selecionarImovel(logradouro: string) {
    await SmartWaiter.waitVisibility(By.xpath('//app-imovel-tabela-component//tbody'));
    await selectFrom(
      By.xpath(
        '//app-imovel-tabela-component//tbody//tr/td[contains(@class, "logradouro")]'
      ),
      logradouro
    );
  }

  /**
   * mapeia quais são as informações que serão necessárias para que todos os
   * campos do registro sejam preenchidos de forma correta e os filtra para
   * serem apenas os quais deverão ser preenchidos
   * @param imovel
   */
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

    return campos
      .filter(c => Object.keys(imovel).includes(c.cucumberLabel))
      .filter(c => imovel[c.cucumberLabel])
      .filter(c => imovel[c.cucumberLabel] !== '');
  }

  /**
   * preenche o nó do tipo \<input\> com o valor apropriado
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
   * preenche nós que precisam que algum item seja selecionado (role=option)
   * com o valor apropriado
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
   * preenche o nó do tipo \<textarea\> com o valor apropriado
   * @param campo
   * @param imovel
   */
  private async preencherTextArea(campo: CampoDeDado, imovel: Imovel) {
    const path = `//${campo.tipo}[@placeholder="${campo.placeholder}"]`;
    const input = By.xpath(path);
    await element(input).click();
    await element(input).sendKeys(imovel[campo.cucumberLabel]);
  }

  /*
   * função auxiliar para a confirmação de exclusão do imovel
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }
}
