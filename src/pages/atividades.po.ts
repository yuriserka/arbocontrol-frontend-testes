import { By, element, browser } from 'protractor';
import { SystemPage } from './page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../helpers/selectors';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../../config';
import { Atividade, DadosBasicos } from '../models/atividade';

/**
 * interface que sintetiza informações dos campos que devem ser preenchidos na
 * hora de se fazer o cadastro de uma Atividade
 */
interface CampoDeDado {
  tipo: string;
  role: string;
  formcontrolname: string;
  cucumberLabel: string;
  placeholder: string;
}

/**
 * Abstração da página de gerenciamento de atividades
 * @category Páginas do sistema
 */
export class AtividadesPage extends SystemPage {
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
    await element(this.botoes_.cadastrar).click();
    await this.cadastroBasico(atividade.dadosBasicos);
    await this.salvar();
    await browser.sleep(1000);
    await this.atribuirDemandas(atividade);
    await this.atribuirImoveis(atividade);
    await this.atribuirEquipes(atividade);
    await this.salvar();
  }

  /**
   * exclui uma atividade partindo da pagina de gerenciamento de atividades
   * @param titulo
   */
  async excluirAtividade(titulo: string) {
    await this.selecionarAtividade(titulo);
    await element(By.xpath('//button[@color="warn"]')).click();
    await this.confirmarExclusao();
  }

  /**
   * seleciona uma atividade da lista de atividades na pagina de gerenciamento de atividades
   * @param titulo
   */
  async selecionarAtividade(titulo: string) {
    await selectFrom(
      By.xpath(
        '//app-atividade-tabela//tbody//tr//td[contains(@class, "titulo")]'
      ),
      titulo
    );
  }

  /**
   * atualiza os dados básicos de uma atividade previamente cadastrada
   * @param atividade
   */
  async atribuirDadosBasicos(atividade: Atividade) {
    await this.selecionarAba('Dados Básicos');
    await this.cadastroBasico(atividade.dadosBasicos);
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
      const demandaRow = await getNodeWithText(
        By.xpath('//app-demanda-listagem//tbody//tr'),
        numDemanda,
        By.xpath(
          './/td[contains(@class, "cdk-column-id")]//span[@class="span-link"]'
        )
      );

      await demandaRow
        .element(By.xpath('.//td[contains(@class, "acoes")]//button'))
        .click();
      await this.confirmarAcao();
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
      await this.confirmarAcao();
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
      await this.confirmarAcao();
    }
  }

  /**
   * faz um cadastro simples de uma atividade, ou seja, sem nenhum tipo de
   * atribuição a ela
   * @param dados
   */
  private async cadastroBasico(dados: DadosBasicos) {
    const campos = await this.getCamposDadosBasicos(dados);
    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      if (campo.role) {
        await this.preencherSelectDadosBasicos(campo, dados);
      } else {
        campo.tipo === 'input'
          ? await this.preencherInputDadosBasicos(campo, dados)
          : await this.preencherTextAreaDadosBasicos(campo, dados);
      }
      await browser.sleep(500);
    }
  }

  /**
   * mapeia quais são as informações que serão necessárias para que todos os
   * campos do registro sejam preenchidos de forma correta e os filtra para
   * serem apenas os quais deverão ser preenchidos
   * @param atividade
   */
  private async getCamposDadosBasicos(dados: DadosBasicos) {
    const campos: CampoDeDado[] = await element
      .all(
        By.xpath(
          '//app-atividade-cadastrar-editar//*[@formcontrolname or contains(@role, "box")]'
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
      const keys = Object.keys(dados);
      return keys.includes(c.cucumberLabel) || keys.includes(c.placeholder);
    });
  }

  /**
   * preenche o nó do tipo \<input\> com o valor apropriado
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
   * preenche nós que precisam que algum item seja selecionado
   * (role=[combobox | listbox]) com o valor apropriado
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
   * preenche o nó do tipo \<textarea\> com o valor apropriado
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
    // é necessário voltar à aba dos dados básicos para poder salvar
    await this.selecionarAba('Dados Básicos');
    await browser.sleep(1000);
    const botaoSalvar = By.xpath('//button[@color="primary"]');
    await SmartWaiter.waitClick(botaoSalvar);
    await element(botaoSalvar).click();
    await SmartWaiter.waitUrlContain(`${baseUrl}/atividades`);
  }

  /**
   * expande o menu de vinculação para demandas, imóveis e equipe
   */
  private async expandirHeaderVinculo() {
    await SmartWaiter.waitVisibility(
      By.xpath('(//mat-expansion-panel-header)[1]')
    );
    await browser.sleep(1000);
    await element(By.xpath('(//mat-expansion-panel-header)[1]')).click();
  }

  /**
   * ao clicar para adicionar tanto para equipes, imoveis e demandas é necessário
   * confirmar a operação de adição à atividade
   */
  private async confirmarAcao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    const botaoConfirmacao = By.xpath('(//mat-dialog-actions//button)[1]');
    await SmartWaiter.waitVisibility(botaoConfirmacao);
    await SmartWaiter.waitClick(botaoConfirmacao);
    await element(botaoConfirmacao).click();
    await browser.sleep(1000);
  }

  /**
   * Troca entre as abas da página de cadastro
   * @param nome
   */
  private async selecionarAba(nome: string) {
    return selectFrom(
      By.xpath(
        '//div[@cdkmonitorelementfocus]//div[@class="mat-tab-label-content"]'
      ),
      nome
    );
  }

  /*
   * função auxiliar para a confirmação de exclusão da atividade
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    const botaoConfirmacao = By.xpath('(//mat-dialog-actions//button)[1]');
    await SmartWaiter.waitVisibility(botaoConfirmacao);
    await SmartWaiter.waitClick(botaoConfirmacao);
    await element(botaoConfirmacao).click();
    await browser.sleep(1000);
  }
}
