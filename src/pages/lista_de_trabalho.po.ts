/**
 * @packageDocumentation
 */

import { By as SeleniumBy } from 'selenium-webdriver';
import { Page } from './page.po';
import { element, By, browser } from 'protractor';
import { SmartWaiter } from '../helpers/smart_waiter';
import { baseUrl } from '../../config';
import { Amostra } from '../models/amostra';
import { RegistroDeCampo } from '../models/registro_campo';
import { RegistroDeLaboratorio } from '../models/registro_laboratorio';
import { selectFrom } from '../helpers/selectors';

let contadorQtdeTratados = 0;

interface CampoDeDado {
  tipo: string;
  ariaLabel: string;
  cucumberLabel: string;
}

/**
 * Abstração da página de gerenciamento de listas de trabalho
 * @category Páginas do sistema
 */
export class ListaDeTrabalhoPage extends Page {
  /**
   * botões que necessitam de ser clicados
   */
  private botoes_: { [key: string]: SeleniumBy };
  /**
   * campos que devem ser preenchidos
   */
  private campos_: { [key: string]: SeleniumBy };

  /**
   * atividade que estará sendo manipulada
   */
  private atividade: string;

  constructor() {
    super();
    this.botoes_ = {};
    this.campos_ = {};
    this.atividade = '';
  }

  /**
   * acessa a página de gerenciamento de listas de trabalho
   */
  async get() {
    await this.navbar_.acessarListasDeTrabalho();
  }

  /**
   *
   * @param numeroAtividade
   * @param logradouroDoImovel
   * @param registro
   */
  async inserirRegistroDeCampo(
    numeroAtividade: string,
    logradouroDoImovel: string,
    registro: RegistroDeCampo
  ) {
    await this.selecionarAtividade(numeroAtividade);
    await browser.sleep(1000);
    await this.selecionarImovel(logradouroDoImovel);
    const abaCampo = await element(
      By.xpath('(//app-formulario-tabela-simples//tbody//tr//td//span)[1]')
    ).getText();
    await this.selecionarAba(abaCampo);
    await element(By.xpath('//button[@color="primary"]')).click();
    await this.preencherCamposDeDados(registro);
    await this.salvar();
  }

  /**
   *
   * @param numeroAtividade
   * @param logradouroDoImovel
   * @param registro
   * @param amostras
   */
  async inserirRegistroDeLaboratorio(
    numeroAtividade: string,
    logradouroDoImovel: string,
    registro: RegistroDeLaboratorio,
    amostras: Amostra[]
  ) {
    await this.selecionarAtividade(numeroAtividade);
    this.atividade = numeroAtividade;
    await browser.sleep(1000);
    await this.selecionarImovel(logradouroDoImovel);
    const abaLab = await element(
      By.xpath('(//app-formulario-tabela-simples//tbody//tr//td//span)[2]')
    ).getText();
    await this.selecionarAba(abaLab);
    await element(By.xpath('//button[@color="primary"]')).click();
    await this.preencherCamposDeDados(registro);
    await this.preencherAmostras(amostras);
    await this.salvar();
  }

  /**
   *
   * @param registro
   */
  private async preencherCamposDeDados(
    registro: RegistroDeCampo | RegistroDeLaboratorio | Amostra
  ) {
    const campos = await this.getCampos(registro);

    for (let i = 0; i < campos.length; ++i) {
      const campo = campos[i];
      campo.tipo === 'input'
        ? await this.preencherInput(campo, registro)
        : await this.preencherSelect(campo, registro);
    }
  }

  /**
   *
   * @param registro
   */
  private async getCampos(
    registro: RegistroDeCampo | RegistroDeLaboratorio | Amostra
  ) {
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

    return campos.filter(c => Object.keys(registro).includes(c.cucumberLabel));
  }

  /**
   *
   * @param numero
   */
  private async selecionarAtividade(numero: string) {
    await SmartWaiter.waitVisibility(
      By.xpath('//app-atividade-tabela-simples')
    );
    await selectFrom(
      By.xpath(
        '//app-atividade-tabela-simples//tbody//tr//td[contains(@class, "cdk-column-numero")]//span[@class="span-link"]'
      ),
      numero
    );
    this.atividade = numero;
  }

  /**
   *
   * @param codigo
   */
  private async selecionarImovel(logradouro: string) {
    await SmartWaiter.waitVisibility(By.xpath('//app-imovel-tabela-simples'));
    await selectFrom(
      By.xpath(
        '//app-imovel-tabela-simples//tbody//tr//td[contains(@class, "cdk-column-logradouro")]//span'
      ),
      logradouro
    );
  }

  /**
   *
   * @param amostras
   */
  private async preencherAmostras(amostras: Amostra[]) {
    for (let i = 0; i < amostras.length; ++i) {
      await element(By.xpath('//input[@value="( + ) Adicionar"]')).click();
      const amostra = amostras[i];
      await this.preencherCamposDeDados(amostra);
    }
  }

  /**
   *
   * @param campo
   * @param registro
   */
  private async preencherInput(
    campo: CampoDeDado,
    registro: RegistroDeCampo | RegistroDeLaboratorio | Amostra
  ) {
    let path = `//input[@aria-label="${campo.ariaLabel}"]`;
    if ((await element.all(By.xpath(path))).length > 1) {
      path = `(${path})[${(contadorQtdeTratados++ % 2) + 1}]`;
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
    registro: RegistroDeCampo | RegistroDeLaboratorio | Amostra
  ) {
    const path = `//select[@aria-label="${campo.ariaLabel}"]`;
    await element(By.xpath(path)).click();
    await selectFrom(
      By.xpath(`${path}//option`),
      registro[campo.cucumberLabel]
    );
  }

  /**
   *
   * @param nomeDaAba
   */
  private async selecionarAba(nomeDaAba: string) {
    const isCampo = /[cC]ampo/g.test(nomeDaAba);
    await element(
      By.xpath(
        `(//app-formulario-tabela-simples//tbody//tr//td//span)[${
          isCampo ? 1 : 2
        }]`
      )
    ).click();
    await browser.sleep(1000);
  }

  /**
   * salva o registro que está sendo criado
   */
  private async salvar() {
    await element(By.xpath('//button[@color="primary"]')).click();
    const url = `${baseUrl}/registros/${this.atividade}`;
    await SmartWaiter.waitUrl(url);
  }
}
