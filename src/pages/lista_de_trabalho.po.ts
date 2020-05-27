import { SystemPage } from './page.po';
import { element, By, browser } from 'protractor';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../common';
import { selectFrom } from '../helpers/selectors';
import { Registro } from '../models/registro';

let contadorQtdeTratados = 0;

/**
 * interface que sintetiza informações dos campos que devem ser preenchidos na
 * hora de se fazer o cadastro de uma Atividade
 */
interface CampoDeDado {
  tipo: string;
  ariaLabel: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de gerenciamento de listas de trabalho
 * @category Páginas do sistema
 */
export class ListaDeTrabalhoPage extends SystemPage {
  private numAtividade: string;

  constructor() {
    super();
    this.numAtividade = '0';
  }

  /**
   * acessa a página de gerenciamento de listas de trabalho
   */
  async get() {
    await this.navbar_.acessarListasDeTrabalho();
  }

  /**
   * insere um registro na lista de trabalho da atividade no imovel
   * @param numeroAtividade
   * @param logradouroDoImovel
   * @param formulario
   * @param registro
   * @param amostras
   */
  async inserirRegistro(
    numeroAtividade: string,
    logradouroDoImovel: string,
    formulario: string,
    registro: Registro,
    amostras?: Registro[]
  ) {
    await this.selecionarAtividade(numeroAtividade);
    await SmartWaiter.waitOneSecond();
    await this.selecionarImovel(logradouroDoImovel);
    await this.selecionarFormulario(formulario);
    await element(By.xpath('//button[@color="primary"]')).click();
    await this.preencherCamposDeDados(registro);
    if (amostras) {
      await this.preencherAmostras(amostras);
    }
    await this.salvar();
  }

  /**
   * Exclui os registros partindo da página de gerenciamento da lista de trabalho
   * @param numeroAtividade
   * @param formulario
   * @param idRegistros se não for especificado todos os registros da atividade no dado formulário serão excluidos
   */
  async excluirRegistros(
    numeroAtividade: string,
    formulario: string,
    idRegistros?: string[]
  ) {
    if (!(await browser.getCurrentUrl()).includes(numeroAtividade)) {
      await this.selecionarAtividade(numeroAtividade);
    }

    await this.selecionarFormulario(formulario);
    await SmartWaiter.waitVisibility(
      By.xpath('//app-registro-atividade-tabela//tbody')
    );

    const regRowsXPath = By.xpath(
      '//app-registro-atividade-tabela//tbody//tr/td[contains(@class, "column-id")]/span'
    );
    await SmartWaiter.waitTableRows(regRowsXPath);

    const regs: string[] = idRegistros
      ? idRegistros
      : await element.all(regRowsXPath).map(r => {
          return r?.getText();
        });

    for (let i = 0; i < regs.length; ++i) {
      await this.selecionarRegistro(regs[i]);
      await element(By.xpath('//button[@color="warn"]')).click();
      await this.confirmarExclusao();
    }
  }

  /**
   * preenche de forma genérica os campos tanto para registros de campo e
   * laboratorio como para amostras
   * @param registro
   */
  private async preencherCamposDeDados(
    registro: Registro,
    amostraIndex?: number
  ) {
    let campos = await this.getCampos(registro);

    // força a ter o tamanho de apenas uma amostra, ou seja, só
    // precisa preencher uma vez os campos
    if (amostraIndex) {
      campos = campos.slice(0, Object.keys(registro).length);
    }

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      campo.tipo === 'input'
        ? await this.preencherInput(campo, registro, amostraIndex)
        : await this.preencherSelect(campo, registro, amostraIndex);
    }
  }

  /**
   * mapeia quais são as informações que serão necessárias para que todos
   * os campos do registro sejam preenchidos de forma correta e os filtra
   * para serem apenas os quais deverão ser preenchidos
   * @param registro
   */
  private async getCampos(registro: Registro) {
    const campos: CampoDeDado[] = await element
      .all(By.xpath('//*[@aria-label]'))
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          ariaLabel: elm?.getAttribute('aria-label'),
          cucumberLabel: elm?.getAttribute('aria-label').then((val: string) => {
            if (val === 'Qtde Tratados') {
              val = `${val} ${(contadorQtdeTratados++ % 2) + 1}`;
            }
            return val
              .toLowerCase()
              .replace(/\s+/g, '_')
              .replace(/[\(\)]/g, '');
          }),
        };
      });

    return campos
      .filter(c => Object.keys(registro).includes(c.cucumberLabel))
      .filter(c => registro[c.cucumberLabel])
      .filter(c => registro[c.cucumberLabel] !== '');
  }

  /**
   * seleciona a atividade para qual as listas de trabalhos serão direcionados
   * @param numero
   */
  private async selecionarAtividade(numero: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-atividade-tabela-simples//tbody')
    );
    await selectFrom(
      By.xpath(
        '//app-atividade-tabela-simples//tbody//tr/td[contains(@class, "cdk-column-numero")]/span[@class="span-link"]'
      ),
      numero
    );
    this.numAtividade = numero;
  }

  /**
   * seleciona o imovel para qual as listas de trabalhos serão direcionados
   * @param codigo
   */
  private async selecionarImovel(logradouro: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-imovel-tabela-simples//tbody')
    );
    await selectFrom(
      By.xpath(
        '//app-imovel-tabela-simples//tbody//tr//td[contains(@class, "cdk-column-logradouro")]//span'
      ),
      logradouro
    );
  }

  /**
   * preenche N amostras, amostras estão localizadas no registro de laboratorio
   * @param amostras
   */
  private async preencherAmostras(amostras: Array<{ [key: string]: string }>) {
    for (let i = 0; i < amostras.length; ++i) {
      await element(By.xpath('//input[@value="( + ) Adicionar"]')).click();
      const amostra = amostras[i];
      await this.preencherCamposDeDados(amostra, i + 1);
    }
  }

  /**
   * preenche o nó do tipo \<input\> com o valor apropriado
   * @param campo
   * @param registro
   */
  private async preencherInput(
    campo: CampoDeDado,
    registro: Registro,
    amostraIndex?: number
  ) {
    let path = `(//input[@aria-label="${campo.ariaLabel}"])${
      amostraIndex ? `[${amostraIndex}]` : ''
    }`;
    if ((await element.all(By.xpath(path))).length > 1) {
      path = `(${path})[${(contadorQtdeTratados++ % 2) + 1}]`;
    }
    const input = By.xpath(path);
    if (await element(input).isEnabled()) {
      await element(input).clear();
      await element(input).sendKeys(registro[campo.cucumberLabel]);
    }
  }

  /**
   * preenche nós que precisam que algum item seja selecionado com o valor
   * apropriado
   * @param campo
   * @param registro
   */
  private async preencherSelect(
    campo: CampoDeDado,
    registro: Registro,
    amostraIndex?: number
  ) {
    const path = `(//select[@aria-label="${campo.ariaLabel}"])${
      amostraIndex ? `[${amostraIndex}]` : ''
    }`;
    await element(By.xpath(path)).click();
    await selectFrom(
      By.xpath(`${path}//option`),
      registro[campo.cucumberLabel]
    );
  }

  /**
   * seleciona o fórmulario que tenha o nome passado
   * @param nome
   */
  private async selecionarFormulario(nome: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-formulario-tabela-simples//tbody')
    );
    await selectFrom(
      By.xpath('//app-formulario-tabela-simples//tbody/tr/td/span'),
      nome
    );
    await SmartWaiter.waitOneSecond();
  }

  /**
   * seleciona um registro dado que uma atividade e um formulario já foram selecionados
   * @param id
   */
  private async selecionarRegistro(id: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-registro-atividade-tabela//tbody')
    );
    await selectFrom(
      By.xpath(
        '//app-registro-atividade-tabela//tbody//tr//td[contains(@class, "id")]//span'
      ),
      id
    );
  }

  /**
   * salva o registro que está sendo criado
   */
  private async salvar() {
    const btn = By.xpath('//button//span[text()=" Salvar "]');
    await browser
      .actions()
      .mouseMove(await element(btn).getWebElement())
      .perform();
    await element(btn).click();
    const url = `${baseUrl}/registros/${this.numAtividade}`;
    await SmartWaiter.waitUrl(url);
  }

  /*
   * função auxiliar para a confirmação de exclusão da atividade
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }
}
