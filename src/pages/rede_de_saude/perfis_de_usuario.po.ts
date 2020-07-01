import { By, element, browser } from 'protractor';
import { SystemPage } from '../page.po';
import { By as SeleniumBy } from 'selenium-webdriver';
import { selectFrom, getNodeWithText } from '../../helpers/selectors';
import { SmartWaiter } from '../../helpers/smart_waiter';
import { baseUrl } from '../../common';
import {
  PerfilUsuario,
  DadosBasicosPerfilUsuario,
  ControleFormulario,
  ControleRecurso,
} from '../../models/perfil_usuario';

/**
 * interface que sintetiza informações dos campos que devem ser preenchidos na
 * hora de se fazer o cadastro de um perfil de usuario
 */
interface CampoDeDado {
  tipo: string;
  formcontrolname: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de gerenciamento de perfis de usuarios
 * @category Páginas do sistema
 */
export class PerfisDeUsuarioPage extends SystemPage {
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
    await this.navbar_.acessarPerfisDeUsuario();
  }

  /**
   *
   * @param perfil
   */
  async cadastrarPerfil(perfil: PerfilUsuario) {
    await element(this.botoes_.cadastrar).click();
    await this.cadastroBasico(perfil.dadosBasicos);
    await this.salvar();
    await this.selecionarPerfil(perfil.dadosBasicos.nome);
    await this.atribuirRecursos(perfil);
    await this.atribuirFormularios(perfil);
    await SmartWaiter.waitOneSecond();
    await this.salvar();
  }

  /**
   *
   * @param nome
   */
  async excluirPerfil(nome: string) {
    await this.selecionarPerfil(nome);
    await this.desvincularRecursos();
    await this.desvincularFormularios();
    await this.selecionarAba('Dados Basicos');
    await element(By.xpath('//button[@color="warn"]')).click();
    await this.confirmarExclusao();
  }

  /**
   *
   * @param nomeRecursos
   */
  async desvincularRecursos(nomeRecursos?: string[]) {
    await this.selecionarAba('Recursos/Autoridades');
    const recursoRowPath =
      '//app-perfil-usuario-recurso-autoridade-tabela//tbody/tr';
    let nomes: string[] = nomeRecursos
      ? nomeRecursos
      : await element
          .all(By.xpath(`${recursoRowPath}/td[contains(@class, "recurso")]`))
          .map(nome => nome?.getText());

    nomes = nomes.map(n => n.trim());

    for (let i = 0; i < nomes.length; ++i) {
      const recursoRow = await getNodeWithText(
        By.xpath(recursoRowPath),
        nomes[i],
        By.xpath('./td[contains(@class, "recurso")]')
      );

      const btn = recursoRow.element(
        By.xpath('./td[contains(@class, "cdk-column-acoes")]/button')
      );
      await browser
        .actions()
        .mouseMove(btn.getWebElement())
        .perform();
      await btn.click();
      await this.confirmarExclusao();
    }

    if (nomeRecursos) {
      await this.salvar();
    }
  }

  /**
   *
   * @param nomeFormularios
   */
  async desvincularFormularios(nomeFormularios?: string[]) {
    await this.selecionarAba('Formulários');
    const formRowPath = '//app-perfil-usuario-formulario-listar//tbody/tr';
    let nomes: string[] = nomeFormularios
      ? nomeFormularios
      : await element
          .all(By.xpath(`${formRowPath}/td[contains(@class, "formulario")]`))
          .map(nome => nome?.getText());

    nomes = nomes.map(n => n.trim());

    for (let i = 0; i < nomes.length; ++i) {
      const recurso = await getNodeWithText(
        By.xpath(formRowPath),
        nomes[i],
        By.xpath('./td[contains(@class, "formulario")]')
      );
      const btn = recurso.element(
        By.xpath('./td[contains(@class, "cdk-column-acoes")]/button')
      );

      await browser
        .actions()
        .mouseMove(btn.getWebElement())
        .perform();
      await btn.click();
      await this.confirmarExclusao();
    }

    if (nomeFormularios) {
      await this.salvar();
    }
  }

  /**
   *
   * @param nome
   */
  async selecionarPerfil(nome: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-perfil-usuario-listar//tbody')
    );
    await selectFrom(
      By.xpath(
        '//app-perfil-usuario-listar//tbody//tr/td[contains(@class, "nome")]'
      ),
      nome
    );
  }

  /**
   *
   * @param dados
   */
  async atribuirDadosBasicos(dados: DadosBasicosPerfilUsuario) {
    await this.selecionarAba('Dados Basicos');
    await this.cadastroBasico(dados);
  }

  /**
   *
   * @param perfil
   */
  async atribuirRecursos(perfil: PerfilUsuario) {
    await this.selecionarAba('Recursos/Autoridades');

    for (let i = 0; i < perfil.recursos.length; ++i) {
      await SmartWaiter.waitOneSecond();
      await this.preencherSelects(perfil.recursos[i], 'recurso-autoridade');
    }
  }

  /**
   *
   * @param perfil
   */
  async atribuirFormularios(perfil: PerfilUsuario) {
    await this.selecionarAba('Formulários');
    await element(By.xpath('//button[@color="primary"]')).click();

    for (let i = 0; i < perfil.formularios.length; ++i) {
      await SmartWaiter.waitOneSecond();
      await this.preencherSelects(perfil.formularios[i], 'formulario');
    }
  }

  /**
   * faz um cadastro simples de um perfil de usuario, ou seja, sem nenhum tipo de
   * atribuição a ele
   * @param dados
   */
  private async cadastroBasico(dados: DadosBasicosPerfilUsuario) {
    const campos = await this.getCamposDadosBasicos(dados);
    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      campo.tipo === 'input'
        ? await this.preencherInputDadosBasicos(campo, dados)
        : await this.preencherTextAreaDadosBasicos(campo, dados);
      await SmartWaiter.waitOneSecond();
    }
  }

  /**
   * mapeia quais são as informações que serão necessárias para que todos os
   * campos do registro sejam preenchidos de forma correta e os filtra para
   * serem apenas os quais deverão ser preenchidos
   * @param atividade
   */
  private async getCamposDadosBasicos(dados: DadosBasicosPerfilUsuario) {
    const campos: CampoDeDado[] = await element
      .all(By.xpath('//app-perfil-usuario-form//*[@formcontrolname]'))
      .map(elm => {
        return {
          tipo: elm?.getTagName(),
          formcontrolname: elm?.getAttribute('formcontrolname'),
          cucumberLabel: elm?.getAttribute('formcontrolname'),
        };
      });

    return campos
      .filter(c => dados[c.cucumberLabel])
      .filter(c => {
        const keys = Object.keys(dados);
        return keys.includes(c.cucumberLabel);
      });
  }

  /**
   * preenche o nó do tipo \<input\> com o valor apropriado
   * @param campo
   * @param dadosBasicos
   */
  private async preencherInputDadosBasicos(
    campo: CampoDeDado,
    dadosBasicos: DadosBasicosPerfilUsuario
  ) {
    const path = `//${campo.tipo}[@formcontrolname="${campo.formcontrolname}"]`;
    const input = By.xpath(path);
    await element(input).sendKeys(dadosBasicos[campo.cucumberLabel]);
  }

  /**
   *
   * @param dado
   * @param target
   */
  private async preencherSelects(
    dado: ControleRecurso | ControleFormulario,
    target: 'recurso-autoridade' | 'formulario'
  ) {
    const select1 = `//app-perfil-usuario-${target}-form//input`;
    const selectAutoridade = `//app-perfil-usuario-${target}-form//mat-select`;
    const optsPath = By.xpath('//mat-option/span[@class="mat-option-text"]');

    await element(By.xpath(select1)).click();
    if (target === 'formulario') {
      await element(By.xpath(select1)).sendKeys(dado['formulario']);
    }

    await selectFrom(
      optsPath,
      dado[target === 'formulario' ? 'formulario' : 'recurso']
    );

    await element(By.xpath(selectAutoridade)).click();
    await selectFrom(optsPath, dado['autoridade']);

    await element(
      By.xpath(
        `//button/span[text()="${
          target === 'formulario' ? 'Salvar' : 'Adicionar'
        }"]`
      )
    ).click();
  }

  /**
   * preenche o nó do tipo \<textarea\> com o valor apropriado
   * @param campo
   * @param dadosBasicos
   */
  private async preencherTextAreaDadosBasicos(
    campo: CampoDeDado,
    dadosBasicos: DadosBasicosPerfilUsuario
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
    await this.selecionarAba('Dados Basicos');
    await SmartWaiter.waitOneSecond();
    const botaoSalvar = By.xpath('//button[@color="primary"]');
    await SmartWaiter.waitClick(botaoSalvar);
    await element(botaoSalvar).click();
    await SmartWaiter.waitUrlContain(`${baseUrl}/perfis-usuarios`);
  }

  /**
   * Troca entre as abas da página de cadastro
   * @param nome
   */
  private async selecionarAba(nome: string) {
    await selectFrom(
      By.xpath(
        '//div[@cdkmonitorelementfocus]//div[@class="mat-tab-label-content"]'
      ),
      nome
    );
    await SmartWaiter.waitOneSecond();
  }

  /**
   * função auxiliar para a confirmação de exclusão de recursos associados,
   * formularios e do proprio perfil de usuario criado
   */
  private async confirmarExclusao() {
    const dialog = By.xpath('//mat-dialog-container');
    await SmartWaiter.waitVisibility(dialog);

    await SmartWaiter.safeClick(By.xpath('(//mat-dialog-actions//button)[1]'));
    await SmartWaiter.waitOneSecond();
  }
}
