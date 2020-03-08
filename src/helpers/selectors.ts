import { element, ElementFinder, Locator } from 'protractor';
import { WebDriverLocator } from 'protractor/built/locators';

/**
 * Dada uma lista de opções (com caminho já apontando para os nós que
 * conterão o texto), seleciona a opção que conter o mesmo texto que
 * o passado em opcaoProcurada
 * @param locator caminho para um ou mais nós que possuam um texto dentro para
 * ser comparado
 * @param opcaoProcurada string que deverá ser comparada
 */
export async function selectFrom(locator: Locator, opcaoProcurada: string) {
  const options: ElementFinder[] = await element.all(locator);
  for (let i = 0; i < options.length; ++i) {
    const option = options[i];
    const text = await option.getText();
    if (text === opcaoProcurada) {
      return option.click();
    }
  }
  throw new Error(
    `não foi possivel encontrar a opção = '${opcaoProcurada}' na lista de opções`
  );
}

/**
 * Retorna um [[ElementFinder]] correspondente ao nó passado no parametro
 * rootLocator que contenha o mesmo texto que o passado em textoProcurado.
 * É possível passar um complemento para o nó buscado, este de onde será
 * extraído o texto para comparação, sendo assim é possível retornar um nó
 * que não seja o qual o elemento com texto está localizado.
 * @param rootLocator nó raíz que será retornado
 * @param textoProcurado texto desejado a ser buscado
 * @param textLocator caminho para onde estará localizado o texto
 *
 * suponha que há uma tabela de dados do tipo
 * ```gherkin
 * | nome | concluido |
 * | t1   | False     |
 * | t2   | True      |
 * ```
 *
 * e cada linha da tabela é dada pelo xpath:
 * ```ts
 * const root_locator = '//tbody//tr'
 * ```
 *
 * e o xpath da coluna nome seja:
 * ```ts
 * // atenção com o '.' no inicio para indicar que é um subnó
 * nome_locator = './/td//span[@id="nome"]'
 * ```
 * e a opção de concluido seja dado pelo xpath:
 * ```ts
 * // atenção com o '.' no inicio para indicar que é um subnó
 * opt_concluido = './/td//input[@type="checkbox"]'
 * ```
 * Então, suponha que seja necessário alterar a coluna concluido com base
 * no nome que for passado.
 * Logo, a chamada para esta função seria:
 * ```ts
 * const row = getNodeWithText(root_locator, 't1', nome_locator)
 * ```
 * como row irá conter informação sobre toda a sua linha, pode-se fazer:
 * ```ts
 * // isto irá alterar o valor de concluído de t1 para True
 * await row.element(opt_concluido).click()
 * ```
 */
export async function getNodeWithText(
  rootLocator: Locator,
  textoProcurado: string,
  textLocator?: WebDriverLocator
): Promise<ElementFinder> {
  const nomes: string[] = await element.all(rootLocator).map(r => {
    return textLocator ? r?.element(textLocator).getText() : r?.getText();
  });

  const index = nomes.indexOf(textoProcurado);
  if (index < 0) {
    throw new Error(
      `não foi possivel encontrar o elemento com texto = '${textoProcurado}' na tabela`
    );
  }

  const el = element.all(rootLocator).get(index);
  return el;
}
